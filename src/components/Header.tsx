"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import AvatarDropdown from "./AvatarDropdown";
import { useSession } from "next-auth/react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link className="flex items-center justify-center gap-2 mr-4" href="#">
          <Image src="/logo.svg" alt="Logo" width="30" height="30" />
          <span className="font-extrabold tracking-tighter text-xl">
            LastMinPrep
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            className="transition-colors hover:text-foreground/80"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80"
            href="#technologies"
          >
            Technologies
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80"
            href="#analytics"
          >
            Analytics
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80"
            href="#faq"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          {status !== "authenticated" ? <ModeToggle /> : <AvatarDropdown />}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-3">
            <Link
              className="flex items-center py-2 text-foreground hover:text-foreground/80"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="flex items-center py-2 text-foreground hover:text-foreground/80"
              href="#technologies"
              onClick={() => setIsMenuOpen(false)}
            >
              Technologies
            </Link>
            <Link
              className="flex items-center py-2 text-foreground hover:text-foreground/80"
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="flex items-center py-2 text-foreground hover:text-foreground/80"
              href="#analytics"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              className="flex items-center py-2 text-foreground hover:text-foreground/80"
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
