import {authorModel} from "../../../models/author.model";
import {defineEventHandler} from "h3";

export default defineEventHandler(async () => {
  //----> Get all authors.
  return authorModel.getAllAuthors();
});
