"use client";
import { postType } from "@/app/posts/page";
import { jwtDecode } from "jwt-decode";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
type JwtPayload = {
  exp: number;
  iat: number;
  userId: string;
};
export type userType = {
  _id: string;
  proImg: string;
  username: string;
  posts: postType;
  bio: string;
  fullname: string;
  followers: userType[];
  following: userType[];
};
type likeTypes = {
  proImg: string;
  username: string;
  _id: string;
  email: string;
};
const IsLiked = ({
  token,
  likedUsers,
  postId,
}: {
  token: string;
  likedUsers: likeTypes[];
  postId: string;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const decodedToken: JwtPayload = jwtDecode(token);
  const userId = decodedToken.userId;
  const checkLiked = () => {
    likedUsers.map((likedUser) => {
      if (likedUser._id == userId) {
        setIsLiked(true);
      }
    });
  };
  useEffect(() => {
    checkLiked();
  }, []);
  const handleSubmitLike = (postId: string) => {
    if (isLiked) {
      setIsLiked(false);
      const token = localStorage.getItem("accessToken");
      fetch("https://instagram-backend-e3eq.onrender.com/like/disLike", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });
    } else {
      setIsLiked(true);
      const token = localStorage.getItem("accessToken");
      fetch("https://instagram-backend-e3eq.onrender.com/like/likedPost", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });
    }
  };
  const getPostsLiked = async () => {
    await fetch("https://instagram-backend-e3eq.onrender.com/post/getPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    getPostsLiked();
  }, [isLiked]);

  return (
    <div>
      {isLiked ? (
        <button onClick={() => handleSubmitLike(postId)}>
          <Heart fill="red" className="text-red-600" />
        </button>
      ) : (
        <button onClick={() => handleSubmitLike(postId)}>
          <Heart fill="black" className="text-white" />
        </button>
      )}
    </div>
  );
};

export default IsLiked;
