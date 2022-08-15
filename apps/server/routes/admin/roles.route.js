const roles = require("express").Router();
const prisma = require("../../prisma/prisma.js")


roles.get("/",async (req,res) => {
  try{
    const roles = await prisma.user.findMany({
      where:{
        role:{
          equals:"ADMIN"
        }
      }
    })
    res.status(200).json(roles)
  }
  catch{
    res.status(404).send("Can't connect to the database, sorry")
  }
})

module.exports = roles