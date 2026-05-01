import { Plus, Play, Info } from "lucide-react";

export default function MainBar() {
  return (
    <div className="flex flex-row justify-between px-10 mb-20">
      <div className="flex flex-col items-center justify-center">
        <Plus />
        My List
      </div>
      <div className="flex flex-row items-center bg-gray-300 text-black text-xl font-bold px-4 gap-2 rounded-md hover:bg-white cursor-pointer">
        <Play fill="#000000" stroke="none" />
        Play
      </div>
      <div className="flex flex-col items-center justify-center">
        <Info />
        Info
      </div>
    </div>
  );
}
