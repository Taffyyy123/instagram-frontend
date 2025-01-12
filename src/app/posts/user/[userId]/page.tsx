"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BottomNav from "@/custom-components/BottomNav";
import FollowButton from "@/custom-components/FollowButton";
import { userType } from "@/custom-components/isLiked";
import Image from "next/image";
import { use, useCallback, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const [user, setUser] = useState<userType>();
  const getUserData = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const jsonData = await fetch(
      `https://instagram-backend-e3eq.onrender.com/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await jsonData.json();
    console.log(response);
    setUser(response);
  }, [userId]);
  useEffect(() => {
    getUserData();
  }, [getUserData]);
  const postCount = user?.posts.length;
  return (
    <Card className="w-screen h-screen bg-black border-none rounded-none relative">
      <CardHeader className="flex justify-center pt-5 pb-0 gap-5">
        <div className="w-1/3  h-[100px] flex justify-center items-center">
          {user?.proImg == null ? (
            <Avatar className="w-3/4 h-3/4">
              <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" />
            </Avatar>
          ) : (
            <Avatar className="w-[77px] h-[77px]">
              <AvatarImage src={user.proImg} />
            </Avatar>
          )}
        </div>
        <div className="w-2/3 flex flex-col justify-center space-y-3">
          <div className="h-1/3 font-extrabold text-xl flex justify-start items-center text-white">
            {user?.username}
          </div>
          <FollowButton userData={user} />
        </div>
      </CardHeader>
      <CardDescription className="w-screen flex flex-col items-center pt-5 ">
        <div className="text-white font-sans font-bold w-5/6 ">
          {user?.fullname}
        </div>
        <div className="text-gray-400 w-5/6 font-sans font-medium ">
          {user?.bio}
        </div>
      </CardDescription>
      <CardContent className="flex w-screen border border-gray-500 border-r-0 border-l-0 justify-center pt-3 pb-3 mt-5">
        <div className="text-gray-400 w-1/3 flex flex-col items-center">
          <p className="text-white font-bold">{user?.posts.length}</p> posts
        </div>
        <div className="text-gray-400 w-1/3 flex flex-col items-center">
          <p className="text-white font-bold">{user?.followers.length}</p>{" "}
          followers
        </div>
        <div className="text-gray-400 w-1/3 flex flex-col items-center">
          <p className="text-white font-bold">{user?.following.length}</p>{" "}
          following
        </div>
      </CardContent>
      {postCount == 0 ? (
        <div>No post yet</div>
      ) : (
        <CardFooter className="p-0 flex flex-wrap justify-between">
          {user?.posts.map((post) => {
            return (
              <div key={post._id} className="p-0 w-[33%] mt-1">
                <Image
                  src={post.postImg}
                  className="aspect-square"
                  alt={"Description"}
                  width={500}
                  height={500}
                />
              </div>
            );
          })}
        </CardFooter>
      )}
      <div className="w-screen fixed bottom-0 left-0 bg-black">
        <BottomNav />
      </div>
    </Card>
  );
};
export default Page;
