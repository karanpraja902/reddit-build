import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";
import getPosts from "@/sanity/lib/post/getPosts";


const PostList = async () => {
	const posts = await getPosts();
	const user = await currentUser();
	if(posts){
console.log(` successfully (${posts.length}) posts fetched`)
	}
	return (
		<div className="space-y-4">
			{posts.map((post:any) => (
				<Post key={post._id} post={post} userId={user?.id || null} />
			))}
		</div>
	);
}
export default PostList;