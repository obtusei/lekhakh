const prisma = require("../../prisma/prisma.js");

module.exports.likeABlog = async (req,res) => {
  try{
    const ifLikeExist = await prisma.like.findMany({
      where:{
        blogId:{
          equals:req.body.blogId
        },
        userId:{
          equals:req.user.id
        }
      }
    })
    if (!ifLikeExist){
      const createLike  = await prisma.like.create({
        data:{
          blogId:req.body.blogId,
          userId:req.user.id
        }
      })
      res.status(200).json(createLike)
    }
    
    res.json("Already liked")
  }
  catch{
    res.status(404).send("Couldn't like the blog.")
  }
}

module.exports.deleteALike = async (req,res) => {
  try{
    const ifExist  = await prisma.like.findMany({
      where:{
        blogId:{
          equals:req.body.blogId
        },
        userId:{
          equals:req.user.id
        }
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
        id:req.body.id
      }
    })
    res.status(200).json(deletion)
  }
  catch{
    res.status(404).send("Couldn't delete on the blog.")
  }
}

module.exports.saveABlog = async (req,res) => {
  try{
    const ifsaveExist = await prisma.savedBlogByUser.findMany({
      where:{
        blogId:{
          equals:req.body.blogId
        },
        userId:{
          equals:req.user.id
        }
      }
    })
    if (!ifsaveExist){
      const createSave  = await prisma.savedBlogByUser.create({
        data:{
          blogId:req.body.blogId,
          userId:req.user.id
        }
      })
      res.status(200).json(createSave)
    }
    
    res.json("Already saved")
  }
  catch{
    res.status(404).send("Couldn't save the blog.")
  }
}

module.exports.deleteASave = async (req,res) => {
  try{
    const ifExist  = await prisma.savedBlogByUser.findMany({
      where:{
        blogId:{
          equals:req.body.blogId
        },
        userId:{
          equals:req.user.id
        }
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
