const prisma = require("../../prisma/prisma.js");

module.exports.createBlog = async (req,res) => {
  const data = req.body;
  const cat = data.category != null ? data.category:"Blog"
  try{
    const category = await prisma.category.findUnique({where:{name:cat}});
    const newTags = data.tag.map((ta) => ta ={
        name:ta
      })

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
          tag: {
            create:newTags
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
    res.status(404).send("ERROR")
  }
}

module.exports.searchBlog = async (req,res) => {
  try{
      const blogs = await prisma.blog.findMany({
        where:{
          OR:[
            {
              title:{
                contains:req.query.q
              }
            },
            {
              content:{
                contains:req.query.q
              }
            },
            {
              category:{
                name:{
                  contains:req.query.q
                }
              }
            },
          ]
        },
        include:{
          user:true,
          category:true,
          tag:true
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

module.exports.trendoftheday = async (req,res) => {
  try{
    const trending = await prisma.blog.findMany({
      take: 6,
      orderBy: {
        viewCount:'desc',
      },
      include:{
        category:true,
        user:true,
        likes:true,
        comments:true,
        tag:true
      }
    })
    res.json(trending)
  }
  catch{
    res.status(200).send("ERROR")
  }
}

module.exports.trendingBlog = async (req,res) => {
  try{
    const trending = await prisma.blog.findMany({
      take: 6,
      orderBy: {
        viewCount:'desc',
      },
      include:{
        category:true,
        user:true,
        likes:true,
        comments:true,
        tag:true
      }
    })
    res.json(trending)
  }
  catch{
    res.status(200).send("ERROR")
  }
}

module.exports.topBlog = async (req,res) => {
  try{
    const top = await prisma.blog.findMany({
      take: 10,
      include:{
        category:true,
        tag:true,
        user:true,
        likes:true,
        comments:true
      }
    })
    res.json(top)
  }
  catch{
    res.status(200).send("ERROR")
  }
}
module.exports.allBlogs = async (req,res) => {
  try{
    const allBlogs = await prisma.blog.findMany();
    res.status(200).json(allBlogs)
  }
  catch{
    res.status(404).send("ERROR")
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
    const filteredDiscover = discover.filter((dis) => {return dis.blogs.length != 0}).sort(() => Math.random() - 0.5)
    res.json(filteredDiscover)
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
                                    blogs:{
                                      include:{
                                        category:true,
                                        user:true,
                                        tag:true
                                      }
                                    }
                                  }
                              },
                        }
                  },
            }
      })
      if (!following){
          res.status(204).json(null)
      }
      const data = [];
      for(fol of following.following){
        data.push(...fol.following.blogs)
      }
      res.status(200).json(data)
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
              tag:true,
              user:true
            }
          },
          
        }       
      });
      res.send(blog)
  }catch{
      res.send("ERROR ayo")
  }
}

module.exports.getSpecificCat = async (req,res) => {
  try{
    let category = await prisma.category.findUnique({
      where:{
        name:req.params.name
      },
      include:{
        blogs:{
          include:{
            user:true,
            tag:true,
            category:true
          }
        }
      }
    })
    res.json(category)
  }
  catch{
    res.send("ERROR ho")
  }
}