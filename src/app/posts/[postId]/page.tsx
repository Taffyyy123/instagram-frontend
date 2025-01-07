"use client";
import { use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Smile } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { comment } from "postcss";

export type userType = {
  _id: string;
  proImg: string;
  username: string;
};
export type commentType = {
  comment: string;
  _id: string;
  userId: userType;
};

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [comments, setComments] = useState<commentType[]>([]);
  const { postId } = use(params);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: { target: { value: string } }) => {
    setInputValue(event.target.value);
  };
  const getComments = async () => {
    const jsonData = await fetch(
      `https://instagram-backend-e3eq.onrender.com/post/${postId}`
    );
    const response = await jsonData.json();
    setComments(response);
    console.log(response);
  };

  useEffect(() => {
    getComments();
  }, [postId]);
  const handleSubmitComment = () => {
    const token = localStorage.getItem("accessToken");
    fetch("https://instagram-backend-e3eq.onrender.com/comment/createComment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        comment: inputValue,
      }),
    });
    setInputValue("");
  };
  return (
    <div className="bg-black h-screen">
      <Link href="/posts" className="flex justify-end pt-3 pr-4">
        <X className="text-white" />
      </Link>
      <div className="h-5/6 overflow-scroll">
        {comments?.map((comment) => {
          return (
            <Card
              key={comment._id}
              className="bg-black w-fit  border-gray-700 border-r-0 border-l-0 border-t-0 rounded-none"
            >
              <CardHeader className="flex items-center space-x-3 pb-2">
                {comment.userId.proImg == null ? (
                  <Avatar>
                    <AvatarImage
                      src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      className="w-10 h-10 rounded-full"
                    />
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage
                      src={comment.userId.proImg}
                      className="w-10 h-10 rounded-full"
                    />
                  </Avatar>
                )}

                <div className="text-white text-lg font-sans font-bold">
                  {comment.userId.username}
                </div>
              </CardHeader>
              <CardContent className="text-white text-lg font-sans font-bold w-screen">
                {comment.comment}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-4 pt-4 pl-4">
        <Smile className="text-white" />
        <input
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Add a comment..."
          type="text"
          className="bg-black text-white outline-none w-3/4"
        />{" "}
        {inputValue.length == 0 ? null : (
          <button
            className="text-blue-600 font-bold bg-none w-1/4"
            onClick={handleSubmitComment}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};
export default Page;
