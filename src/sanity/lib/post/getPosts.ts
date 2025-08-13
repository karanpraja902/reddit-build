import { defineQuery } from "groq";
import { sanityFetch } from "../live";


 const getPosts=async ()=> {
    // Execute Query
    const getAllPostsQuery=
    defineQuery(`*[_type=='post']{
_id,
title, 
"slug":slug.current,
body, 
publishedAt,
"author":author->,
"subreddit":subreddit->,
image,
isDeleted
    }|order(publishedAt desc)`)
    const posts=await sanityFetch({query:getAllPostsQuery});
    return posts.data;
 }
 export default getPosts;