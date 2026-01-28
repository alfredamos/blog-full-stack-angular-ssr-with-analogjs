import {prisma} from "../db/prisma.db";
import {StatusCodes} from "http-status-codes";
import catchError from "http-errors";
import {toUserDto} from "../dto/user.dto";

class UserModel {
  async deleteUserById(id: string){
    //----> Retrieve user by id from the database.
    const user = await prisma.user.findUnique({where:{id}});

    //----> Check for null user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "User not available in db!");
    }

    //----> Delete the user with the given id.
    return prisma.user.delete({where: {id: id}});
  }

  async getAllUsers(){
    //----> Retrieve all users from the database.
    const users = await prisma.user.findMany();
    return users.map(user => toUserDto(user));
  }

  async getUserById(id: string){
    //----> Retrieve user by id from the database.
    const user = await prisma.user.findUnique({where:{id}});

    //----> Check for null user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "User not available in db!");
    }

    //----> Return user.
    return toUserDto(user);
  }

  async getUserByEmail(email: string){
    //----> Retrieve user by email from the database.
    const user = await prisma.user.findUnique({where:{email}});

    //----> Check for null user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "User not available in db!");
    }

    //----> Return user.
    return toUserDto(user);
  }
}

export const userModel = new UserModel();
