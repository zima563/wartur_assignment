import express from "express"
import { childrenOfSelectedCategory, createProduct, deleteproduct, getAllProducts, getOneProduct, topParentCategories, updateProduct } from "./products.controllers.js";
import { uploadSingleFile } from "../../services/fileUpload/upload.js";

const productRouter = express.Router();
//router of create product
productRouter.route("/createProduct").post(uploadSingleFile("picture"),createProduct);
//router of get all product
productRouter.route("/allProducts").get(getAllProducts);
//router of get one product
productRouter.route("/product/:id")
.get(getOneProduct)
//router of update product
.put(uploadSingleFile("picture"),updateProduct)
//router of delete product
.delete(deleteproduct);
//router of topParentCategories
productRouter.route("/categories/topParent").get(topParentCategories)
//router of childrenOfSelectedCategory
productRouter.route("/categories/:id/children").get(childrenOfSelectedCategory)

export default productRouter;

