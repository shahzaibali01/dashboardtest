"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Loading from "@/components/Loading/Loading";
import { fetchPost } from "@/features/posts/services/postService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PostDetailsPage() {
  const { id } = useParams();
  const postId = Number(id);
  const router = useRouter();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });

  if (isLoading) {
    return <Loading type="Post" />;
  }

  if (isError || !post) {
    toast.error("Failed to load post.");
    return <p className="text-center mt-10 text-red-600">Post not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 px-4 sm:px-6 lg:px-8 py-10">
      <Button onClick={() => router.push("/")}>
        <ArrowLeft /> Back
      </Button>
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div
          className="prose dark:prose-invert max-w-none pt-4"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
    </div>
  );
}
