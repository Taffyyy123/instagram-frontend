import { userType } from "@/app/posts/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";

export const PostHeader = ({
  proImage,
  username,
  userId,
}: {
  proImage: string;
  username: string;
  userId: string;
}) => {
  return (
    <CardHeader className="flex items-center gap-4">
      {proImage == null ? (
        <Avatar>
          <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" />
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage src={proImage} />
        </Avatar>
      )}
      <Link
        className="text-white text-lg font-sans font-bold"
        href={`/posts/user/${userId}`}
      >
        {username}
      </Link>
    </CardHeader>
  );
};
