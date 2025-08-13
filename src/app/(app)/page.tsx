
import PostList from "@/components/post/PostList";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div >
    {/* Banner  */}
    <section className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div >
          <h1 className="test-2xl font-bold">Home</h1>
            <p className="text-sm text-gray-600">
              Recent posts from all the communities
            </p>
        </div>
      </div>
    </section>
     {/* Posts */}
<section className="my-8">
<div className="mx-auto max-w-7x1
px-4">
<div className="flex flex-col
gap-4">
<PostList/>
</div>
</div>
</section>
    </div>
  );
}
