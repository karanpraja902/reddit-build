import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getPostVotes(postId: string) {
    const getPostVotesQuery = defineQuery(`
        {
            "upvotes": count(*[_type=="vote" && post._ref==$postId && voteType=="upvote"]),
            "downvotes": count(*[_type=="vote" && post._ref==$postId && voteType=="downvote"]),
            "netscore": count(*[_type=="vote" && post._ref==$postId && voteType=="upvote"]) - count(*[_type=="vote" && post._ref==$postId && voteType=="downvote"])
        }
    `);
    
    const result = await sanityFetch({
        query: getPostVotesQuery,
        params: { postId },
    });
    
    return result.data;
}