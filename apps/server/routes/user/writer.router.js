const writer = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const prisma = require('../../prisma/prisma.js')

writer.get("/",async (req,res) => {
  try{
    const writers = await prisma.user.findMany({
        where:{
          isWriter:{
            equals:true
          }
        },
        include:{
          blogs:{
            select:{
              category:true
            }
          }
        }
    })
    res.json(writers)
  }
  catch{
    console.log("ERROR")
  }
})

writer.get("/cat",async (req,res) => {
  try{
    const writers = await prisma.category.findMany({
        include:{
          blogs:{
            select:{
              user:true
            }
          }
        }
    })
    res.json(writers)
  }
  catch{
    console.log("ERROR")
  }
})

module.exports = writer;