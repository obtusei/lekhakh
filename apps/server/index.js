const express = require("express")
const path = require("path")
const user =  require("./routes/user/user.route.js")
const writer =  require("./routes/user/writer.router.js")
const auth = require("./routes/auth/auth.route.js")
const blog = require("./routes/blog/blog.route.js")
const verify = require("./routes/email/verfiy.route.js")
const report = require("./routes/shared/report.route.js")
const feedback = require("./routes/shared/feedback.route.js")
const uploadImage = require("./routes/upload.route.js")
const newsletter = require("./routes/shared/newsletter.route")
//ADMIN
const adminUsers = require("./routes/admin/users.route.js")
const adminCategories = require("./routes/admin/category.route.js")
const adminRoles = require("./routes/admin/roles.route.js")
const tags = require("./routes/admin/tag.route.js")
//
const session = require("express-session")
const {PrismaSessionStore} = require("@quixo3/prisma-session-store")
const expressip = require('express-ip');
const prisma = require("./prisma/prisma.js");
const passport = require("passport");
const strategy = require("./config/passport.js")
const app = express();
const useragent = require('express-useragent');
const cors = require("cors")
const http = require("http")

const PORT = 3002;
const options = {
  rejectUnauthorized: false,
}

const store = new PrismaSessionStore(
          prisma,
          {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
          }
)


app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000","http://localhost:3001"],
  credentials:true
}))
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);
app.use(session(
          {
          secret: "secret",
          resave: true,
          saveUninitialized: true,
          store: store,
          cookie:{
                    maxAge: 1000 * 60 * 60 * 24 * 7,
          }
          }
))
app.use("/profile",express.static(path.join(__dirname, `upload/avatar`)))

passport.use(strategy);

passport.serializeUser((user,done) => {
          done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
          try{
                    const user = await prisma.user.findUnique({
                    where: {
                                id: id
                    }
          })
                    done(null,user)
          }
          catch{
                    done(null,false)
          }
           
})

app.use(passport.initialize());
app.use(passport.session());

// ALL ROUTES
app.get("/", (req, res) => {
          // res.send(`Hello world love! from ${req.ipInfo}`);
          if (req.user) {
        res.send(`Welcome senõr ${req.user.name}`)
    } else {
        res.send("Not signed in")
    }
          
})

app.use("/user",user)
app.use('/blog',blog)
app.use("/auth",auth)
app.use("/verify",verify)
app.use("/writer",writer)
app.use("/report",report)
app.use("/feedback",feedback)
app.use("/image",uploadImage)
app.use("/newsletter",newsletter)
//ADMIN
app.use("/admin/users",adminUsers)
app.use("/admin/categories",adminCategories)
app.use("/admin/roles",adminRoles)
app.use("/admin/tags",tags)

http.createServer(options,app).listen(PORT, () =>  `App listening on PORT ${PORT}`)
