import EditProfile from "@/components/EditProfile";
import GithubIcon from "@/components/icons/Github";
import LinkedinIcon from "@/components/icons/Linkedin";
import XIcon from "@/components/icons/X";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Country } from "country-state-city";
import { LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Page() {
  const user = {
    avatar:
      "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1741416419/lastminprep/qnzy9jiix6hyfrr4cddx.png",
    fullName: "John Doe",
    birthday: new Date(),
    location: "IN, UP, Lucknow",
    gender: "male",
    social: {
      website: "https://example.com",
      x: "https://x.com/example",
      linkedin: "https://linkedin.com/in/example",
      github: "https://github.com/example",
    },
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  };

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2">
        <Card className="flex flex-col items-center justify-center p-4 border-input rounded-lg">
          <CardHeader className="pt-0">
            <Image
              src={user.avatar}
              alt={user.fullName + "'s image"}
              width="200"
              height="200"
              className="w-full"
              draggable={false}
            />
            <CardTitle className="lg:text-4xl sm:text-3xl text-2xl tracking-tight font-bold">
              {user.fullName}
            </CardTitle>
            <p className="text-muted-foreground">
              {user.gender === "male"
                ? "he/him"
                : user.gender === "female"
                ? "she/her"
                : "they/them"}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{user.bio}</p>
            <p className="text-muted-foreground flex items-center gap-1 mt-2">
              <MapPin size="16" />
              {Country.getCountryByCode(user.location.split(",")[0])?.name}
            </p>
            <Link
              href={user.social.website}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <LinkIcon size="16" />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.website}
              </span>
            </Link>
            <Link
              href={user.social.github}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <GithubIcon />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.github.split("github.com")[1]}
              </span>
            </Link>
            <Link
              href={user.social.x}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <XIcon />
              <span className="hover:text-blue-500 hover:underline">
                @{user.social.x.split("x.com/")[1]}
              </span>
            </Link>
            <Link
              href={user.social.linkedin}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <LinkedinIcon />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.linkedin.split("linkedin.com")[1]}
              </span>
            </Link>
          </CardContent>
          <CardFooter className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 flex-wrap">
                {user.skills.map((skill, index) => (
                  <Link
                    href={"https://google.com/search?q=" + skill}
                    target="_blank"
                    key={index}
                  >
                    <Badge>{skill}</Badge>
                  </Link>
                ))}
              </div>
              <EditProfile />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
