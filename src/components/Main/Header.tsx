import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row justify-between p-6 mt-3 items-center">
      <Image
        src="/assets/landing/NetflixLogo.png"
        alt="로고"
        width={35}
        height={35}
        className="cursor-pointer hover:scale-125"
      />
      <div className="cursor-pointer hover:text-gray-400">TV Shows</div>
      <div className="cursor-pointer  hover:text-gray-400">Movies</div>
      <div className="cursor-pointer  hover:text-gray-400">My List</div>
    </div>
  );
}
