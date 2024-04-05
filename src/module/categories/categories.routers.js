import express from "express"
import {  createCategory, deleteCategory, getAllCategories, getOneCategory, treeCategories, updateCategory } from "./categories.controllers.js";
import { uploadSingleFile } from "../../services/fileUpload/upload.js";

const categoryRouter = express.Router();
//router of create category
categoryRouter.route("/createCategory").post(uploadSingleFile("picture"),createCategory);
//router of get all category
categoryRouter.route("/allCategory").get(getAllCategories);
//router of get one category
categoryRouter.route("/category/:id")
.get(getOneCategory)
// router of update category
.put(uploadSingleFile("picture"),updateCategory)
//router of delete category
.delete(deleteCategory);

//router of tree category
categoryRouter.route("/tree").get(treeCategories);
export default categoryRouter;
