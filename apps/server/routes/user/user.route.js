const user = require('express').Router();
const { session } = require('passport');
const passport = require("passport");
const { userAll,blogs,follower,createUser, savedBlogs, liked, following } =  require("../../controllers/user/user.controller.js")
const {isAuth,isAdmin} = require('../../controllers/auth/authMiddleware.js')
const {follow, unfollow} = require('../../controllers/user/userPut.controller.js')
const prisma = require("../../prisma/prisma.js");

/* -------------------------------------------------------------------------- */
/*                                 GET REQUEST                                */
/* -------------------------------------------------------------------------- */

user.get('/protected',isAuth, (req, res, next) => {
    res.send('You are logged in <br> <a href="/auth/logout">Logout</a>');
});

user.get('/admin',isAdmin, (req, res, next) => {
    res.send('You are logged in as admin. <br> <a href="/auth/logout">Logout</a>');
});
user.get("/info",(req,res) => {
    res.json(req.session)
})

user.get("/count", (req,res) => {

    if (req.session.viewcount){
        req.session.viewcount = req.session.viewcount + 1;
    }else{
        req.session.viewcount = 1;
    }
    res.send("You have visited this page " + req.session.viewcount + " times");
})

//user's saved blogs
user.get("/saved",isAuth,savedBlogs);
//user's liked blogs
user.get("/liked",isAuth,liked);
//user's commented blogs
user.get("/commented",isAuth,liked);
//User's Followers
user.get("/followers",isAuth,follower);
//user's Following
user.get("/following",isAuth,following);

/* -------------------------------------------------------------------------- */
/*                                POST REQUEST                                */
/* -------------------------------------------------------------------------- */

//user's blogs
user.post("/follow",isAuth,follow);

/* -------------------------------------------------------------------------- */
/*                               DELETE REQUEST                               */
/* -------------------------------------------------------------------------- */

user.delete("/follow",isAuth,unfollow);

/* -------------------------------------------------------------------------- */
/*                                   Dyanimc                                  */
/* -------------------------------------------------------------------------- */

//Basic User Information
user.get("/:username",userAll);
//Blogs
user.get("/:username/blogs",blogs);

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

module.exports = user