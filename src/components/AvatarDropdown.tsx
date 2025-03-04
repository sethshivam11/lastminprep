import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

function AvatarDropdown({ isMobile }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const { data, status } = useSession();
  const location = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={location.includes("appearing") ? "hidden" : ""}
        asChild
      >
        <Avatar className={`cursor-pointer ${isMobile ? "sm:hidden" : ""}`}>
          <AvatarImage
            src={
              data?.user?.image ||
              "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png"
            }
          />
          <AvatarFallback>{data?.user?.name?.[0] || ""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === "authenticated" ? (
          <>
            <div className="text-2xl font-semibold">
              {data?.user?.name}
              <p className="text-muted-foreground text-sm">
                {data?.user?.email}
              </p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <CircleUser /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => signIn()}>
              <LogIn /> Log in
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {theme === "dark" ? <Moon /> : <Sun />} Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun /> Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon /> Dark
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdown;
