'use server'

import { adminClient } from "@/sanity/lib/adminClient";
import { getPostById } from "@/sanity/lib/post/getPostById";
import { currentUser } from "@clerk/nextjs/server";

export const deletePost = async (postId: string) => {
    const user = await currentUser();
    if (!user) {
        return { error: "User not found" };
    }

    const post = await getPostById(postId);
    console.log("delete post:")
    console.log(post)
    if (!post) {
        return { error: "Post not found" };
    }

    if (post.author?._id !== user.id) {
        return { error: "You are not authorized to delete this post" };
    }
const patch=adminClient.patch(postId)
    // Commit changes   

//set post to deleted
if(post.image?.asset?._ref){
    patch.set({image:null})
console.log("1")   
}
//set post to deleted
patch.set({isDeleted:true})
patch.set({
    body:[{children:[{text:"[DELETED CONTENTS]",}]}], type:"paragraph"

})
//set title to null
patch.set({title:"[DELETED POST]"})
const result=await patch.commit();
if (result) {
    // Delete image from post
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Deleting1 image from post");
    console.log(post.image?.asset?._ref)
    if (post.image?.asset?._ref) {
       await adminClient.delete(post.image.asset._ref);
    console.log("Attempting to delete image from post");
        console.log(post.image?.asset?._ref)
        
        if (post.image?.asset?._ref) {
            try {
                // Check if there are any remaining references to this image
                const imageRef = post.image.asset._ref;
                
                // Delete the image asset
                const deleteResult = await adminClient.delete(imageRef);
                console.log("Image deleted successfully:", deleteResult)
                return {success:true}
            } catch (error) {
                console.log("Could not delete image (likely due to remaining references):", error)
                // Don't fail the post deletion if image deletion fails
            }
        } 
    }
}

// Return success message
return { success: "Post deleted successfully" };
};