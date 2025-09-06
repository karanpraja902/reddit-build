import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";
import getPosts from "@/sanity/lib/post/getPosts";
import { GetAllPostsQueryResult } from "../../../sanity.types";


const PostList = async () => {
	const posts: GetAllPostsQueryResult = await getPosts();
	const user = await currentUser();
	if(posts){
console.log(` successfully (${posts.length}) posts fetched`)
	}
	return (
		<div className="space-y-4">
			{posts?.map((post) => (
				<Post key={post._id} post={post} userId={user?.id || null} />
			)) || <p>No posts available</p>}
		</div>
	);
}
export default PostList;