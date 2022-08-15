const { Strategy } = require('passport-local');
const prisma = require("../prisma/prisma.js");
const bcrypt = require('bcrypt')

const customFields = {
          usernameField: 'email',
          passwordField: 'password'
}

const validateUser = async (email,password,done) => {
          const user = await prisma.user.findUnique({
                    where: {
                                email: email
                    }
          })
          const isPasswordValid = await bcrypt.compare(password, user.password)
          if (!user) {
                    return done(null, false, { message: 'Incorrect email or password.' });
          }
          if (!isPasswordValid) {
                    return done(null, false, { message: 'Incorrect email or password.' });
          }
          return done(null, user);
}

const strategy = new Strategy(customFields,validateUser)

module.exports = strategy;




