import { defineQuery } from "next-sanity";
import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";

/**
 * Handles downvoting a post with toggle functionality
 * @param postId - ID of the post to downvote
 * @param userId - ID of the user voting
 * @returns The created/modified vote document or deletion result
 */
export async function downvotePost(postId: string, userId: string) {
    // Check if user has already voted on this post
    const downvotePostExistingVoteQuery = defineQuery(`
        *[_type == "vote" && post._ref == $postId && user._ref == $userId][0] {
            _id,
            voteType
        }
    `);

    try {
        const existingVote = await sanityFetch({
            query: downvotePostExistingVoteQuery,
            params: { postId, userId },
        });

        if (existingVote.data) {
            const vote = existingVote.data;

            // If there's already a downvote, remove it (toggle off)
            if (vote.voteType === "downvote") {
                return await adminClient.delete(vote._id);
            }

            // If there's an upvote, change it to a downvote
            if (vote.voteType === "upvote") {
                return await adminClient
                    .patch(vote._id)
                    .set({ voteType: "downvote" })
                    .commit();
            }
        }

        // Create a new downvote
        return await adminClient.create({
            _type: "vote",
            post: {
                _type: "reference",
                _ref: postId,
            },
            user: {
                _type: "reference",
                _ref: userId,
            },
            voteType: "downvote",
            createdAt: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Failed to process downvote:", error);
        throw new Error("Failed to process vote");
    }
}