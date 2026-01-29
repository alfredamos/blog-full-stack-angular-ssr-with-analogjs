import {
  ChangeUserPassword,
  ChangeUserRole,
  EditUserProfile,
  LoginUser,
  SignupUser
} from "../validations/auth.validation";
import {prisma} from "../db/prisma.db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "../utils/responseMessage.util";
import {H3Event, parseCookies, sendRedirect, setCookie, deleteCookie} from "h3";
import {CookieParam} from "../utils/CookieParam";
import {UserSession} from "../utils/UserSession";
import {TokenJwt} from "../utils/TokenJwt";
import {Role, TokenType} from "../../generated/prisma/enums";
import {fromEditUserProfileToUser, fromEditUserUserToAuthor} from "../utils/fromEditUserProfileToUser";
import {tokenModel} from "./token.model";
import {Token, User} from "../../generated/prisma/client";
import {fromSignupUserToUser} from "../utils/fromSignupToUser";


class AuthModel {
  async changeUserPassword(changeUserPassword: ChangeUserPassword) {
    //----> Destructure payload.
    const {email, password, newPassword, confirmPassword} = changeUserPassword;

    //----> Check for password match.
    if (!this.passwordMustMatch(newPassword, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "passwords must match!");
    }

    //----> Check for existence of user.
    const user = await this.findUserByEmail(email);

    //----> Check for valid password.
    if (!await this.passwordMustBeValid(password, user.password)) {
      throw catchError(StatusCodes.UNAUTHORIZED, "invalid credentials!");
    }

    //----> Hash the new password.
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //----> Save the changes in the database.
    await prisma.user.update({
      where: {email},
      data: {...user, password: hashedPassword}
    });

    //----> Send back response.
    return new ResponseMessage("Password has been changed successfully!", "success", StatusCodes.OK);

  }

  async changeUserRole(changeUserRole: ChangeUserRole, event: H3Event) {
    //----> Get user session.
    const session = await this.getSession(event);
    if (!session) {
      await sendRedirect(event, "/login");
      return;
    }

    //-----> You must be an admin to change user role.
    if (!session.isAdmin){
      await sendRedirect(event, "/unauthorized");
      return;
    }

    //----> Destructure the payload.
    const {email} = changeUserRole;

    //----> Check for existence of user.
    const user = await this.findUserByEmail(email);
    const role = user.role === Role.User ? Role.Admin : Role.User;

    //----> Save the changes in the database.
    await prisma.user.update({
      where: {email},
      data: {...user, role}
    })
  }

  async editUserProfile(editUserProfile: EditUserProfile){
    //----> Destructure payload.
    const {email, password} = editUserProfile;

    //----> Check for existence of user.
    const user = await this.findUserByEmail(email);

    //----> Check for valid password.
    if (!await this.passwordMustBeValid(password, user.password)) {
      throw catchError(StatusCodes.UNAUTHORIZED, "invalid credentials!");
    }

    //----> Get a user from signupUser and save it in database.
    const userToUpdate = fromEditUserProfileToUser(editUserProfile);
    userToUpdate.role = user.role;
    userToUpdate.id = user.id;
    userToUpdate.password = user.password;
    await prisma.user.update({where: {email}, data: {...userToUpdate}});

    //----> Get author from signupUser and save it in database.
    const author = await this.findAuthorByEmail(email);
    const authorToUpdate = fromEditUserUserToAuthor(editUserProfile);
    authorToUpdate.id = author.id;
    authorToUpdate.userId = user.id;
    await prisma.author.update({where: {email}, data: {...authorToUpdate}});

    //----> Send back response.
    return new ResponseMessage("User profile updated successfully!", "success", StatusCodes.OK);

  }

  async getCurrentUser(event: H3Event) {
    //----> Get a user session and check for null session.
    const session = await this.getSession(event);
    if (!session) {
      await sendRedirect(event, "/login");
      return
    }

    //----> Get the current user.
    return await this.findUserByEmail(session.email);
  }

  async loginUser(loginUser: LoginUser, event: H3Event) {
    //----> Destructure payload.
    const {email, password} = loginUser;

    //----> Check for existence of user.
    const user = await this.findUserByEmail(email);

    //----> Check for valid password.
    if (!await this.passwordMustBeValid(password, user.password)) {
      throw catchError(StatusCodes.UNAUTHORIZED, "invalid credentials!");
    }

    //----> Generate access and refresh tokens and store them in cookies.
    const tokenJwt = this.makeTokenJwt(user);
    return await this.generateTokensAndCookies(tokenJwt, event);

  }

  async logoutUser(event: H3Event) {
    //----> Get user-session.
    const session = await this.getSession(event);

    //----> Check for null session.
    if (!session) {
      await sendRedirect(event, "/login");
      return;
    }

    //----> Revoke all valid tokens.
    await tokenModel.revokedTokensByUserId(session.id);

    //----> Delete all cookies.
    this.deleteCookie(event, CookieParam.accessTokenName, CookieParam.accessTokenPath);
    this.deleteCookie(event, CookieParam.refreshTokenName, CookieParam.refreshTokenPath);
  }

  async refreshUserToken(event: H3Event) {
    //----> Get refreshToken from the cookie.
    const cookies = parseCookies(event);
    const refreshToken = cookies["refreshToken"];

    //----> Validate refreshToken.
    const tokenJwt = this.validateUserToken(refreshToken);

    //----> Generate access and refresh tokens and store them in cookies.
    return await this.generateTokensAndCookies(tokenJwt, event);
  }

