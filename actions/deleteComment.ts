"use server"
import { adminClient } from "@/sanity/lib/adminClient";
import { getCommentById } from "@/sanity/lib/comment/getCommentById";
import { currentUser } from "@clerk/nextjs/server";

export const deleteComment = async (commentId: string) => {
    const user = await currentUser();
    if (!user) {
        return { error: "User not found" };
    }

    const comment = await getCommentById(commentId);
    if (!comment) {
        return { error: "Comment not found" };
    }

    if (comment.author?._id !== user.id) {
        return { error: "You are not authorized to delete this comment" };
    }

    try {
        const patch = adminClient.patch(commentId)
            .set({ content: "[DELETED]" })
            .set({ isDeleted: true });

        await patch.commit();
        return { success: "Comment deleted successfully" };
    } catch (error) {
        console.error("Failed to delete comment:", error);
        return { error: "Failed to delete comment" };
    }
};