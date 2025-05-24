"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "../services/postService";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor/Editor";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Post, UpdatePost } from "../types";

type PostWriteFormProps = {
  post?: { id: number; title: string; body: string };
};

const PostWriteForm = ({ post }: PostWriteFormProps) => {
  const isEditMode = !!post;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title);
      setBody(`<p>${post.body}</p>`); 
    }
  }, [post, isEditMode]);

  const mutation = useMutation({
    mutationFn: (data: UpdatePost) =>
      isEditMode && post?.id
        ? updatePost(post.id, data)
        : createPost(data),
    onSuccess: (data) => {
      toast.success(isEditMode ? "Post updated!" : "Post created!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      if (!isEditMode) {
        queryClient.setQueryData(["posts"], (old: Post[] | undefined) => [data, ...(old || [])]);
      }

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error("Both title and body are required.");
      return;
    }

    mutation.mutate({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Post" : "Create New Post"}
      </h1>

      <div>
        <label className="block text-sm font-medium pb-2">Title</label>
        <Input
          className="w-full border rounded px-3 py-2 mt-1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium pb-2">Body</label>
        <Editor value={body} setValue={setBody} />
      </div>

      <Button className="mt-12" type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
          ? "Update Post"
          : "Create Post"}
      </Button>
    </form>
  );
};

export default PostWriteForm;
