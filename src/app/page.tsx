"use client";

import { useEffect } from "react";

const Home = () => {
  const isLogged = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = "/posts";
    } else {
      window.location.href = "/signup";
    }
  };
  useEffect(() => {
    isLogged();
  }, []);
  return (
    <div className=" bg-black w-screen h-screen tect-white text-[21px] text-center text-white items-center">
      Wait a sec..
    </div>
  );
};
export default Home;
