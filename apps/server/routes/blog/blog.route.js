const blog = require('express').Router();
const { isAuth } = require('../../controllers/auth/authMiddleware.js');
const {createBlog, specificBlog, trendingBlog, viewCountIncrease, followingBlog} = require("../../controllers/blog/blog.controller.js")

/* -------------------------------------------------------------------------- */
/*                                 GET REQUEST                                */
/* -------------------------------------------------------------------------- */
blog.get("/discover")
blog.get("/trending",trendingBlog)
blog.get("/following",isAuth,followingBlog)


/* -------------------------------------------------------------------------- */
/*                                POST REQUEST                                */
/* -------------------------------------------------------------------------- */

blog.post("/create",isAuth,createBlog);

blog.post("/like")
blog.post("/comment")

/* -------------------------------------------------------------------------- */
/*                               DELETE REQUEST                               */
/* -------------------------------------------------------------------------- */

blog.delete("/like")
blog.delete("/comment")

blog.get("/:id",specificBlog);
blog.get("/:username/blogs")

module.exports = blog;