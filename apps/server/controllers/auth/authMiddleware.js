const e = require("express")

module.exports.isAuth = (req,res,next) => {
          if (req.isAuthenticated()){
              next()
          }else{
              res.json({message:"NOT AUTHENTICATED"})
          }
}

module.exports.isNativeUser = (req,res,next) => {
          if (req.user.id === req.params.user.id){
                    next()
          }else{
                    res.json({message:"Not your account"})
          }
}

module.exports.isAdmin = (req,res,next) => {
          if (req.isAuthenticated() && req.user.role === "ADMIN"){
                    next()
          }else{
                    res.json({message:"NOT AN ADMIN"})
          }
}