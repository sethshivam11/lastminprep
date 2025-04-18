import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

function AvatarInput() {
  return (
    <Menubar className="w-fit h-fit bg-transparent border-transparent xl:justify-start justify-center">
      <MenubarMenu>
        <MenubarTrigger className="bg-tranparent w-fit p-0 hover:bg-transparent bg-transparent rounded-full">
          <Avatar className="w-40 h-40">
            <AvatarImage />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="rounded-xl" align="center">
          <MenubarItem className="py-2.5 rounded-lg pl-2.5">View</MenubarItem>
          {/* {user.avatar !==
                  "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png" && (
                  <MenubarItem
                    className="py-2.5 rounded-lg pl-2.5 text-red-500"
                    onClick={() => dispatch(removeAvatar())}
                  >
                    Remove
                  </MenubarItem>
                )} */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default AvatarInput;
