import { prisma } from "../db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "../utils/responseMessage.util";

class AuthorModel{
  async deleteAuthorByUserId(userId: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{userId}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Delete author.
    await prisma.author.delete({where:{userId}});

    //----> Send back response.
    return new ResponseMessage("Author has been deleted successfully!", "success", StatusCodes.OK);
  }

  async deleteAuthorById(id: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{id}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Delete author.
    await prisma.author.delete({where:{id}});

    //----> Send back response.
    return new ResponseMessage("Author has been deleted successfully!", "success", StatusCodes.OK);
  }

  async deleteAuthorByEmail(email: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{email}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Delete author.
    await prisma.author.delete({where:{email}});

    //----> Send back response.
    return new ResponseMessage("Author has been deleted successfully!", "success", StatusCodes.OK);
  }

  async getAuthorByUserId(userId: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{userId}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Send back response.
    return author;
  }

  async getAuthorById(id: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{id}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Send back response.
    return author;
  }

  async getAuthorByEmail(email: string){
    //----> Check for existing author.
    const author = await prisma.author.findFirst({where:{email}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found for this user!");
    }

    //----> Send back response.
    return author;
  }

  async getAllAuthors(){
    //----> Fetch all authors.
    return prisma.author.findMany();
  }
}

export const authorModel = new AuthorModel();
