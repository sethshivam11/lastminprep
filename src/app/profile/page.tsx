import AvatarInput from "@/components/AvatarInput";
import ProfileForm from "@/components/ProfileForm";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">Profile</h1>
      <div className="flex justify-around gap-4">
        <div className="flex flex-col">
          <AvatarInput />
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default Page;
