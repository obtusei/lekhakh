const blog = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const { createBlog, specificBlog, trendingBlog, followingBlog, usersBlog, discoverBlog, searchBlog } = require("../../controllers/blog/blog.controller.js")
const { likeABlog, commentOnBlog, deleteALike, deleteComment, saveABlog, deleteASave } = require("../../controllers/blog/likeComment.controller.js");
const prisma = require('../../prisma/prisma.js');
/* -------------------------------------------------------------------------- */
/*                                 GET REQUEST                                */
/* -------------------------------------------------------------------------- */
blog.get("/discover", discoverBlog);
blog.get("/trending", trendingBlog);
blog.get("/following", isAuth, followingBlog)
blog.get("/search",searchBlog);
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