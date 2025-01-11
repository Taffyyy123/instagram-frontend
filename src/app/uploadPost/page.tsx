"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNav from "@/custom-components/BottomNav";
import { useState } from "react";

const Page = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const getCaptionValue = (e: { target: { value: string } }) => {
    setCaptionValue(e.target.value);
  };
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const uploadImages = async () => {
    if (!images) return;

    const uploadPromises = Array.from(images).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ace_area");
      formData.append("cloud_name", "dl93ggn7x");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
  };
  const handleSumbitPost = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      "https://instagram-backend-e3eq.onrender.com/post/createPost",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: captionValue,
          postImg: uploadedImages[0],
        }),
      }
    );
    if (!response) {
      setIsPosted(false);
    } else {
      setIsPosted(true);
    }
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-8 items-center">
      <div className="text-white font-sans font-bold text-2xl flex justify-center p-3">
        Create new post
      </div>
      <div className="flex flex-col justify-center items-center">
        <svg
          aria-label="Icon to represent media such as images or videos"
          className="x1lliihq x1n2onr6 x5n08af text-white"
          fill="currentColor"
          height="77"
          role="img"
          viewBox="0 0 97.6 77.3"
          width="96"
        >
          <title>Icon to represent media such as images or videos</title>
          <path
            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
            fill="currentColor"
          ></path>
          <path
            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
            fill="currentColor"
          ></path>
          <path
            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="text-white font-sans font-bold text-xl">
          Drag photos and videos here
        </div>
      </div>
      <div>
        <input
          type="file"
          className="text-neutral-600 w-3/4 "
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setImages(files);
            }
          }}
        />
        <Button
          className="1/4 bg-blue-600 font-sans font-bold"
          onClick={uploadImages}
        >
          Next
        </Button>
      </div>
      {isPosted ? (
        <div className="text-white font-sans font-bold text-2xl">
          Succesfully posted
        </div>
      ) : (
        <div className="text-center w-90%">
          {uploadedImages.map((img, index) => (
            <div className=" flex flex-col items-center gap-4" key={index}>
              <img src={img} className="aspect-auto rounded-lg shadow-lg" />
              <Input
                className="text-white aspect-auto"
                onChange={getCaptionValue}
              />
              <Button
                className="text-white bg-black font-sans"
                onClick={handleSumbitPost}
              >
                Share
              </Button>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};
export default Page;
