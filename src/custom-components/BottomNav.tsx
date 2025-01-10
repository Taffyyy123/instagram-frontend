"use client";

import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Home, Search, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type JwtPayload = {
  exp: number;
  iat: number;
  userId: string;
};

const BottomNav = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  return (
    <div className="w-screen fixed bottom-0 left-0 bg-black">
      <Link className="w-1/3 bg-black" href={"/posts"}>
        <Button className="w-1/3 bg-black text-xl">
          <Home />
        </Button>
      </Link>
      <Link className="w-1/3 bg-black" href={"/search"}>
        <Button className="w-1/3 bg-black">
          <Search />
        </Button>
      </Link>
      {userId && (
        <Link className="w-1/3 bg-black" href={`/posts/profile/${userId}`}>
          <Button className="w-1/3 bg-black text-xl">
            <CircleUserRound />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default BottomNav;
