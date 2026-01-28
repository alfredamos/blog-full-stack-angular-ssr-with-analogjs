import {Post} from "../../generated/prisma/client";
import { H3Event} from "h3";
import {authModel} from "./auth.model";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "../db/prisma.db";
import {ResponseMessage} from "../utils/responseMessage.util";

class PostModel{
  async createPost(post: Post, event: H3Event){
    //----> Get the user session from the event.
    const session = await authModel.getSession(event);

    //----> Check for null session.
    if (!session){
      throw catchError(StatusCodes.UNAUTHORIZED, "Session is not found!");
    }

    //----> Get the author.
    const author = await this.getOneAuthorByUserId(session.id);
    post.authorId = author.id;

    //----> save the post in the database.
    return prisma.post.create({data: {...post}});

  }

  async deletePostById(id: string){
    //----> Check for existence of post.
    await this.getOnePostById(id);

    //----> Delete the post with the given id.
    return prisma.post.delete({where: {id}});

  }

  async deletePostsByAuthorId(authorId: string){
    //----> Check for existence of author.
    await this.getOneAuthorById(authorId);

    //----> Delete all posts by the given authorId.
    const deletedPostCount = await prisma.post.deleteMany({where: {authorId}});

    //----> Check for null deletedPosts.
    if (!deletedPostCount.count){
      throw catchError(StatusCodes.NOT_FOUND, "Posts are not found in database!");
    }

    //----> Send back response.
    return new ResponseMessage("Posts have been deleted successfully!", "success", StatusCodes.OK);
  }

  async deletePostsByUserId(userId: string){
    //----> Check for existence of author.
    const author = await this.getOneAuthorByUserId(userId);

    //----> Delete all posts by the given authorId.
    const deletedPostCount = await prisma.post.deleteMany({where: {authorId : author.id}});

    //----> Check for null deletedPosts.
    if (!deletedPostCount.count){
      throw catchError(StatusCodes.NOT_FOUND, "Posts are not found in database!");
    }

    //----> Send back response.
    return new ResponseMessage("Posts have been deleted successfully!", "success", StatusCodes.OK);
  }

  async editPostById(id: string, editedPost: Post){
    //----> Check for existence of post.
    const post = await this.getOnePostById(id);
    editedPost.authorId = post.authorId;

    //----> Update the post with the given id.
    return prisma.post.update({where: {id}, data: {...editedPost}});
  }

  async getPostById(id: string){
    //----> Get the post with the given id.
    return await this.getOnePostById(id);
  }

  async getPostsByAuthorId(authorId: string){
    //----> Check for existence of author.
    await this.getOneAuthorById(authorId);

    //----> Get all posts by the given authorId.
    return prisma.post.findMany({where: {authorId}});
  }

  async getPostsByUserId(userId: string){
    //----> Check for existence of author.
    const author = await this.getOneAuthorByUserId(userId);

    //----> Get all posts by the given authorId.
    return prisma.post.findMany({where: {authorId: author.id}});
  }

  async getAllPosts(){
    //----> Get all posts.
    return prisma.post.findMany();
  }

  private async getOnePostById(id: string){
    //----> Get the post.
    const post = await prisma.post.findUnique({where: {id}});

    //----> Check for null post.
    if (!post){
      throw catchError(StatusCodes.NOT_FOUND, "Post is not found in database!");
    }

    //----> Return the post.
    return post;
  }

  private async getOneAuthorById(id: string){
    //----> Get the author.
    const author = await prisma.author.findUnique({where: {id}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found in database!");
    }

    //----> Return the author.
    return author;
  }

  private async getOneAuthorByUserId(userId: string){
    //----> Get the author.
    const author = await prisma.author.findUnique({where: {userId}});

    //----> Check for null author.
    if (!author){
      throw catchError(StatusCodes.NOT_FOUND, "Author is not found in database!");
    }

    //----> Return the author.
    return author;
  }



}

export const postModel = new PostModel();
