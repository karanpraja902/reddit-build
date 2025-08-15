import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCommentById(commentId: string) {
    // Execute Query
    const getCommentByIdQuery =
    defineQuery(`*[_type == "comment" && _id == $commentId][0] {
        __id,
        content,
        createdAt,
        "author": author->,
        isDeleted
    }`);
    
    const comment = await sanityFetch({
        query: getCommentByIdQuery,
        params: { commentId },
    });
    return comment.data;
}