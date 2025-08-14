import Link from "next/link";
import {
  Home,
  BarChart3,
  User,
  Heart,
  ListTodo,
  TrendingUp,
  Mail,
} from "lucide-react";
import Github from "./icons/Github";
import Linkedin from "./icons/Linkedin";
import XIcon from "./icons/X";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Footer = () => {
  const navigationLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tests", href: "/tests", icon: ListTodo },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Limits", href: "/usage", icon: TrendingUp },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/sethshivam11", icon: Github },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/sethshivam11",
      icon: Linkedin,
    },
    {
      name: "X",
      href: "https://x.com/sethshivam11",
      icon: XIcon,
    },
    {
      name: "Mail",
      href: "mailto:legendshivam11@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-muted mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="LastMinPrep Logo"
                width="40"
                height="40"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">LastMinPrep</h3>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Interview Prep
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Generate AI-powered interview questions tailored to your needs.
              Practice coding challenges and multiple choice questions with
              intelligent feedback.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Navigation</h4>
            <div className="space-y-2">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-muted-foreground/80 transition-colors text-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-gray-100"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <Icon />
                      </a>
                    </Button>
                  );
                })}
              </div>
              <Link
                href="https://www.buymeacoffee.com/sethshivam11"
                target="_blank"
              >
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me a Coffee"
                  width="165"
                  height="40"
                />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="bg-muted-foreground/30" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-sm text-muted-foreground/50">
          <p>© {new Date().getFullYear()} LastMinPrep. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1">
            Made with
            <Heart className="text-red-500" size="16" />
            by
            <Link
              href="https://devshivam.tech"
              target="_blank"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Shivam
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
