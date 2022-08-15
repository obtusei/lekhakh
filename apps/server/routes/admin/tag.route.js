const tags = require('express').Router();
const { isAuth, isAdmin } = require('../../controllers/auth/authMiddleware.js');
const prisma = require('../../prisma/prisma.js')

tags.get("/", async (req,res) => {
  try{
    const categories = await prisma.tag.findMany({
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

tags.get("/top", async (req,res) => {
  try{
    const categories = await prisma.tag.findMany({
      take: 6,
      orderBy: {
        blogs: {
          _count: 'desc',
        },
      },
    })
    res.status(200).json(categories)
  }
  catch{
    res.status(404).send("ERROR")
  }
})


tags.post("/",isAuth,async (req,res) => {
  try{
    const newCategory = await prisma.tag.create({
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

tags.delete("/",isAuth,isAdmin,async (req,res) => {
  try{
    const deleteCategory = await prisma.tag.delete({
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

tags.put("/",isAuth,isAdmin,async (req,res) => {
  try{
    const updateCategory = await prisma.tag.update({
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

module.exports = tags
