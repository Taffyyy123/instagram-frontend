"use client";
import { Input } from "@/components/ui/input";
import BottomNav from "@/custom-components/BottomNav";
import { userType } from "@/custom-components/isLiked";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const getUsers = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const jsonData = await fetch(
      "https://instagram-backend-e3eq.onrender.com/user/getAllUser",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await jsonData.json();
    setUsers(response);
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center">
      <div className="text-white font-sans font-bold flex justify-center text-2xl p-3">
        Search
      </div>
      <Input
        placeholder="Search"
        className="font-sans font-bold text-lg bg-neutral-800 w-11/12 text-white "
      />
      <BottomNav />
    </div>
  );
};
export default Page;
