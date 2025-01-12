import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export const PostContent = ({ postImage }: { postImage: string }) => {
  return (
    <CardContent className="flex justify-center ">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            {" "}
            <Image src={postImage} alt="Description" width={500} height={500} />
          </CarouselItem>
          {/* <CarouselItem>
            {" "}
            <img src={postImage} className="w-screen" />
          </CarouselItem>
          <CarouselItem>
            {" "}
            <div>
              <img src={postImage} className="w-screen" />\
            </div>
          </CarouselItem> */}
        </CarouselContent>
      </Carousel>
    </CardContent>
  );
};
