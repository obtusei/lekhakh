const newsletter = require("express").Router()
const prisma = require("../../prisma/prisma.js")

newsletter.get("/",async (req,res) => {
  try{
    const newsletters = await prisma.newsletter.findMany()
    res.status(200).json(newsletters)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

newsletter.get("/:id",async (req,res) => {
  try{
    const newsletters = await prisma.newsletter.findUnique({where:{id:req.params.id}})
    res.status(200).json(newsletters)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

newsletter.post("/",async (req,res) => {
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

newsletter.delete("/",async (req,res) => {
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



module.exports = newsletter;