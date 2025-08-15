import { defineQuery } from "next-sanity";
import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";

/**
 * Handles upvoting a post with toggle functionality
 * @param postId - ID of the post to upvote
 * @param userId - ID of the user voting
 * @returns The created/modified vote document or deletion result
 */
export async function upvotePost(postId: string, userId: string) {
    // Query to check for existing vote
    const upvotePostExistingVoteQuery = defineQuery(`
        *[_type == "vote" && post._ref == $postId && user._ref == $userId][0] {
            _id,
            voteType
        }
    `);

    try {
        // Check for existing vote
        const existingVote = await sanityFetch({
            query: upvotePostExistingVoteQuery,
            params: { postId, userId },
        });

        if (existingVote.data) {
            const vote = existingVote.data;

            // Toggle off existing upvote
            if (vote.voteType === "upvote") {
                return await adminClient.delete(vote._id);
            }

            // Convert downvote to upvote
            if (vote.voteType === "downvote") {
                return await adminClient
                    .patch(vote._id)
                    .set({ voteType: "upvote" })
                    .commit();
            }
        }

        // Create new upvote if no existing vote
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
            voteType: "upvote",
            createdAt: new Date().toISOString(), // Fixed typo: toIS0String → toISOString
        });

    } catch (error) {
        console.error("Failed to process upvote:", error);
        throw new Error("Failed to process vote");
    }
}