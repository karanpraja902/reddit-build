"use server"

import { addComment } from "@/sanity/lib/comment/addComment";
import { getUser } from "@/sanity/lib/user/getUser";
import { error } from "console";

 export async function createComment(
    postId:string,
    parentCommentId?:string,
    content:string
 )
 {
   const user=await getUser();
   if("error" in user){
      return {error:user.error}
}
   try{
      const comment=await addComment({
         postId,
         userId:user._id,
         content,
         parentCommentId
      });
      console.log(comment)
      return {comment};
   } catch(error){
      console.error("error adding comment:",error);
      return {error:"Failed to add comment"};
   }
 }
