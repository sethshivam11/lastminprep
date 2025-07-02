import React, { ChangeEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { removeAvatar, updateAvatar } from "@/services/user";
import { toast } from "sonner";

function AvatarInput() {
  const { data } = useSession();
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    const response = await updateAvatar(e.target.files[0]);
    if (response?.success) {
      await session.update();
      toast.success("Profile picture was updated");
    } else {
      toast.error("Cannot update profile", {
        description: response?.message,
      });
    }
  }

  async function handleRemove() {
    const response = await removeAvatar();
    if (response.success) {
      await session.update();
      toast.success("Profile picture was removed");
    } else {
      toast.error("Cannot remove profile picture", {
        description: response?.message,
      });
    }
  }

  return (
    <>
      <Menubar className="w-fit h-fit rounded-full p-0 bg-transparent border-transparent xl:justify-start justify-center">
        <MenubarMenu>
          <MenubarTrigger className="bg-tranparent w-fit p-0 hover:bg-transparent bg-transparent rounded-full">
            <Avatar className="w-40 h-40">
              <AvatarImage src={data?.user.avatar} />
              <AvatarFallback>{data?.user.fullName.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent className="rounded-xl" align="center">
            <MenubarItem
              className="py-2.5 rounded-lg pl-2.5"
              onClick={() => setDialogOpen(true)}
            >
              View
            </MenubarItem>
            <MenubarItem
              className="py-2.5 rounded-lg pl-2.5 text-blue-500 focus:text-blue-500"
              onClick={() => inputRef.current?.click()}
            >
              Update
            </MenubarItem>
            {data?.user?.avatar !==
              "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1741416419/lastminprep/qnzy9jiix6hyfrr4cddx.png" && (
              <MenubarItem
                className="py-2.5 rounded-lg pl-2.5 text-red-500 focus:text-red-500"
                onClick={handleRemove}
              >
                Remove
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <input
        type="file"
        id="update-avatar"
        className="w-0 h-0"
        accept="image/jpeg,image/jpg,image/png"
        ref={inputRef}
        onChange={handleFiles}
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-8">
          <DialogTitle className="sr-only">{data?.user.fullName}</DialogTitle>
          <Image
            src={data?.user.avatar || ""}
            alt=""
            width="400"
            height="400"
            className="rounded-lg mx-auto select-none"
            draggable={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AvatarInput;
