const prisma = require("../../prisma/prisma.js");

module.exports.doesUserNameExists = async (req,res,next) => {
  try{
    const user = await prisma.user.findUnique({
      where:{
        username:req.body.username || ""
      }
    })
    if (user === null){
      next()
    }else{
      if (req.user.username === user.username){
        next()
      }else{
        res.status(404).json({username:"username already exists"})
      }
    }
  }
  catch{
    res.status(404).send("ERROR checking username")
  }
}

module.exports.doesEmailExists = async (req,res,next) => {
  try{
    const user = await prisma.user.findUnique({
      where:{
        email:req.body.email || ""
      }
    })
    if (user === null){
      next()
    }else{
      if (req.user.email === user.email){
         next()
      }else{
        res.status(404).json({email:"Email already exists"})
      }
    }
  }
  catch{
    res.status(404).send("Error checking email")
  }
}