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
import { userType } from "@/custom-components/isLiked";
import { use, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const [user, setUser] = useState<userType>();
  const getUserData = async () => {
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
  };
  useEffect(() => {
    getUserData();
  }, []);
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
          <button className="h-1/3 text-white w-2/4 bg-neutral-600 font-sans font-bold text-base rounded-lg">
            Edit profile
          </button>
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
        <div className="text-white flex gap-3 border border-gray-600 border-r-0 border-l-0 border-t-0 p-4 flex items-center">
          <svg
            aria-label="Camera"
            className="x1lliihq x1n2onr6 x5n08af w-1/3"
            fill="currentColor"
            height="62"
            role="img"
            viewBox="0 0 96 96"
            width="62"
          >
            <title>Camera</title>
            <circle
              cx="48"
              cy="48"
              fill="none"
              r="47"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></circle>
            <ellipse
              cx="48.002"
              cy="49.524"
              fill="none"
              rx="10.444"
              ry="10.476"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2.095"
            ></ellipse>
            <path
              d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          <div className="flex flex-col gap-1">
            <div className="font-bold font-sans text-lg">No post yet</div>
            <div className="text-neutral-400 font-sans text-sm">
              when {user?.username} posts, you'll see their photos and videos
              here.{" "}
            </div>
          </div>
        </div>
      ) : (
        <CardFooter className="p-0 flex flex-wrap justify-between">
          {user?.posts.map((post) => {
            return (
              <div key={post._id} className="p-0 w-[33%] mt-1">
                <img src={post.postImg} className="aspect-square" />
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
