const report = require("express").Router()
const prisma = require("../../prisma/prisma.js")
const { isAuth, isAdmin } = require('../../controllers/auth/authMiddleware.js');

report.get("/",async (req,res) => {
  try{
    const reports = await prisma.mailService.findMany({
      where:{
        type:{
          equals:"REPORT"
        }
      }
    })
    res.status(200).json(reports)
  }
  catch{
    res.status(404).send("Error getting reports")
  }
})

report.post("/",async (req,res) => {
  try{
    const report = await prisma.mailService.create({
      data:{
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        type:"REPORT"
      }
    })
    res.status(200).json(report)
  }
  catch{
    res.status(404).send("Error posting the report")
  }
})

report.delete("/",async (req,res) => {
  try{
    const report = await prisma.mailService.delete({
      where:{
        id:req.body.id
      }
    })
    res.status(200).json(report)
  }
  catch{
    res.status(404).send("ERROR deleting the report")
  }
})

module.exports = report