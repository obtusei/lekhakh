import axios from "axios"
import { mutate } from "swr"
import { IUser } from "ui/lib/interfaces"

export const doComment = (comment:string,id:string) => {
      axios.post("/blog/comment",{comment:comment,blogId:id},{withCredentials:true})
      .then((res) => {
        mutate(`/blog/comment/${id}`)
      })
      .catch((err) => console.log("ERROR"))
}
    
export const delComment = (comment:string,id:string) => {
  axios.delete(`/blog/comment/${comment}`,{withCredentials:true})
  .then((res) => {
    mutate(`/blog/comment/${id}`)
  })
  .catch((err) => console.log("ERROR"))

}

export const handleLike = (user:IUser,doesUserLikeBlog:any,blog:any) => {
    try
    {
      if (user){
        if(doesUserLikeBlog.data){
        if (doesUserLikeBlog.data.doesLike){
          
          axios.delete("/blog/like",{withCredentials:true})
          .then((res) => {
            alert("DELETE A LIKE?")
            mutate(`/blog/isLiked/${blog.id}`)
            
          })
          .catch((err) => console.log("ERROR"))
        }
        else{
          axios.post("/blog/like",{ blogId:blog.id},{withCredentials:true})
          .then((res) => {
            mutate(`/blog/isLiked/${blog.id}`)
          })
          .catch((err) => console.log("ERROR"))
        }
      }
      }else{
        
      }
    }
    catch
    {
      console.log("ERRROR")
    }
  }