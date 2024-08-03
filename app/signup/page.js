"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserAuth } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { push, ref, set, get } from "firebase/database";
import { database } from "@/firebase";

export default function Page() {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser, user } = UserAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!first || !last || !email || !password || !confirmPassword) {
      return toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "One or more of your fields are empty",
      });
    } else if (password !== confirmPassword) {
      return toast({
        variant: "destructive",
        title: "Passwords Don't Match",
        description: "Your passwords do not match",
      });
    } else {
      setLoading(true);
      await createUser(email, password).then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "You are successfully logged in",
        });
        setTimeout(() => {
          router.push("/profile");
        }, 500);
        const userRef = ref(database, "user");
        const newDataRef = push(userRef);
        set(newDataRef, {
          email: email,
          name: first + " " + last,
        });
      });
    }
  };

  return (
    <div className="w-screen h-screen p-5 flex items-center justify-center">
      <div className="w-1/3 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-2">Sign up</h1>
        <div className="flex w-full">
          <Input
            type="text"
            value={first}
            placeholder="First Name"
            onChange={(e) => setFirst(e.target.value)}
            className="mb-2 mr-2"
          />
          <Input
            type="text"
            value={last}
            placeholder="Last Name"
            onChange={(e) => setLast(e.target.value)}
            className="mb-2"
          />
        </div>
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
        <Input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
}
