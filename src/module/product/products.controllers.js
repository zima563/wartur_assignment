import { PrismaClient } from "@prisma/client"
import { catchError } from "../../middleware/catchError.js"
import { apiError } from "../../utils/apiError.js";
import sharp from "sharp";

const prisma = new PrismaClient();

//create product
const createProduct = catchError(async(req,res,next)=>{
    const { name } = req.body;

    const categoryId = parseInt(req.body.categoryId)
    let picture;
     // Resize image if uploaded
     if (req.file) {
        const resizedImageBuffer = await sharp(req.file.path)
          .resize({ width: 3200, height: 3200, fit: 'inside' }) // Resize image to fit within 3200x3200
          .toBuffer();
  
        picture = req.file.filename;
      }
    
    const product = await prisma.product.create({
        data: {
            name,picture,categoryId
        }
    })
    res.status(200).json({msg:"success",product})
});

//get all products 
const getAllProducts = catchError(async(req,res,next)=>{
    const products = await prisma.product.findMany();

    res.status(200).json({msg: "success", products});
})

//getOneProduct
const getOneProduct = catchError(async(req,res,next)=>{
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
        where: {id: productId}
    })
    if(!product) return next(new apiError("not product found",404));
    res.status(200).json({msg:"success",product});
})

//updateProduct 
const updateProduct = catchError(async(req,res,next)=>{
    const productId = parseInt(req.params.id);
    const { name ,categoryId } = req.body;
    let picture;

    const product = await prisma.product.findUnique({
        where: {id: productId}
    })
    if(!product) return next(new apiError("not product found",404));
     // Resize image if uploaded
     if (req.file) {
        const resizedImageBuffer = await sharp(req.file.path)
          .resize({ width: 3200, height: 3200, fit: 'inside' }) // Resize image to fit within 3200x3200
          .toBuffer();
  
          picture = req.file.filename;
      }
    
    const updateproduct = await prisma.product.update({
        where: {id: productId},
        data: {name,picture,categoryId}
    })
    res.status(200).json({msg:"success",updateproduct});
})

//deleteproduct 
const deleteproduct = catchError(async(req,res,next)=>{
    const productId = parseInt(req.params.id);
    const { name , picture , parentId } = req.body;
    const product = await prisma.product.findUnique({
        where: {id: productId}
    })
    if(!product) return next(new apiError("not product found",404));
    await prisma.product.delete({
        where: {id: productId}
    })
    res.status(200).json({msg:"product deleted successfully"});
})

//In product from show top parent categories and show children of selected category
const topParentCategories = catchError(async(req,res,next)=>{
    const categories = await prisma.category.findMany({
        where: {parentId: null}
    });
    res.status(200).json({msg: "success" , categories})
});

const childrenOfSelectedCategory = catchError(async(req,res,next)=>{
    const categoryId = parseInt(req.params.id);
    const children = await prisma.category.findMany({
        where: {parentId: categoryId}
    })
    res.status(200).json({msg: "success", children })
})

export{
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteproduct,
    topParentCategories,
    childrenOfSelectedCategory
}