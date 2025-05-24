"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "../services/postService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Loading from "@/components/Loading/Loading";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import { Post } from "../types";

export const AdminPostsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDialogOpen(false);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete post.");
      }
    },
  });
  

  const handleDelete = (id: number) => {
    setSelectedPostId(id);
    setDialogOpen(true);
  };

  const handleEdit = async (id: number) => {
    router.push(`/admin/${id}`);
  };

  if (isLoading) {
    return <Loading type="Posts" />;
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center flex-col gap-4 items-center p-6">
        <p className="text-red-500">Failed to load posts. Please try again.</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3 items-center">
        <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => router.push("/")}>
         Go To Public Page
        </Button>
        <Button onClick={() => router.push("/admin/new")}>
          Create New Post
        </Button>
      </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="p-4 border rounded shadow-sm flex flex-col h-full"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground line-clamp-2 flex-grow mb-3">
              {post.body}
            </p>
            <div className="mt-auto flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(post.id)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        loading={deleteMutation.isPending}
        handleConfirm={() =>
          selectedPostId && deleteMutation.mutate(selectedPostId)
          
        }
      />
    </div>
  );
};
