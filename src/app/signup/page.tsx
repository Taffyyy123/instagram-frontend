"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const getEmailValue = (e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
  };
  const getUsernameValue = (e: { target: { value: string } }) => {
    setUsernameValue(e.target.value);
  };
  const getPasswordValue = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };
  const checkSignup = () => {
    if (
      emailValue.length &&
      usernameValue.length &&
      passwordValue.length === 0
    ) {
      setPasswordError(true);
      setEmailError(true);
      setUsernameError(true);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black space-y-10">
      <div className="italic text-white font-serif text-5xl">Instagram</div>
      <div className="flex justify-center w-screen text-wrap">
        <div className=" flex items-center  text-gray-400 font-mono font-bold text-xl w-3/4 text-wrap">
          Sign up to see photos and videos from your friend.
        </div>
      </div>
      <div className="w-screen flex flex-col justify-center items-center space-y-2">
        <Input
          placeholder="Email"
          className="w-3/4 bg-zinc-900 text-gray-50 "
          onChange={getEmailValue}
          value={emailValue}
        />
        {emailError == true && (
          <div className="text-red-600">Hooson bj bolku</div>
        )}
        <Input
          onChange={getUsernameValue}
          value={usernameValue}
          placeholder="Username"
          className="w-3/4 bg-zinc-900 text-gray-50 "
        />
        {usernameError == true && (
          <div className="text-red-600">Hooson bj bolku</div>
        )}
        <Input
          onChange={getPasswordValue}
          value={passwordValue}
          placeholder="Password"
          className="w-3/4 bg-zinc-900 text-gray-50 "
        />
        {passwordError == true && (
          <div className="text-red-600">Hooson bj bolku</div>
        )}
        <Button
          className="w-3/4 bg-blue-500 font-mono text-base"
          onClick={checkSignup}
        >
          Sign up
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="text-white">Have an account?</div>
        <button className="text-blue-600">Log in</button>
      </div>
    </div>
  );
};
export default Page;
