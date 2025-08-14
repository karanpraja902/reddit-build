"use server "

import { getUser } from "@/sanity/lib/user/getUser";

 export async function createComment(
    postId:string,
    parentCommentId?:string,
    content:string
 )
 {
   const user=await getUser();
   if("error" in user){
   
r
}
    
   )

