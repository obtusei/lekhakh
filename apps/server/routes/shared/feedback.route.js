const feedback = require("express").Router()
const prisma = require("../../prisma/prisma.js")

feedback.get("/",async (req,res) => {
  try{
    const newsletters = await prisma.findMany()
    res.status(200).json(newsletters)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

feedback.post("/",async (req,res) => {
  try{
    const newsletter = await prisma.newsletter.create({
      data:{
        email:req.body.email
      }
    })
    res.status(200).json(newsletter)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

feedback.delete("/",async (req,res) => {
  try{
    const newsletter = await prisma.newsletter.delete({
      where:{
        id:req.body.id
      }
    })
    res.status(200).json(newsletter)
  }
  catch{
    res.status(404).send("ERROR")
  }
})



module.exports = feedback;