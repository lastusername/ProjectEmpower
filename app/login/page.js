"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserAuth } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import React from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = UserAuth();
  const { toast } = useToast();
  const emailSchema = z.string().email();
  const router = useRouter();
  const handleSubmit = async () => {
    if (!email || !password) {
      return toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "One or more of your fields are empty",
      });
    }

    try {
      emailSchema.parse(email);
    } catch (e) {
      return toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Your email is not of the right format",
      });
    }

    try {
      setLoading(true);
      await login(email, password).then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "You are successfully logged in",
        });
        setTimeout(() => {
          router.push("/profile");
        }, 500);
      });
    } catch (e) {
      if ((e.message = "Firebase: Error (auth/invalid-credential).")) {
        return toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "User was not found",
        });
      }
    }
  };
  return (
    <div className="w-screen h-screen p-5 flex items-center justify-center">
      <div className="w-1/3 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-2">Login</h1>
        <Input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2"
        />
        <Button
          onClick={handleSubmit}
          className="w-full mb-2 bg-blue-600"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Loading" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default page;
