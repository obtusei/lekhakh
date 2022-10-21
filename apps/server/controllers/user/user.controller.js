const prisma = require("../../prisma/prisma.js");
const bcrypt = require("bcrypt");

const allUser =async (req,res) => {
  try{
    const user = await prisma.user.findMany();
    res.status(200).json(user)
  }
  catch{
    res.status(404).send("Error while fetching all the users")
  }
}

const userAll= async (req,res) => {
  try{
    const user = await prisma.user.findUnique({
          where:{
                username:req.params.username
          },
          include:{
                _count: {
                      select: { 
                            blogs: true,
                            followers:true,
                            following:true
                      },
                },
          }
    });
    if (!user){
    res.status(204).json({message:"User not found"})
    }
    res.status(200).json(user)
  }
  catch{
    res.status(404).json({message:"Error connecting to server"}) 
  }
}

const blogs = async (req,res) => {
          try{
                    const user = await prisma.user.findUnique({
                              where:{
                                    username:req.params.username
                              },
                              include:{
                                    blogs:true,
                              }
                    })
                    if (!user){
                        res.status(204).json({message:"User not found"})
                    }
                    res.status(200).json(user.blogs)
          }
          catch{
                res.status(404).json({message:"Error connecting to server"})    
          }
}

const follower = async (req,res) => {
      try{
            const followers = await prisma.user.findUnique({
                  where:{
                        id:req.user.id
                  },
                  select:{
                        followers:{
                              select:{
                                    follower:true,
                              }
                        }
                  }
            })
            if (!followers){
                res.status(204).json({message:"User has no followers"})
            }
            res.status(200).json(followers)
      }
      catch{
           res.status(404).json({message:"Error connecting to server"})
      }
}

const following = async (req,res) => {
      try{
            const following = await prisma.user.findUnique({
                  where:{
                        id:req.user.id
                  },
                  select:{
                        following:{
                              select:{
                                    following:true,
                              }
                        },
                  }
            })
            if (!following){
                res.status(204).json({message:"User has no followers"})
            }
            res.status(200).json(following)
      }
      catch{
           res.status(404).json({message:"Error connecting to server"})
      }
}

const followingSpecific = async (req,res) => {
      try{
            const follow = await prisma.follows.findMany({
              where:{
                AND:[
                  {
                    followerId:{
                      equals:req.user.id
                    }
                  },
                  {
                    followingId:{
                      equals:req.params.id
                    }
                  }
                ] 
              },
            })
            res.status(200).json({doesFollow:follow.length != 0})
      }
      catch{
           res.status(404).json({message:"Error connecting to server"})
      }
}

const liked = async (req,res) => {
      try{
            const liked = await prisma.user.findUnique({
                  where:{
                        id:req.user.id
                  },
                  select:{
                        liked:true,
                  }
            })
            if (!liked){
                res.status(204).json({message:"User has no followers"})
            }
            res.status(200).json(liked)
      }
      catch{
           res.status(404).json({message:"Error connecting to server"})
      }
}

const commented = async (req,res) => {
      try{
            const commented = await prisma.user.findUnique({
                  where:{
                        username:req.params.username
                  },
                  select:{
                        commented:true,
                  }
            })
            if (!commented){
                res.status(204).json({message:"User has not commented on any blogs"})
            }
            res.status(200).json(commented)
      }
      catch{
           res.status(404).json({message:"Error connecting to server"})
      }
}

const savedBlogs = async (req,res) => {
  try{
    const savedBlogs = await prisma.savedBlogByUser.findMany({
          where:{
               userId:{
                  equals:req.user.id
               }
          }
    })
    if (!savedBlogs){
      res.status(204).json({message:"User has no followers"})
    }
      res.status(200).json(savedBlogs)
  }
  catch{
    res.status(404).json({message:"Error connecting to server"})
  }
}

const createUser = async (req,res) => {
      try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            let newUser = await prisma.user.create({
                  data:{
                        name:req.body.name,
                        username:req.body.username,
                        email:req.body.email,
                        password:hashedPassword,
                  }
            })
            res.status(201).json({message:"New user is registered."});
      }
      catch{
            res.status(404).json({message:"Error connecting to server"})
      }
}

const searchUser = async (req,res) => {
  try{
    const user = await prisma.user.findMany({
      where:{
        OR:[
          {
            email:{
              contains:req.query.q
            }
          },
          {
            username:{
              contains:req.query.q
            }
          },
          {
            name:{
              contains:req.query.q
            }
          }
        ]
      }
    })
    res.status(200).json(user)
  }
  catch{
    res.status(404).send("Error while searching user")
  }
}

const doesUsernameExist = async (req,res) => {
  try{
    const find = await prisma.user.findUnique({
      where:{
        username:req.params.username
      }
    })

    if (find){
      res.send({userExist:true})
    }else{
      res.send({userExist:false})
    }
  }
  catch{
    res.status(404).send("ERROR aayo")
  }
}

const doesUserEmailExist = async (req,res) => {
  try{
    const find = await prisma.user.findUnique({
      where:{
        email:req.params.email
      }
    })

    if (find){
      res.send({userExist:true})
    }else{
      res.send({userExist:false})
    }
  }
  catch{
    res.status(404).send("ERROR aayo")
  }
}

module.exports = {
      allUser,
      userAll,
      blogs,
      follower,
      following,
      followingSpecific,
      savedBlogs,
      liked,
      commented,
      createUser,
      // editInfo
      searchUser,
      doesUsernameExist,
      doesUserEmailExist
}