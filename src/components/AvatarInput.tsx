import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";

function AvatarInput() {
  const { data } = useSession();
  const handleRemove = () => {};

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Menubar className="w-fit h-fit bg-transparent border-transparent xl:justify-start justify-center">
        <MenubarMenu>
          <MenubarTrigger className="bg-tranparent w-fit p-0 hover:bg-transparent bg-transparent rounded-full">
            <Avatar className="w-40 h-40">
              <AvatarImage src={data?.user.avatar} />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent className="rounded-xl" align="center">
            <MenubarItem
              className="py-2.5 rounded-lg pl-2.5"
              onClick={() => setDialogOpen(true)}
            >
              View
            </MenubarItem>
            {data?.user.avatar !==
              "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png" && (
              <MenubarItem
                className="py-2.5 rounded-lg pl-2.5 text-red-500"
                onClick={handleRemove}
              >
                Remove
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-8">
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
