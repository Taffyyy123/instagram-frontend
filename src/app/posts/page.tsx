"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { PostHeader } from "@/custom-components/PostHeader";
import { PostContent } from "@/custom-components/PostContent";
import { PostFooter } from "@/custom-components/PostFooter";
import BottomNav from "@/custom-components/BottomNav";

type likeTypes = {
  proImg: string;
  username: string;
  _id: string;
  email: string;
};

export type userType = {
  _id: string;
  proImg: string;
  username: string;
};

export type commentType = {
  comment: string;
  _id: string;
  userId: userType;
  postId: postType;
};

export type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userType;
  likes: likeTypes[];
  comments: commentType[];
}[];

const Page = () => {
  const [posts, setPosts] = useState<postType>([]);
  const getPosts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
    }
    const jsonData = await fetch(
      "https://instagram-backend-e3eq.onrender.com/post/getPosts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await jsonData.json();
    setPosts(response);
    console.log(response);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-fit bg-black border-gray-700 border-r-0 border-l-0 rounded-none flex flex-col relative pb-8">
      <div className="text-white w-full flex justify-center text-3xl p-4">
        Instagram
      </div>
      <div className=" bg-black ">
        {posts?.map((post) => {
          return (
            <Card
              key={post._id}
              className="w-fit bg-black border-gray-700 border-r-0 border-l-0 rounded-none"
            >
              <PostHeader
                proImage={post.userId.proImg}
                username={post.userId.username}
                userId={post.userId._id}
              />
              <PostContent postImage={post.postImg} />
              <PostFooter
                likedUsers={post.likes}
                postId={post._id}
                postComments={post.comments}
                postCaption={post.caption}
                username={post.userId.username}
              />
            </Card>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
};

export default Page;
