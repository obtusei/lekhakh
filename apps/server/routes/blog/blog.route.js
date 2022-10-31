const blog = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const { createBlog, specificBlog, trendingBlog, followingBlog, usersBlog, discoverBlog, searchBlog, topBlog, trendoftheday, getSpecificCat, allBlogs } = require("../../controllers/blog/blog.controller.js")
const { likeABlog, commentOnBlog, deleteALike, deleteComment, saveABlog, deleteASave, isBloggedLikeBySessionUser, ifLikeExist, ifSaveExist, isBloggedSaveBySessionUser, getComments } = require("../../controllers/blog/likeComment.controller.js");
const prisma = require('../../prisma/prisma.js');
const blogs =  require("../../prisma/blogs.json")
/* -------------------------------------------------------------------------- */
/*                                 GET REQUEST                                */
/* -------------------------------------------------------------------------- */
blog.get("/",allBlogs)
//Discover
blog.get("/discover", discoverBlog);
blog.get("/top",topBlog)
//Trending
blog.get("/trendoftheday",trendoftheday);
blog.get("/trending", trendingBlog);
//Following
blog.get("/following", isAuth, followingBlog)
//Search
blog.get("/search",searchBlog);
//Is Liked
blog.get("/isLiked/:id",isBloggedLikeBySessionUser)
blog.get("/isSaved/:id",isBloggedSaveBySessionUser)
//Get Comment
blog.get("/comment/:id",getComments)
//Category
blog.get("/category/:name",getSpecificCat);

var down = 0
var up = 3
blog.get("/createMany",async (req,res) => {
  try{
    const categories = await prisma.category.findMany();
    const users = await prisma.user.findMany()
    const crandom = Math.floor(Math.random() * categories.length);
    const urandom = Math.floor(Math.random() * users.length);
    const newten = blogs.slice(down,up)
    const newBlogs = await Promise.all(newten.map(async (blog) => blog = {
              title:blog.title,
              content:blog.content,
              createdAt:blog.createdAt,
              updatedAt:blog.updatedAt,
              userId:users[urandom].id,
              categoryId:categories[crandom].id
    }))

    const manyBlogs = await prisma.blog.createMany({data:newBlogs});
    down += 4
    up += 4
    res.json({down,up,manyBlogs})
  }
  catch{
    res.send("CREATE MANY ERROR")
  }
})
/* -------------------------------------------------------------------------- */
/*                                POST REQUEST                                */
/* -------------------------------------------------------------------------- */

blog.post("/create", isAuth, createBlog);

blog.post("/like",isAuth,ifLikeExist,likeABlog)
blog.post("/comment",isAuth,commentOnBlog);
blog.post("/save",isAuth,ifSaveExist,saveABlog);



/* -------------------------------------------------------------------------- */
/*                               DELETE REQUEST                               */
/* -------------------------------------------------------------------------- */

blog.delete("/like", deleteALike)
blog.delete("/comment/:id", deleteComment)
blog.delete("/save", deleteASave)

blog.get("/:id", specificBlog);
blog.get("/:username/blogs", usersBlog)



module.exports = blog;