import { Button } from "@/components/ui/button";
import { Home, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <Image
            src="/logo.svg"
            alt="LastMinPrep"
            className="h-16 w-auto mx-auto mb-4 select-none"
            width="64"
            height="64"
            draggable={false}
          />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Button className="w-full">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2"
          >
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
