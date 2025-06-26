import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LinkIcon, MapPin } from "lucide-react";
import { ProfileI } from "@/models/profile.model";
import { Country, State } from "country-state-city";
import Link from "next/link";
import EditProfile from "@/components/EditProfile";
import GithubIcon from "@/components/icons/Github";
import LinkedinIcon from "@/components/icons/Linkedin";
import XIcon from "@/components/icons/X";

function ProfileCard({
  profile,
}: {
  profile: ProfileI & { user: { fullName: string; avatar: string } };
}) {
  return (
    <Card className="flex flex-col items-center p-4 border-input rounded-lg sm:top-16 sm:sticky h-fit">
      <CardHeader className="w-full">
        <Image
          src={profile.user.avatar}
          alt={profile.user.fullName + "'s image"}
          width="200"
          height="200"
          className="w-full select-none rounded-full"
          draggable={false}
        />
        <CardTitle className="xl:text-4xl sm:text-3xl text-2xl tracking-tight font-bold">
          {profile.user.fullName}
        </CardTitle>
        <p className="text-muted-foreground">
          {profile.gender === "male"
            ? "he/him"
            : profile.gender === "female"
            ? "she/her"
            : profile.gender === "others"
            ? "they/them"
            : ""}
        </p>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-muted-foreground">{profile.bio}</p>
        <p className="text-muted-foreground flex items-center gap-1 mt-2">
          <MapPin size="16" />
          {
            State.getStateByCodeAndCountry(
              profile.location.split(",")[1],
              profile.location.split(",")[0]
            )?.name
          }
          ,&nbsp;
          {Country.getCountryByCode(profile.location.split(",")[0])?.name}
        </p>
        {profile.social?.website && (
          <Link
            href={profile.social?.website}
            className="text-muted-foreground flex items-center gap-1 mt-2"
          >
            <LinkIcon size="16" />
            <span className="hover:text-blue-500 hover:underline">
              {profile.social?.website}
            </span>
          </Link>
        )}
        {profile.social?.github && (
          <Link
            href={profile.social?.github}
            className="text-muted-foreground flex items-center gap-1 mt-2"
          >
            <GithubIcon />
            <span className="hover:text-blue-500 hover:underline">
              {profile.social?.github.split("github.com")[1]}
            </span>
          </Link>
        )}
        {profile.social?.x && (
          <Link
            href={profile.social?.x}
            className="text-muted-foreground flex items-center gap-1 mt-2"
          >
            <XIcon />
            <span className="hover:text-blue-500 hover:underline">
              @{profile.social?.x.split("x.com/")[1]}
            </span>
          </Link>
        )}
        {profile.social?.linkedin && (
          <Link
            href={profile.social?.linkedin}
            className="text-muted-foreground flex items-center gap-1 mt-2"
          >
            <LinkedinIcon />
            <span className="hover:text-blue-500 hover:underline">
              {profile.social?.linkedin.split("linkedin.com")[1]}
            </span>
          </Link>
        )}
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 flex-wrap">
            {profile.skills.map((skill, index) => (
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
  );
}

export default ProfileCard;
