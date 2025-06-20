import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

function Guidelines() {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Guidelines</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2 text-muted-foreground list-disc ml-4">
          <li>Make sure you have a stable internet connection.</li>
          <li>Use a laptop/desktop for coding tests to avoid disruptions.</li>
          <li>Attempt all questions since there&apos;s no negative marking.</li>
          <li>Double-check your answers before final submission.</li>
        </ul>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Guidelines;
