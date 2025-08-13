import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity"

 const getPosts=async ()=> {
    const getAllPostsQuery=
    defineQuery(`*[_type=='post'&&isDeleted!=false]{
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