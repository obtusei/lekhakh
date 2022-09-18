const blog = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const { createBlog, specificBlog, trendingBlog, followingBlog, usersBlog, discoverBlog, searchBlog, topBlog, trendoftheday, getSpecificCat } = require("../../controllers/blog/blog.controller.js")
const { likeABlog, commentOnBlog, deleteALike, deleteComment, saveABlog, deleteASave } = require("../../controllers/blog/likeComment.controller.js");
const prisma = require('../../prisma/prisma.js');
/* -------------------------------------------------------------------------- */
/*                                 GET REQUEST                                */
/* -------------------------------------------------------------------------- */

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
//Category
blog.get("/category/:name",getSpecificCat);
/* -------------------------------------------------------------------------- */
/*                                POST REQUEST                                */
/* -------------------------------------------------------------------------- */

blog.post("/create", isAuth, createBlog);

blog.post("/like", likeABlog)
blog.post("/comment", commentOnBlog);
blog.post("/save", saveABlog)


/* -------------------------------------------------------------------------- */
/*                               DELETE REQUEST                               */
/* -------------------------------------------------------------------------- */

blog.delete("/like", deleteALike)
blog.delete("/comment", deleteComment)
blog.delete("/save", deleteASave)

blog.get("/:id", specificBlog);
blog.get("/:username/blogs", usersBlog)

module.exports = blog;