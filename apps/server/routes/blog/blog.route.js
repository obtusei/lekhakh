const blog = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const { createBlog, specificBlog, trendingBlog, followingBlog, usersBlog, discoverBlog, searchBlog, topBlog, trendoftheday, getSpecificCat } = require("../../controllers/blog/blog.controller.js")
const { likeABlog, commentOnBlog, deleteALike, deleteComment, saveABlog, deleteASave, isBloggedLikeBySessionUser, ifLikeExist, ifSaveExist, isBloggedSaveBySessionUser, getComments } = require("../../controllers/blog/likeComment.controller.js");
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
//Is Liked
blog.get("/isLiked/:id",isBloggedLikeBySessionUser)
blog.get("/isSaved/:id",isBloggedSaveBySessionUser)
//Get Comment
blog.get("/comment/:id",getComments)
//Category
blog.get("/category/:name",getSpecificCat);
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