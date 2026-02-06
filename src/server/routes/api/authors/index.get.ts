import {authorModel} from "../../../models/author.model";
import {defineEventHandler, sendRedirect} from "h3";
import {adminCheck} from "../../../utils/adminCheck";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  //----> Get all authors.
  return authorModel.getAllAuthors();
});
