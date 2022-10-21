const category = require('express').Router();
const { isAuth, isAdmin } = require('../../controllers/auth/authMiddleware.js');
const prisma = require('../../prisma/prisma.js')

category.get("/", async (req,res) => {
  try{
    const categories = await prisma.category.findMany({
      include:{
          _count:{
            select:{
              blogs:true
            }
          }
        }
    })
    res.status(200).json(categories)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

category.get("/:name", async (req,res) => {
  try{
    const categories = await prisma.category.findUnique({
      where:{
        name:req.params.name
      },
      include:{
        blogs:{
          include:{
            category:true,
            tag:true,
            user:true
          }
        }
      }
    })
    
    res.status(200).json(categories)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

category.post("/",async (req,res) => {
  try{
    const newCategory = await prisma.category.create({
      data:{
        name:req.body.name
      }
    })
    res.status(200).send(newCategory)
  }
  catch{
    res.status(404).send("Can't create the new category")
  }
})

category.delete("/",async (req,res) => {
  try{
    const deleteCategory = await prisma.category.delete({
      where:{
        id:req.body.id
      }
    })
    res.status(200).send(deleteCategory)
  }
  catch{
    res.status(404).send("Can't create the new category")
  }
})

category.put("/",async (req,res) => {
  try{
    const updateCategory = await prisma.category.update({
      where:{
        id:req.body.id
      },
      data:{
        name:req.body.name
      }
    })
    res.status(200).send(updateCategory)
  }
  catch{
    res.status(404).send("Can't update the category")
  }
})

module.exports = category
