import { adminClient } from "../adminClient";

interface AddCommentParams{
    content:string;
    postId:string;
    userId:string;
    parentCommentId?:string;
}
export async function addComment({
    content,
    parentCommentId,
    postId,
    userId,
}:AddCommentParams){
    try{
// Create comment document
const commentData = {
    _type: "comment",
    content,
    author: {
        _type: "reference",
        _ref: userId,
    },
    post: {
        _type: "reference",
        _ref: postId,
    },
    parentComment: parentCommentId
        ? {
              _type: "reference",
              _ref: parentCommentId,
          }
        : undefined,
    createdAt: new Date().toISOString(),

};
const comment=await adminClient.create(commentData)
return {comment}//why inside curly bracket
// const comment = "This is a comment!";
// return { comment }; // Returns { comment: "This is a comment!" }
console.log("comment")
console.log(comment)
    }catch(error){
        console.log("Failed to add comment:",error)
        return {error:"Failed to add comment"}

    }
}