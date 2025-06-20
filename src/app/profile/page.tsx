import ProfileForm from "@/components/ProfileForm";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold md:text-center">Profile</h1>
      <ProfileForm />
    </div>
  );
}

export default Page;
