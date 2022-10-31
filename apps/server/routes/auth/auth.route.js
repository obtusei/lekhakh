const auth = require('express').Router();
const passport = require("passport");
const {createUser, doesUsernameExist, checkIfUserExist, checkIfEmailExist} = require("../../controllers/user/user.controller");
const prisma = require("../../prisma/prisma.js");
const {doesUserNameExists,doesEmailExists} = require("../../controllers/auth/userNameEmailValidation.js")
const {linkSession } = require("../../controllers/auth/auth.controller.js")
auth.post("/register",checkIfUserExist,checkIfEmailExist,createUser);

// auth.post('/login', passport.authenticate('local'));
auth.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).json({incorrect:true});
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

auth.put("/info",doesUserNameExists,doesEmailExists,async (req,res) => {
    try{
      const userUpdate = await prisma.user.update({
        where:{
          id:req.user.id
        },
        data:{
          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          bio:req.body.bio,
          dateOfBirth:req.body.dob
        }
      })
      res.status(200).json(userUpdate)
    }
    catch{
      res.status(404).send("ERRO updating the user info")
    }
})

module.exports = auth