import { IUser } from 'ui/lib/interfaces';
import { IBlog } from './interfaces';

const user:IUser = {
  id:"1",
  name:"John Doe",
  username:"johndoe",
  email:"john@example.com",
  emailVerified:"false",
  isVerifiedUser:false,
  isPublicAccount:true,
  isWriter:true,
  createdAt:"20202",
  bio:"What the fuck god say doesnt matter to me",
  dataOfBirth:"2020-01-03",
  role:"USER",
  image:"https://randomuser.me/api/portraits/women/22.jpg",
  followers:0,
  following:0,
}

const blogData:[IBlog] = [
          {
                    id:"12",
                    title:"The Future of the Web",
                    createdAt:"2020-01-01",
                    updatedAt:"2020-01-01",
                    content:"The Future of the Web is a new book that will be published in 2020.",
                    viewCount:13,
                    category:{
                      id:"1",
                      name:"Web and Technology"
                    },
                    user:user,
                    tags:[
                      {
                        id:"1",
                        name:"#poem"
                      }
                    ],
                    
          },
          
          
]



export default blogData;