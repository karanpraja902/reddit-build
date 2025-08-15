"use client"
import { GetPostCommentsQueryResult } from "../../../sanity.types";
import React from "react";
import { GetCommentRepliesQueryResult } from "../../../sanity.types";

import Image from "next/image";
import { UserCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import TimeAgo from "react-timeago";
import CommentList from "./CommentList";
import CommentReply from "./CommentReply";
import PostVoteButtons from "../post/PostVoteButtons";

function Comment({
    postId,
    comment,
    userId,
    replies,
}: {
    postId: string;
    comment: GetPostCommentsQueryResult[number]|GetCommentRepliesQueryResult[number];
    userId: string | null;
    replies: (GetPostCommentsQueryResult[number]|GetCommentRepliesQueryResult[number])[];
}) {
    // const replies = await getCommentReplies(comment._id, userId); // Fixed: __id → _id
    const userVoteStatus = comment.votes?.voteStatus; // Added optional chaining
    const netScore = comment.votes?.netScore || 0;
    
    return (
        <article className="bg-white rounded-lg border border-gray-200 p-4 mb-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex gap-4">
                {/* Vote buttons on the left */}
                <PostVoteButtons contentId={comment._id} votes={comment.votes} vote={userVoteStatus} contentType="comment"/>
                <div className="flex flex-col items-center gap-1 pt-1">
                    <button className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                        <ThumbsUp className={`w-4 h-4 ${userVoteStatus === 'upvote' ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
                    </button>
                    <span className="text-sm font-medium text-foreground min-w-[20px] text-center">
                        {netScore}
                    </span>
                    <button className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                        <ThumbsDown className={`w-4 h-4 ${userVoteStatus === 'downvote' ? 'text-destructive fill-current' : 'text-muted-foreground'}`} />
                    </button>
                </div>

                {/* PostVoteButtons would go here */}
                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start gap-3">
                        {/* Author Avatar */}
                        {comment.author?.imageUrl ? (
                            <div className="flex-shrink-0">
                                <Image
                                    src={comment.author.imageUrl}
                                    alt={`${comment.author.username}'s profile`}
                                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        ) : (
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center ring-1 ring-gray-200">
                                    <UserCircle className="w-6 h-6 text-primary-foreground" />
                                </div>
                            </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <span className="font-medium text-foreground">
                                    {comment.author?.username || "Anonymous"}
                                </span>
                                <span>•</span>
                                <TimeAgo date={new Date(comment.createdAt!)} />
                                {comment.replies?.length > 0 && (
                                    <>
                                        <span>•</span>
                                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                            {comment.replies.length} replies
                                        </span>
                                    </>
                                )}
                            </div>
                            
                            <p className="text-foreground leading-relaxed text-sm">
                                {comment.content}
                            </p>
                        </div>
                    </div>

                    <CommentReply postId={postId} comment={comment} />


                    {/* Comment replies - supports infinite nesting */}
                    {replies?.length > 0 && (
                        <div className="mt-3 ps-2 border-s-2 border-gray-100">
                            <CommentList postId={postId} comments={replies} userId={userId} />
                        </div>
                    )}

                    {/* Author Name & Timestamp */}
                    <div>
                        <p className="font-medium">{comment.author?.username}</p>
                        {/* <p className="text-sm text-gray-500">
                            {new Date(comment._createdAt).toLocaleDateString()}
                        </p> */}
                    </div>
                    
                    {/* Comment Content */}
                    <p className="text-foreground">{comment.content}</p>
                </div>
            </div>

            {/* Original commented code structure - kept for reference */}
            {/* 
            <article className="py-5 border-b border-gray-100 last:border-0">
                <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">

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

                            {replies?.length > 0 && (
                                <div className="mt-3 ps-2 border-s-2 border-gray-100">
                                    <CommentList postId={postId} comments={replies} userId={userId} />
                                </div>
                            )}

                            <div>
                                <p className="font-medium">{comment.author?.username}</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-800">{comment.content}</p>
                    </div>
                </div>
            </article>
            */}
        </article>
    );
}

export default Comment;