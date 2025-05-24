"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface DeleteConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirm: () => void;
  loading: boolean;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationProps> = ({
  open,
  setOpen,
  handleConfirm,
  loading,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={handleConfirm}
          >
            {loading ? "Deleting" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
