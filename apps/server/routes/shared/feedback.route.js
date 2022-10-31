const feedback = require("express").Router()
const prisma = require("../../prisma/prisma.js")

feedback.get("/",async (req,res) => {
  try{
    const feedbacks = await prisma.mailService.findMany({
      where:{
        type:{
          equals:"FEEDBACK"
        }
      }
    })
    res.status(200).json(feedbacks)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

feedback.post("/",async (req,res) => {
  try{
    const feedback = await prisma.mailService.create({
      data:{
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        title:req.body.title,
        type:"FEEDBACK"
      }
    })
    res.status(200).json(feedback)
  }
  catch{
    res.status(404).send("ERROR")
  }
})

feedback.delete("/",async (req,res) => {
  try{
    const report = await prisma.mailService.delete({
      where:{
        id:req.body.id
      }
    })
    res.status(200).json(report)
  }
  catch{
    res.status(404).send("Error deleting the feedback")
  }
})



module.exports = feedback;