import { defineQuery } from "next-sanity";
import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";

/**
 * Handles upvoting a comment with toggle functionality
 * @param commentId - ID of the comment to upvote
 * @param userId - ID of the user voting
 * @returns The created/modified vote document or deletion result
 */
export async function upvoteComment(commentId: string, userId: string) {
    // Check if user has already voted on this comment
    const existingupvoteCommentQuery = defineQuery(`
        *[_type == "vote" && comment._ref == $commentId && user._ref == $userId][0] {
            _id,
            voteType
        }
    `);

    try {
        const existingVote = await sanityFetch({
            query: existingupvoteCommentQuery,
            params: { commentId, userId }
        });

        if (existingVote.data) {
            const vote = existingVote.data;

            // If there's already an upvote, remove it (toggle off)
            if (vote.voteType === "upvote") {
                return await adminClient.delete(vote._id);
            }

            // If there's a downvote, change it to an upvote
            if (vote.voteType === "downvote") {
                return await adminClient
                    .patch(vote._id)
                    .set({ voteType: "upvote" })
                    .commit();
            }
        }

        // Create a new upvote
        return await adminClient.create({
            _type: "vote",
            comment: {
                _type: "reference",
                _ref: commentId,
            },
            user: {
                _type: "reference",
                _ref: userId,
            },
            voteType: "upvote",
            createdAt: new Date().toISOString(), // Fixed typo: toIS0String → toISOString
        });

    } catch (error) {
        console.error("Failed to process comment upvote:", error);
        throw new Error("Failed to process comment vote");
    }
}