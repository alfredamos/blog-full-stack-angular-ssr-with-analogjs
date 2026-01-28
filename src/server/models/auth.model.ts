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
import {H3Event, parseCookies, sendRedirect} from "h3";
import {CookieParam} from "../utils/CookieParam";
import {UserSession} from "../utils/UserSession";
import {TokenJwt} from "../utils/TokenJwt";
import {Role} from "../../generated/prisma/enums";
import {fromEditUserProfileToUser, fromEditUserUserToAuthor} from "../utils/fromEditUserProfileToUser";
import {tokenModel} from "./token.model";


export class AuthModel {
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
    const hashedPassword = await bcrypt.hash(password, 12);

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

    //----> Get user from signupUser and save it in database.
    const getUpdatedUser = fromEditUserProfileToUser(editUserProfile);
    getUpdatedUser.role = user.role;
    getUpdatedUser.id = user.id;
    getUpdatedUser.password = user.password;
    await prisma.user.update({where: {email}, data: {...getUpdatedUser}});

    //----> Get author from signupUser and save it in database.
    const author = await this.findAuthorByEmail(email);
    const getUpdatedAuthor = fromEditUserUserToAuthor(editUserProfile);
    getUpdatedAuthor.id = author.id;
    getUpdatedAuthor.userId = user.id;
    await prisma.author.update({where: {email}, data: {...getUpdatedAuthor}});

    //----> Send back response.
    return new ResponseMessage("User profile updated successfully!", "success", StatusCodes.OK);

  }

  async getCurrentUser(event: H3Event) {
    //----> Get user session and check for null session.
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

  }

  async logoutUser(){}

  refreshUserToken(){}

  signupUser(signupUser: SignupUser){}

  private async generateTokensAndCookies(tokenJwt: TokenJwt, event: H3Event) {
    //----> Revoked all valid tokens.
    await tokenModel.revokedTokensByUserId(tokenJwt.id);

    //----> Generate accessToken and store it in a cookie.
    const accessToken =
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

    //----> Make session.
    const session : UserSession = {
      ...tokenJwt,
      accessToken,
      isAdmin: tokenJwt.role === Role.Admin,
      isLoggedIn: !!tokenJwt,
    }

    //----> Send back session.
    return session;
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

}
