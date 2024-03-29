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

writer.get("/hot",async (req,res) => {
  try{
    const writers = await prisma.user.findMany({
      where:{
        isWriter:true
      },
      include:{
            _count: {
                  select: { 
                        blogs: true,
                        followers:true,
                        following:true
                  },
            },
      }
    })
    res.status(200).json(writers)
  }
  catch{
    res.status(404).send("Error while loading from the database")
  }
})

writer.get("/category",async (req,res) => {
  try{
    const users = await prisma.category.findMany({
        include:{
          blogs:{
            select:{
              user:{
                include:{
                  _count: {
                  select: { 
                        blogs: true,
                        followers:true,
                        following:true
                  },
            }     
                }
              }
            }
          }
        }
        
    })
    ///const writers = users.filter((user) => { return user.isWriter === true})
    const writers = users.filter((user) => { return user.blogs.length != 0})
    res.json(writers)
  }
  catch{
    console.log("ERROR")
  }
})

writer.get("/category/:name",async (req,res) => {
  try{
    const users = await prisma.category.findUnique({
        where:{
          name:req.params.name
        },
        include:{
          blogs:{
            select:{
              user:{
                include:{
                  _count: {
                  select: { 
                        blogs: true,
                        followers:true,
                        following:true
                  },
            }     
                }
              }
            }
          }
        }
        
    })
    
    res.json(users)
  }
  catch{
    console.log("ERROR")
  }
})

module.exports = writer;