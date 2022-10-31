const users = require('express').Router();
const { isAuth, isAdmin } = require('../../controllers/auth/authMiddleware.js');
const prisma = require('../../prisma/prisma.js')

users.get("/all",async (req,res) => {
  try{
    const user = await prisma.user.findMany()
    res.json({data:user})
    
  }
  catch{
    console.log("ERROR")
  }
})

users.get("/all/blogs",async (req,res) => {
  try{
    const blogs = await prisma.blog.findMany({
      include:{
        user:true,
        category:true
      }
    })
    res.json(blogs)
    
  }
  catch{
    console.log("ERROR")
  }
})

users.get("/admin",async (req,res) => {
  try{
    const user = await prisma.user.findMany({
      where:{
        role:{
          equals:"ADMIN"
        }
      }
    })
    res.json(user)
    
  }
  catch{
    console.log("ERROR")
  }
})

users.get("/monthly",async (req,res) => {
  const date = new Date("2022-07-30T10:54:50.025Z")
  const startDate = new Date("2022-08-30");
  const endDate = new Date("2022-01-01")
  try{
    const user = await prisma.user.findMany({
      where:{
        createdAt: {
          lte: startDate,
          gte: endDate,
        }
      }
    })
    res.status(200).json(user)
  }catch{
    res.status(404).send("ERROR aayo")
  }
})

users.get("/total",async (req,res) => {
  try{
    const users = await prisma.user.count()
    const blogs = await prisma.blog.count()
    const categories = await prisma.category.count()
    const tags = await prisma.tag.count()
    const newsletters =  await prisma.newsletter.count()
    res.json({
      users,
      blogs,
      categories,
      tags,
      newsletters,
    })
  }
  catch{
    console.log("ERROR")
  }
})

users.post("/admin/:id",async (req,res) => {
  try{
    const user = await prisma.user.update({
      where:{
        id:req.params.id
      },
      data:{
        role:"ADMIN"
      }
    })
    res.json(user)
  }
  catch{
    console.log("ERROR")
  }
})

users.delete("/admin/:id",async (req,res) => {
  try{
    const user = await prisma.user.update({
      where:{
        id:req.params.id
      },
      data:{
        role:"USER"
      }
    })
    res.json(user)
  }
  catch{
    console.log("ERROR")
  }
})



module.exports = users;