const prisma = require("../../prisma/prisma.js");

const linkSession = async (req,res,next) => {
          try{
                    const user = await prisma.user.update({
                              where:{
                              id:req.session.passport.user
                              },
                              data:{
                              sessions:{
                                        connect:{
                                        id:req.session.id
                                        }
                              },
                              saccounts:{
                                        create:{
                                                  browser:req.useragent.browser,
                                                  os:req.useragent.os,
                                                  version:req.useragent.version,
                                                  platform:req.useragent.platform,
                                                  isDesktop:req.useragent.isDesktop,
                                        }
                              }


                              }
                    })
        next()
    } catch{
        res.send("Error link")
    }
}

module.exports = {
          linkSession
}