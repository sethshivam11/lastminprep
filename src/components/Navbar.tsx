"use client";

import { useSession } from "next-auth/react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import Header from "./Header";

function Navbar() {
  const { status } = useSession();
  const location = usePathname();

  return location !== "/" ? (
    <div className="z-50 sticky top-0 w-full bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="flex justify-between items-center sm:px-10 px-2 py-2 max-w-7xl mx-auto">
        <Drawer>
          <DrawerTrigger
            className={`sm:hidden ${
              location.includes("/appearing") ? "hidden" : ""
            }
              ${status !== "authenticated" ? "hidden" : ""}`}
            asChild
          >
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DialogTitle className="sr-only">Menu</DialogTitle>
            <div className="flex flex-col text-lg space-y-3 p-4">
              <DrawerClose asChild>
                <Link
                  href="/tests"
                  className={
                    location === "/tests" ? "" : "text-muted-foreground"
                  }
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
          href={
            location.includes("/appearing")
              ? "#"
              : status === "authenticated"
              ? "/dashboard"
              : "/"
          }
          className={`font-extrabold text-lg tracking-tight flex gap-2 items-center justify-center ${
            location.includes("appearing") ? "max-sm:w-full" : ""
          }`}
        >
          <Image src="/logo.svg" height="30" width="30" alt="Logo" />
          LastMinPrep
        </Link>
        <div
          className={`flex gap-5 items-center justify-between ${
            location.includes("/appearing") ? "sm:hidden" : ""
          }`}
        >
          {status === "authenticated" ? (
            <>
              <Link href="/tests" className="px-4 py-1.5 h-full max-sm:hidden">
                Tests
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-1.5 h-full max-sm:hidden"
              >
                Dashboard
              </Link>
              {location === "/test/new" ? null : (
                <Button asChild>
                  <Link href="/test/new" className="max-sm:hidden">
                    Start Test
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild className="max-sm:hidden">
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
                  <DialogClose asChild>
                    <Button asChild>
                      <Link href="/auth/options">Login</Link>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <AvatarDropdown />
        </div>
      </div>
    </div>
  ) : (
    <Header />
  );
}

export default Navbar;
