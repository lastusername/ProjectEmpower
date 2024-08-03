"use client"

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAuth } from "@/context/UserContext";

const page = () => {
  const { user } = UserAuth();
  return (
    <div>{user?.email}</div>
  );
};

export default page;
