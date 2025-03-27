import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="border-t border-muted p-4">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="LastMinPrep" width="40" height="40" />
            <h3 className="text-lg tracking-tighter font-extrabold">
              LastMinPrep
            </h3>
          </Link>
          <div className="text-muted-foreground text-sm">
            Your AI-powered interview prep companion – tailored questions, anytime, anywhere! 🚀
          </div>
          <div className="text-muted-foreground/50 text-xs" suppressHydrationWarning>
            &copy;{new Date().getFullYear()} LastMinPrep. All rights reserved.
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center text-muted-foreground text-sm">
          <div>👨‍💻Built by: <Link href="https://linkedin.com/in/sethshivam11" className="text-blue-500 font-semibold">Shivam</Link></div>
          <div>📂GitHub: <Link href="https://github.com/sethshivam11/lastminprep" className="text-blue-500 font-semibold">LastMinPrep</Link></div>
          <div>🔗Connect with me: <Link href="https://github.com/sethshivam11" className="text-blue-500 font-semibold">GitHub</Link> | <Link href="https://x.com/sethshivam11" className="text-blue-500 font-semibold">X</Link> | <Link href="https://linkedin.com/in/sethshivam11" className="text-blue-500 font-semibold">LinkedIn</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
