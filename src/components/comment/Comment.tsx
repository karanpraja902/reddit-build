"use client"
import { GetPostCommentsQueryResult } from "../../../sanity.types";
import React from "react";
import { GetCommentRepliesQueryResult } from "../../../sanity.types";
import { getCommentReplies } from "../../sanity/lib/comment/getCommentReply";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import TimeAgo from "react-timeago";
import CommentReply from "./CommentReply";
import CommentList from "./CommentList";

async function Comment({
    postId,
    comment,
    userId,
}: {
    postId: string;
    comment: GetPostCommentsQueryResult[number]|GetCommentRepliesQueryResult[number];
    userId: string | null;
}) {
    // const replies = await getCommentReplies(comment._id, userId); // Fixed: __id → _id
    const userVoteStatus = comment.votes?.voteStatus; // Added optional chaining
    return (
  <article className="py-5 border-b border-gray-100 last:border-0">
    <div className="flex gap-4">
      {/* PostVoteButtons would go here */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">

          {/* Author Avatar */}
          {comment.author?.imageUrl ? (
            <div className="flex-shrink-0">
              <Image
                src={comment.author.imageUrl}
                alt={`${comment.author.username}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <div className="flex-shrink-0">
              <UserCircle className="w-10 h-10 text-gray-300" />
            </div>
          )}
          
     <h3 className="font-medium text-gray-900">
    {comment.author?.username || "Anonymous"}
</h3>
<span className="text-xs text-gray-500">
    <TimeAgo date={new Date(comment.createdAt!)} />
</span>

<p className="text-gray-700 leading-relaxed">{comment.content}</p>

<CommentReply postId={postId} comment={comment} />

{/* Comment replies - supports infinite nesting */}
{/* {replies?.length > 0 && (
    <div className="mt-3 ps-2 border-s-2 border-gray-100">
        <CommentList postId={postId} comments={replies} userId={userId} />
    </div>
)}  */}

    {/* Author Name & Timestamp */}
          <div>
            <p className="font-medium">{comment.author?.username}</p>
            {/* <p className="text-sm text-gray-500">
              {new Date(comment._createdAt).toLocaleDateString()}
            </p> */}
          </div>
        </div>
        
        {/* Comment Content */}
        <p className="text-gray-800">{comment.content}</p>
      </div>
    </div>
  </article>
);
}

export default Comment;