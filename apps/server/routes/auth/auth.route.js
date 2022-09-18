const auth = require('express').Router();
const passport = require("passport");
const {createUser} = require("../../controllers/user/user.controller");
const prisma = require("../../prisma/prisma.js");
const {linkSession } = require("../../controllers/auth/auth.controller.js")
auth.post("/register",createUser);

// auth.post('/login', passport.authenticate('local'));
auth.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

auth.get('/login-success',linkSession,(req, res, next) => {
    res.send(`<p>You successfully logged in. --> <a href="/user/protected">Go to protected route</a></p>`);  
});

auth.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

auth.get("/info",(req,res) => {
    // if (req.user) {
        res.json({ user:req.user })
    // } 
    // res.send("ERROR")
})

auth.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="login">\
    Enter Email:<br><input type="text" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

auth.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter name:<br><input type="text" name="name">\<br>Enter email:<br><input type="text" name="email">\<br>Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
    
});


auth.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = auth