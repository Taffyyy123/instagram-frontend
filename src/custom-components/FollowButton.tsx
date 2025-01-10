import { useEffect, useState } from "react";
import { userType } from "./isLiked";
import { jwtDecode } from "jwt-decode";
import CSS from "csstype";

type JwtPayLoad = {
  exp: number;
  iat: number;
  userId: string;
};

const followButtonStyles: CSS.Properties = {
  backgroundColor: "rgba(0, 149, 246)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
  color: "white",
  width: "75%",
  fontFamily: "sans-serif",
  fontWeight: "700",
  borderRadius: "7px",
};

const followingButtonStyles: CSS.Properties = {
  backgroundColor: "rgba(75, 85, 99)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
  color: "white",
  width: "75%",
  fontFamily: "sans-serif",
  fontWeight: "700",
  borderRadius: "7px",
};

const FollowButton = ({ userData }: { userData: userType | undefined }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [userId, setUserId] = useState("");

  const decodedToken = jwtDecode<JwtPayLoad>(
    localStorage.getItem("accessToken") ?? ""
  );

  const checkFollowed = () => {
    if (userData && userData.followers) {
      const isAlreadyFollowed = userData.followers.some(
        (follower) => follower._id === decodedToken.userId
      );
      setIsFollowed(isAlreadyFollowed);
    }
  };

  const handleFollowUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to follow users");
      return;
    }

    try {
      if (isFollowed) {
        await fetch(
          "https://instagram-backend-e3eq.onrender.com/user/unFollow",
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower: userData?._id,
            }),
          }
        );
        setIsFollowed(false);
      } else {
        await fetch(
          "https://instagram-backend-e3eq.onrender.com/user/followUsers",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower: userData?._id,
            }),
          }
        );
        setIsFollowed(true);
      }
    } catch (error) {
      console.error("Error during follow/unfollow:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    checkFollowed();
  }, [userData]);
  return (
    <div>
      {isFollowed ? (
        <div style={followingButtonStyles} onClick={handleFollowUser}>
          Following
        </div>
      ) : (
        <div style={followButtonStyles} onClick={handleFollowUser}>
          Follow
        </div>
      )}
    </div>
  );
};

export default FollowButton;
