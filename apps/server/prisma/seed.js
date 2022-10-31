const prisma = require("./prisma.js")
const bcrpyt = require("bcrypt");
const users = require('./users.json')
const blogs = require("./blogs.json")

async function encryptPassword(word){
          const has = await bcrpyt.hash(word,10);
          return has
          
}

async function createNewUsers(){
    const newUsers = await Promise.all(users.map(async (user) => user = {
            name:user.name,
            username:user.username,
            email:user.email,
            password: await encryptPassword(user.password),
            bio:user.bio,
            dateOfBirth:user.dateOfBirth,
            emailVerified:user.emailVerified
  }))
  await prisma.user.createMany({data:newUsers});
}
async function main() {

  const categories = await prisma.category.findMany();
  const users = await prisma.user.findMany()
  const crandom = Math.floor(Math.random() * categories.length);
  const urandom = Math.floor(Math.random() * users.length);
  
  const newten = blogs.slice(0,2)
  const newBlogs = await Promise.all(newten.map(async (blog) => blog = {
            title:blog.title,
            content:blog.content,
            createdAt:blog.createdAt,
            updatedAt:blog.updatedAt,
            userId:users[50].id,
            categoryId:categories[1].id
  }))

//   await prisma.user.createMany({data:newUsers});
  await prisma.blog.createMany({data:newBlogs});


}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1)
    })
    .finally(async () =>{
        await prisma.$disconnect();
    });