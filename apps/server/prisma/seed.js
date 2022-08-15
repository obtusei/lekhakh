const prisma = require("./prisma.js")
const bcrpyt = require("bcrypt");

async function encryptPassword(word){
          const has = await bcrpyt.hash(word,10);
          return has
          
}
async function main() {
          
    await prisma.user.createMany({
        data:[
          {
            name:"Test 01",
            username:"test01",
            email:"test01@gmail.com",
            password:await encryptPassword("test01"),
          },
          {
            name:"Test 02",
            username:"test02",
            email:"test02@gmail.com",
            password:await encryptPassword("test02"),
          },
          {
            name:"Test 03",
            username:"test03",
            email:"test03@gmail.com",
            password:await encryptPassword("test03"),
          },
          {
            name:"Test 04",
            username:"test04",
            email:"test04@gmail.com",
            password:await encryptPassword("test04"),
          },
          {
            name:"Test 05",
            username:"test05",
            email:"test05@gmail.com",
            password:await encryptPassword("test05"),
          },
        ]
    });


}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1)
    })
    .finally(async () =>{
        await prisma.$disconnect();
    });