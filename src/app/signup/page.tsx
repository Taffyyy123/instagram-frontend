"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [fullNameValue, setFullNameValue] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const getEmailValue = (e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
  };
  const getFullNameValue = (e: { target: { value: string } }) => {
    setFullNameValue(e.target.value);
  };
  const getUsernameValue = (e: { target: { value: string } }) => {
    setUsernameValue(e.target.value);
  };
  const getPasswordValue = (e: { target: { value: string } }) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailValue.length === 0) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (usernameValue.length === 0) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (passwordValue.length === 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (fullNameValue.length === 0) {
      setFullNameError(true);
    } else {
      setFullNameError(false);
    }
    fetch("https://instagram-backend-e3eq.onrender.com/user/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
        fullname: fullNameValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmailValue("");
        setPasswordValue("");
        setUsernameValue("");
        setFullNameValue("");
        const access = data.token;
        localStorage.setItem("accessToken", access);
        if (access) {
          window.location.href = "/posts";
        }
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black space-y-10">
      <div className="italic text-white font-serif text-5xl">Instagram</div>
      <div className="flex justify-center w-screen text-wrap items-center">
        <div className=" flex items-center  text-gray-400 font-mono font-bold text-md w-3/4 text-center">
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
          placeholder="Fullname"
          className="w-3/4 bg-zinc-900 text-gray-50 "
          onChange={getFullNameValue}
          value={fullNameValue}
        />
        {fullNameError == true && (
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
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="text-white">Have an account?</div>
        <Link className="text-blue-600" href={"/login"}>
          Log in
        </Link>
      </div>
    </div>
  );
};
export default Page;
