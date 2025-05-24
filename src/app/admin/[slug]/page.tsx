"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchPost } from "@/features/posts/services/postService";
import PostWriteForm from "@/features/posts/components/PostWriteForm";
import Loading from "@/components/Loading/Loading";

export default function PostEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.slug as string;


  const postId = id !== "new" ? Number(id) : null;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId!),
    enabled: !!postId,
    retry: false,
  });

  if (postId && isLoading) {
    return (
     <Loading type="Post" />
    );
  }

  if (isError) {
    toast.error("Failed to load post.");
    router.push("/admin");
    return null;
  }

  const preprocessedPost = post
    ? {
        ...post,
        body: `<p>${post.body}</p>`,
      }
    : null;

  return <PostWriteForm post={preprocessedPost} />;
}
