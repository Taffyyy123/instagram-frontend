"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const getUsernameValue = (e: { target: { value: string } }) => {
    setUsernameValue(e.target.value);
  };
  const getPasswordValue = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };

  const checkUsername = () => {
    if (usernameValue.length == 0) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const checkPassword = () => {};

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black space-y-20">
      <div className=" italic text-white font-serif text-5xl">Instagram</div>
      <div className="w-screen flex flex-col justify-center items-center space-y-2">
        <Input
          className="w-3/4 bg-zinc-900 text-gray-50 "
          placeholder="Username"
          type="Email"
          value={usernameValue}
          onChange={getUsernameValue}
        />
        {usernameError == true && (
          <div className="text-red-600">Hooson bj bolku</div>
        )}
        <Input
          className="w-3/4 bg-zinc-900 text-gray-50"
          placeholder="Password"
          type="Password"
          value={passwordValue}
          onChange={getPasswordValue}
        />{" "}
        <Button className="w-3/4 bg-blue-700" onClick={checkUsername}>
          Log in
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="text-white"> Don't have an account?</div>
        <Link href="../signup/page.tsx" className="text-blue-600">
          Sign up
        </Link>
      </div>
    </div>
  );
};
export default Page;
