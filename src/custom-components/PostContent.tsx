import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const PostContent = ({ postImage }: { postImage: string }) => {
  return (
    <CardContent className="flex justify-center ">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            {" "}
            <img src={postImage} className="w-screen" />
          </CarouselItem>
          <CarouselItem>
            {" "}
            <img src={postImage} className="w-screen" />
          </CarouselItem>
          <CarouselItem>
            {" "}
            <div>
              <img src={postImage} className="w-screen" />\
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </CardContent>
  );
};
