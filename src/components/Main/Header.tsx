import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-gradient-to-b from-black to-transparent">
      <div className="absolute top-8 left-3 flex flex-row justify-between z-50 gap-10 items-center">
        <Link href="/main">
          <Image
            src="/assets/landing/NetflixLogo.png"
            alt="로고"
            width={35}
            height={35}
            className="cursor-pointer hover:scale-125"
          />
        </Link>
        <Link href="/tv-shows" className="cursor-pointer hover:text-gray-400">TV Shows</Link>
        <Link href="/movies" className="cursor-pointer hover:text-gray-400">Movies</Link>
        <Link href="/my-list" className="cursor-pointer hover:text-gray-400">My List</Link>
      </div>
    </div>
  );
}
