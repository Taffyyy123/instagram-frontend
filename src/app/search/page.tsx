import { Input } from "@/components/ui/input";
import BottomNav from "@/custom-components/BottomNav";

const Page = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center">
      <div className="text-white font-sans font-bold flex justify-center text-2xl p-3">
        Search
      </div>
      <Input
        placeholder="Search"
        className="font-sans font-bold text-lg bg-neutral-800 w-11/12 text-white "
      />
      <BottomNav />
    </div>
  );
};
export default Page;
