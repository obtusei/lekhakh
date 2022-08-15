const prisma = require("../../prisma/prisma.js");

const checkUsername = async (username) => {
          try{
                    const user = await prisma.user.findUnique({
                    where:{
                              username:username
                    }
                    })
                    if (!user){
                    return true
                    }
                    return false
          }
          catch{
                    return null
          }
}

const follow = async (req,res) => {
          try{
                    const userToFollow = await prisma.user.findUnique({
                        where:{
                              username:"test05"
                        }
                    })
                    const userToBeFollowed = await prisma.user.findUnique({
                        where:{
                              id:req.user.id
                        }
                    })

                    const following = await prisma.follows.create({
                        data:{
                              followerId:userToBeFollowed.id,
                              followingId:userToFollow.id
                        }
                    });

                    res.json(following)
                  // res.json(userToBeFollowed)
          }
          catch{
                    console.log("ERORR while following");    
          }
}


const unfollow = async (req,res) => {
          try{
                    const userToFollow = await prisma.user.findUnique({
                        where:{
                              username:"test05"
                        }
                    })
                    const userToBeFollowed = await prisma.user.findUnique({
                        where:{
                              id:req.user.id
                        }
                    })

                    const following = await prisma.follows.delete({
                        data:{
                              followerId:userToBeFollowed.id,
                              followingId:userToFollow.id
                        }
                    });

                    res.json(following)
                  // res.json(userToBeFollowed)
          }
          catch{
                    console.log("ERORR while following");    
          }
}



const editInfo = async (req,res) => {
      try{
                    
                    const user = await prisma.user.update({
                        where:{
                              id:req.user.id
                        },
                        data:{
                              name:req.body.name,
                              email:req.body.email,
                              username:req.body.username,
                              bio:req.body.bio,
                        }
                    });
                    res.json(user)
          }
          catch{
                console.log("EROR");    
          }
}

module.exports = {
      follow,
      unfollow
}