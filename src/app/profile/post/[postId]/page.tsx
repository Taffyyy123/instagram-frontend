"use client";
import { commentType } from "@/app/posts/[postId]/page";
import { use, useEffect, useState } from "react";

type userType = {
  _id: string;
  proImg: string;
  username: string;
  posts: postType;
  bio: string;
  fullname: string;
  followers: userType[];
  following: userType[];
};
type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userType;
  likes: userType[];
  comments: commentType;
}[];
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const postId = use(params);
  const [post, setPost] = useState<postType>();
  const getOnePost = async () => {
    const token = localStorage.getItem("accessToken");
    const jsonData = await fetch(
      `https://instagram-backend-e3eq.onrender.com/post/getOnePost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await jsonData.json();
    console.log(response);
    setPost(response);
  };
  useEffect(() => {
    getOnePost();
  }, []);
  return (
    <div>
      <div></div>
    </div>
  );
};
export default Page;
