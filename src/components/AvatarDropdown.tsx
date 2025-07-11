import React from "react";
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
import { CircleUser, LogOut, Moon, Sun, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

function AvatarDropdown() {
  const { theme, setTheme } = useTheme();
  const { data, status } = useSession();
  const location = usePathname();

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={location.includes("appearing") ? "hidden" : ""}
        asChild
      >
        <Avatar className="cursor-pointer">
          <AvatarImage src={data?.user?.avatar || ""} />
          <AvatarFallback>
            {data?.user?.fullName?.slice(0, 1) || ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="text-lg font-semibold p-1">
          {data?.user?.fullName}
          <p className="text-muted-foreground text-sm">{data?.user?.email}</p>
        </div>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <CircleUser /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/usage">
            <TrendingUp /> Usage
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center justify-center gap-2">
            {theme === "dark" ? (
              <Moon size="16" className="text-muted-foreground" />
            ) : (
              <Sun size="16" className="text-muted-foreground" />
            )}
            Theme
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
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdown;
