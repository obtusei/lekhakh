const prisma = require("../../prisma/prisma.js");

module.exports.ifLikeExist = async (req,res,next) => {
  try{
    const like = await prisma.like.findMany({
      where:{
        AND:[
          {
            blogId:{
              equals:req.body.blogId
            }
          },
          {
            userId:{
              equals:req.user.id
            }
          }
        ]
      }
    })

    if (like.length == 1){
      res.send("Already Liked")
    }else{
      next()
    }
  }
  catch{
    res.send("ERROR")
  }
}

module.exports.likeABlog = async (req,res) => {
  try
  {
    const createLike  = await prisma.like.create({
      data:{
        blogId:req.body.blogId,
        userId:req.user.id
      }
    })
    res.status(200).json(createLike)
       
  }
  catch{
    res.status(404).send("Couldn't like the blog.")
  }
}

module.exports.deleteALike = async (req,res) => {
  try{
    const ifExist  = await prisma.like.findMany({
      where:{
        AND:[
          {
            blogId:{
              equals:req.body.blogId
            }
          },
          {
            userId:{
              equals:req.user.id
            }
          }
        ]
      }
    })
    const deleteLike  = await prisma.like.delete({
      where:{
        id:ifExist[0].id
      }
    })
    res.status(200).json(deleteLike)
  }
  catch{
    res.status(404).send("Couldn't delete the blog: " + req.body.blogId + " by " + req.user.id)
  }
}


module.exports.commentOnBlog = async (req,res) => {
  try{
    const createComment = await prisma.comment.create({
      data:{
        text:req.body.comment,
        blogId:req.body.blogId,
        userId:req.user.id
      }
    });
    res.status(200).json(createComment)
  }
  catch{
    res.status(404).send(`Couldn't comment "${req.body.comment}" on the blog ${req.body.blogId} by ${req.user.id}`)
  }
}

module.exports.deleteComment = async (req,res) => {
  try{
    const deletion  = await prisma.comment.delete({
      where:{
        id:req.params.id
      }
    })
    res.status(200).json(deletion)
  }
  catch{
    res.status(404).send("Couldn't delete on the blog.")
  }
}

module.exports.ifSaveExist = async (req,res,next) => {
  try{
    const ifsaveExist = await prisma.savedBlogByUser.findMany({
      where:{
        AND:[
          {
            blogId:{
              equals:req.body.blogId
            }
          },
          {
            userId:{
              equals:req.user.id
            }
          }
        ]
      }
    })

    if (ifsaveExist.length == 1){
      res.send("Already Liked")
    }else{
      next()
    }

  }catch{
    res.send("ERROR hecki")
  }
}
module.exports.saveABlog = async (req,res) => {
  try{
    const createSave  = await prisma.savedBlogByUser.create({
      data:{
        blogId:req.body.blogId,
        userId:req.user.id
      }
    })
    res.status(200).json(createSave)
  }
  catch{
    res.status(404).send("Couldn't save the blog.")
  }
}

module.exports.deleteASave = async (req,res) => {
  try{
    const ifExist  = await prisma.savedBlogByUser.findMany({
      where:{
        AND:[
          {
            blogId:{
              equals:req.body.blogId
            }
          },
          {
            userId:{
              equals:req.user.id
            }
          }
        ]
      }
    })
    const deleteSave  = await prisma.savedBlogByUser.delete({
      where:{
        id:ifExist[0].id
      }
    })
    res.status(200).json(deleteSave)
  }
  catch{
    res.status(404).send("Couldn't delete the saved blogs")
  }
}

module.exports.getComments = async (req,res) => {
  try{
    const comments = await prisma.comment.findMany({
      where:{
        blogId:{
          equals:req.params.id
        }
      },
      include:{
        User:true
      }
    })

    res.status(200).json(comments)
  }
  catch{
    res.status(404).send("ERROR")
  }
}


module.exports.isBloggedLikeBySessionUser = async (req,res) => {
  try{

    const like = await prisma.like.findMany({
      where:{
        AND:[
          {
            blogId: {
              equals: req.params.id,
            },
          },
          {
            userId: {
              equals: req.user.id,
            },
          },
        ]
      }
    })    
    res.json({doesLike:like.length != 0})
  }
  catch{
    res.send("ERROR")
  }
}

module.exports.isBloggedSaveBySessionUser = async (req,res) => {
  try{

    const save = await prisma.savedBlogByUser.findMany({
      where:{
        AND:[
          {
            blogId: {
              equals: req.params.id,
            },
          },
          {
            userId: {
              equals: req.user.id,
            },
          },
        ]
      }
    })    
    res.json({doesSave:save.length != 0})
  }
  catch{
    res.send("ERROR")
  }
}