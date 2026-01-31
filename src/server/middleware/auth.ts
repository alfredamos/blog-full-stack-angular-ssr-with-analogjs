import { defineEventHandler, sendRedirect} from 'h3';
import {isPublicRoute} from "../utils/publicRoutes.util"
import {authModel} from "../models/auth.model";
import {StatusCodes} from "http-status-codes";


export default defineEventHandler(async (event) => {
//---->  Check for public routes.
  const route = event.node.req.originalUrl!;
  const session = authModel.getSession(event);
  if (!isPublicRoute(route) && !session?.isLoggedIn) {
    console.log("route is public, route : ", route);
    await sendRedirect(event, '/login', StatusCodes.UNAUTHORIZED);
  }
});