  async signupUser(signupUser: SignupUser, event: H3Event) {
    //----> Destructure the request payload.
    const {email, password, confirmPassword} = signupUser;

    //----> Check for password match.
    if (!this.passwordMustMatch(password, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "passwords must match!");
    }

    //----> Check for existence of user.
    const user = await prisma.user.findUnique({where: {email}});
    if(user){
      await sendRedirect(event, "/signup");
      return;
    }

    //----> Hash password.
    const hashedPassword = await bcrypt.hash(password, 12);

    //----> Get the user payload from signupUser and insert it in the database.
    const newUserToCreate = fromSignupUserToUser(signupUser);
    newUserToCreate.password = hashedPassword;
    const newUser = await prisma.user.create({data: {...newUserToCreate}});

    //----> Get the author payload from signupUser and insert it in the database.
    const authorToCreate = fromEditUserUserToAuthor(signupUser);
    authorToCreate.userId = newUser.id;
    await prisma.author.create({data: {...authorToCreate}});

    //----> Send back response.
    return new ResponseMessage("User created successfully!", "success", StatusCodes.CREATED);
  }

  async getSession(event: H3Event){
    //----> Get the session string from cookies.
    const cookies = parseCookies(event);
    const accessToken = cookies[CookieParam.accessTokenName]

    if(!accessToken){
      await sendRedirect(event, "/login");
      return;
    }

    //----> Validate session.
    const tokenJwt = this.validateUserToken(accessToken);

    //----> Send back session.
    return this.makeSession(tokenJwt, accessToken);
  }

  private async generateTokensAndCookies(tokenJwt: TokenJwt, event: H3Event) {
    //----> Revoked all valid tokens.
    await tokenModel.revokedTokensByUserId(tokenJwt.id);

    //----> Generate accessToken and store it in a cookie.
    const accessToken = await this.generateToken(tokenJwt.id, tokenJwt.name, tokenJwt.email, tokenJwt.role, CookieParam.accessTokenMaxAge);
    this.setCookie(event, CookieParam.accessTokenName, accessToken, CookieParam.accessTokenPath, CookieParam.accessTokenMaxAge);

    //----> Generate refreshToken and store it in a cookie.
    const refreshToken = await this.generateToken(tokenJwt.id, tokenJwt.name, tokenJwt.email, tokenJwt.role, CookieParam.refreshTokenMaxAge);
    this.setCookie(event, CookieParam.refreshTokenName, refreshToken, CookieParam.refreshTokenPath, CookieParam.refreshTokenMaxAge);

    //----> Make token object.
    const newToken = this.makeNewToken(accessToken, refreshToken, tokenJwt.id);

    //----> Save the new token object in the database.
    await tokenModel.createToken(newToken as Token);

    //----> Send back userSession.
    return this.makeSession(tokenJwt, accessToken);

  }

  private passwordMustMatch(passwordOne: string, passwordTwo: string){
    return passwordOne.normalize() === passwordTwo.normalize();
  }

  private async passwordMustBeValid(rawPassword: string, encryptedPassword: string){
    return await bcrypt.compare(rawPassword, encryptedPassword);
  }

  private async findUserByEmail(email: string){
    const user = await prisma.user.findUnique({where:{email}});

    //----> Check for null user.
    if (!user) {
      throw catchError(StatusCodes.UNAUTHORIZED, "invalid credentials!");
    }

    //----> Send back response.
    return user;
  }

  private async findAuthorByEmail(email: string){
    const author = await prisma.author.findUnique({where:{email}});

    //----> Check for null author.
    if (!author) {
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this email!");
    }

    //----> Send back response.
    return author;
  }

  private validateUserToken(token: string){
    //----> Check for empty token.
    if(!token) {
      throw catchError(
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials!"
      );
    }

    //----> Verify the jwt-token
    try {
      return jwt?.verify(token, (process.env['JWT_TOKEN_KEY'] as string)) as TokenJwt;
    }catch(err) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

  }

  private generateToken = async (id: string, name: string, email: string, role: Role, expiresIn: number)=>{
    return jwt.sign(
      {
        id,
        name,
        role,
        email
      },
      process.env['JWT_TOKEN_KEY'] as string,
      {expiresIn}
    );
  }

  private setCookie(event: H3Event, cookieName: string, cookieValue: string, cookiePath: string, maxAge: number) {
    setCookie(event, cookieName, cookieValue, {
      httpOnly: true,
      secure: false,
      path: cookiePath,
      maxAge
    })
  }

  private deleteCookie (event: H3Event, cookieName: string, cookiePath: string)  {
    deleteCookie(event, cookieName, { path: cookiePath, secure: false, httpOnly: true });
  }

  private makeNewToken = (accessToken: string, refreshToken: string, userId: string) => {
    //----> Make new token.
    return {accessToken, refreshToken, userId, expired: false, revoked: false, tokenType: TokenType.Bearer};
  }

  private makeSession(tokenJwt: TokenJwt, accessToken: string){
    const session : UserSession = {
      ...tokenJwt,
      accessToken,
      isAdmin: tokenJwt.role === Role.Admin,
      isLoggedIn: !!tokenJwt,
    }

    return session;
  }

  private makeTokenJwt(user: User) : TokenJwt {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,

    }
  }

}

export const authModel = new AuthModel();
