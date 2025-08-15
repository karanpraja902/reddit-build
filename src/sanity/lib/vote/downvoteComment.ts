import { defineQuery } from "next-sanity";
import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";

/**
 * Handles downvoting a comment with toggle functionality
 * @param commentId - ID of the comment to downvote
 * @param userId - ID of the user voting
 * @returns The created/modified vote document or deletion result
 */
export async function downvoteComment(commentId: string, userId: string) {
    // Check if user has already voted on this comment
    const existingVoteQuery = defineQuery(`
        *[_type == "vote" && comment._ref == $commentId && user._ref == $userId][0] {
            _id,
            voteType
        }
    `);

    try {
        const existingVote = await sanityFetch({
            query: existingVoteQuery,
            params: { commentId, userId }
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
            comment: {
                _type: "reference",
                _ref: commentId,
            },
            user: {
                _type: "reference",
                _ref: userId,
            },
            voteType: "downvote",
            createdAt: new Date().toISOString(), // Fixed typo: toIS0String → toISOString
        });

    } catch (error) {
        console.error("Failed to process comment downvote:", error);
        throw new Error("Failed to process comment vote");
    }
}