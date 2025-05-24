"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchPosts } from "@/features/posts/services/postService";
import Loading from "@/components/Loading/Loading";
import { Post } from "@/features/posts/types";

export default function HomePage() {
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["public-posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <Loading type="Posts" />;
  }

  if (isError || !posts) {
    return (
      <div className="p-6 space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load posts. Please try again later.
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <Button onClick={() => router.push("/admin")}>Go To Admin</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {posts.map((post:Post) => (
          <div
            key={post.id}
            className="relative h-50 border p-4 rounded space-y-2"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground line-clamp-2">
              {post.body.slice(0, 100)}...
            </p>

            <Button
              className="absolute bottom-2 right-3 bg-green-600 text-white hover:bg-green-700 pl-4 pr-4"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              Read More
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
