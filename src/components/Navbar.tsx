"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import AvatarDropdown from "./AvatarDropdown";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";

function Navbar() {
  const { status } = useSession();
  const location = usePathname();

  return (
    <div className="flex z-50 sticky top-0 w-full justify-between items-center sm:px-10 px-2 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`sm:hidden ${
              location.includes("/appearing") ? "hidden" : ""
            }`}
          >
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DialogTitle className="sr-only">Menu</DialogTitle>
          <div className="flex flex-col text-lg space-y-3 p-4">
            <DrawerClose asChild>
              <Link
                href="/tests"
                className={location === "/tests" ? "" : "text-muted-foreground"}
              >
                Tests
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/dashboard"
                className={
                  location === "/dashboard" ? "" : "text-muted-foreground"
                }
              >
                Dashboard
              </Link>
            </DrawerClose>
            <hr className="bg-stone-200 dark:bg-stone-800" />
            <DrawerClose asChild>
              <Link
                href="/test/new"
                className={
                  location === "/test/new" ? "" : "text-muted-foreground"
                }
              >
                Start Test
              </Link>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
      <Link
        href={location.includes("appearing") ? "/" : "#"}
        className={`font-extrabold text-lg tracking-tight flex gap-2 items-center justify-center ${
          location.includes("appearing") ? "max-sm:w-full" : ""
        }`}
      >
        <Image src="/logo.svg" height="30" width="30" alt="Logo" />
        LastMinPrep
      </Link>
      <div
        className={`sm:flex hidden gap-5 items-center justify-between ${
          location.includes("/appearing") ? "sm:hidden" : ""
        }`}
      >
        <Link href="/tests" className="px-4 py-1.5 h-full">
          Tests
        </Link>
        <Link href="/dashboard" className="px-4 py-1.5 h-full">
          Dashboard
        </Link>
        {status === "authenticated" ? (
          <Button asChild>
            <Link href="/test/new">Start Test</Link>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Start Test</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Please login</DialogTitle>
                <DialogDescription>
                  First, you need to login to start a test.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => signIn()}>Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <AvatarDropdown />
      </div>
      <AvatarDropdown isMobile />
    </div>
  );
}

export default Navbar;
