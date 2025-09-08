import CreateCommunityButton from "@/components/header/createCummunityButton";
import CreatePostForm from "@/components/post/CreatePostForm";
import { SubredditCombobox } from "@/components/subreddit/SubredditCombobox";

import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";


async function CreatePostPage({
    searchParams,
}: {
    searchParams: Promise<{subreddit:string}>;
}) {
    const { subreddit } = await searchParams;
    const subreddits = await getSubreddits();

   if (subreddit) {
    // Find the subreddit to display its title
    const selectedSubreddit = subreddits.find(s => s.slug === subreddit);
    const displayName = selectedSubreddit?.title || subreddit;
    
    return (
        <div>
            {/* Banner */}
            <section className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="flex items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Create Post</h1>
                            <p className="text-sm text-gray-600">
                                Create a post in the{" "}
                                <span className="font-bold">{displayName}</span> community
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="my-8">
                <CreatePostForm  />
            </section>
        </div>
    );
}
return (
    <div>
        {/* Banner */}
        <section className="bg-white border-b">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Create Post</h1>
                        <p className="text-sm text-gray-600">
                            Select a community for your post
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Content */}
        <section className="my-8">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col gap-4">
                    <div className="max-w-3xl">
                        <label className="block text-sm font-medium mb-2">
                            Select a community to post in
                        </label>
                        <SubredditCombobox
                            subreddits={subreddits}
                            defaultValue={subreddit}
                        />
                        <hr className="my-4" />
                        <p className="mt-4 text-sm text-gray-600">
                            If you don&apos;t see your community, you can create it here.
                        </p>
                        <div className="mt-2">
                            <CreateCommunityButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
}

export default CreatePostPage;