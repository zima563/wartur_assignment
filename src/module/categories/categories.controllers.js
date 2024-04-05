import { PrismaClient } from "@prisma/client"
import { catchError } from "../../middleware/catchError.js"
import { apiError } from "../../utils/apiError.js";
import sharp from "sharp";

const prisma = new PrismaClient();

//create category
const createCategory = catchError(async(req,res,next)=>{
    const { name  } = req.body;

    const parentId = parseInt(req.body.parentId)
    let picture;

    // Resize image if uploaded
    if (req.file) {
        const resizedImageBuffer = await sharp(req.file.path)
          .resize({ width: 3200, height: 3200, fit: 'inside' }) // Resize image to fit within 3200x3200
          .toBuffer();
  
          picture = req.file.filename;
      }
    
    const category = await prisma.Category.create({
        data:{
            name,
            picture,
            parentId
        }
    })
    res.status(200).json({msg:"success", category});
})

//get all categories 
const getAllCategories = catchError(async(req,res,next)=>{
    const categories = await prisma.category.findMany();

    res.status(200).json({msg: "success", categories});
})

//getOneCategory
const getOneCategory = catchError(async(req,res,next)=>{
    const categoryid = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
        where: {id: categoryid}
    })
    if(!category) return next(new apiError("not category found",404));
    res.status(200).json({msg:"success",category});
})

//updateCategory 
const updateCategory = catchError(async(req,res,next)=>{
    const categoryId = parseInt(req.params.id);
    const { name , parentId } = req.body;
    let picture;

   

    const category = await prisma.category.findUnique({
        where: {id: categoryId}
    })
    if(!category) return next(new apiError("not category found",404));

     // Resize image if uploaded
     if (req.file) {
        const resizedImageBuffer = await sharp(req.file.path)
          .resize({ width: 3200, height: 3200, fit: 'inside' }) // Resize image to fit within 3200x3200
          .toBuffer();
  
          picture = req.file.filename;
      }
    
    const updateCategory = await prisma.category.update({
        where: {id: categoryId},
        data: {name,picture,parentId}
    })
    res.status(200).json({msg:"success",updateCategory});
})

//deleteCategory 
const deleteCategory = catchError(async(req,res,next)=>{
    const categoryId = parseInt(req.params.id);
    const { name , picture , parentId } = req.body;
    const category = await prisma.category.findUnique({
        where: {id: categoryId}
    })
    if(!category) return next(new apiError("not category found",404));
    await prisma.category.delete({
        where: {id: categoryId}
    })
    res.status(200).json({msg:"Category deleted successfully"});
})

async function buildCategoryTree(categoryId) {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          children: true, // Include children categories
          products: true   // Include products associated with the category
        }
      });
    
      if (!category) {
        return null;
      }
       // Calculate product count for the current category 
      let productCount = category.products.length;
      // Recursively calculate product count for children categories
      const children = await Promise.all(category.children.map(child => buildCategoryTree(child.id)));
         children.forEach(child => {
      if (child && child.productCount) {
      productCount += child.productCount;
      }
      });
      
    
      return {
        id: category.id,
        name: category.name,
        picture: category.picture, 
        products: category.products,
        productCount: productCount,
        children: children
      };
    
  }

  // show categories as trees
  const treeCategories =  catchError(async(req,res,next)=>{
    // Find root categories (categories without a parent)
    const rootCategories = await prisma.category.findMany({
        where: { parentId: null }
      });
  
      // Build the category tree recursively for each root category
      const categoryTree = await Promise.all(rootCategories.map(category => buildCategoryTree(category.id)));
  
      res.json(categoryTree);
    })





export{
    createCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    treeCategories,
}