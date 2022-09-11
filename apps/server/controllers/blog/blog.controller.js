const prisma = require("../../prisma/prisma.js");

module.exports.createBlog = async (req,res) => {
  const data = req.body;
  try{
    const category = await prisma.category.findUnique({where:{name:data.category}});
    const blog  = await prisma.blog.create(
      {
        data:{
          title: data.title,
          content: data.content,
          category: {
            connect:{
              id: category.id
            }
          },
          tag:{
            create:data.tags.map(tag => ({
              name:tag
            }))
          },
          user:{
            connect:{
              id:req.user.id
            }
          }
        }
      }
    );
    res.status(200).json(blog)
  }catch{
            res.send("ERROR")
  }
}

module.exports.searchBlog = async (req,res) => {
  try{
      const blogs = await prisma.blog.findMany({
        where:{
          AND:[
            {
              title:{
                search:req.query.q
              }
            },
            {
              category:{
                name:req.query.category
              }
            },
            {
              user:{
                username:req.query.user
              }
            }
          ]
        },
        include:{
            category:true,
            user:true
        }        
      });
      res.send(blogs)
  }catch{
      res.send("ERROR")
  }
}

module.exports.specificBlog = async (req,res) => {
  try{
      const blog = await prisma.blog.findUnique({
        where:{
          id:req.params.id
        }        
      });
      const updateView = await prisma.blog.update({
        where:{
          id:req.params.id
        },
        data:{
          viewCount:blog.viewCount + 1
        },
        include:{
            category:true,
            user:true,
            likes:true,
            comments:true
        }
      })
      res.send(updateView)
  }catch{
      res.send("ERROR")
  }
}

module.exports.trendingBlog = async (req,res) => {
  try{
    const trending = await prisma.blog.findFirst({
      take: 6,
      orderBy: {
        viewCount:'desc',
      },
      include:{
        category:true,
        user:true,
        likes:true,
        comments:true
      }
    })
    res.json(trending)
  }
  catch{
    res.status(200).send("ERROR")
  }
}

module.exports.discoverBlog = async (req,res) => {
  try{
    const discover = await prisma.category.findMany({
      take:10,
      include:{
        blogs:{
          include:{
            category:true,
            user:true,
            tag:true
          }
        }
      }
    })
    const data = discover.sort(() => Math.random() - 0.5)
    res.json(data)
  }
  catch{
    res.status(200).send("ERROR")
  }
}



module.exports.followingBlog = async (req,res,next) => {
  try{
      const following = await prisma.user.findUnique({
            where:{
                  id:req.user.id
            },
            select:{
                  following:{
                        select:{
                              following:{
                                  select:{
                                    blogs:true
                                  }
                              },
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

module.exports.usersBlog = async (req,res) => {
  try{
      const blog = await prisma.user.findUnique({
        where:{
          username:req.params.username
        } ,
        include:{
          blogs:{
            include:{
              category:true,
              tag:true
            }
          },
          
        }       
      });
      res.send(blog)
  }catch{
      res.send("ERROR ayo")
  }
}