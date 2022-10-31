const path = require("path")
const multer = require("multer")
const fs = require("fs-extra")
const prisma = require("../prisma/prisma")
const express = require("express")
const uploadRouter = express.Router()


let storage = multer.diskStorage({
  destination:function (req,file,cb){
      cb(null,`./upload/temp/`)
  }
  , filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

let upload = multer({
          storage: storage,
          fileFilter: function (req, file, callback) {
                    var ext = path.extname(file.originalname);
                    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                      // if (ext !== ".pdf"){
                              return callback(new Error('Only images are allowed'))
                    }
                    callback(null, true)
          },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('file')

uploadRouter.use(upload)
// uploadRouter.use("/upload",async (req,res,next) => {
//   next()
// },express.static(path.join(__dirname, 'upload/temp/6.jpg')))

uploadRouter.get("/user",async (req,res) => {
  try{
    const user = await prisma.user.findUnique({
      where:{
        id:req.user.id
      }
    })
    res.redirect(user.image)
  }
  catch{
    res.send("ERROR")
  }
})

uploadRouter.post('/upload', function (req, res, next) {
  upload(req, res, async function (err) {
    const filename = req.file.originalname;
    const ext = path.extname(filename)
    const user = await prisma.user.findUnique({
      where:{
        id:req.user.id
      }
    })
    const newFileName = `${req.user.id}${ext}`
    const newPath = `./upload/avatar/${user?.username}/${newFileName}`
    const imagePath = `/profile/${user.username}/${newFileName}`
    const ifExist = await fs.pathExists(newPath)
    const move = () => {
      fs.move("./upload/temp/" + filename,newPath,async function(err){
        if(err){
                  console.log("*****************************: " + ifExist)
                  console.log(err)
        }
        const userWithImage = await prisma.user.update({
          where:{
            id:req.user.id,
          },
          data:{
            image:imagePath
          }
        })
        res.json({
                  success:true,
                  message:"Image uploaded successfully",
                  user:userWithImage

        });
    })
    }
    if (ifExist == true){
      fs.remove(newPath)
      .then((res) => {
        move()
      })
      .catch((err) => console.log("ERROR"))
    }
    else{
      move()
    }
  })
})



module.exports = uploadRouter