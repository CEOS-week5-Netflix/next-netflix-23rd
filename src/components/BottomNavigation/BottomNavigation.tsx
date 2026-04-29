import Image from "next/image";

const navigationItems = [
  { label: "Home", icon: "/icons/ic_home.svg", active: true },
  { label: "Search", icon: "/icons/ic_search.svg" },
  { label: "Coming Soon", icon: "/icons/ic_media.svg" },
  { label: "Downloads", icon: "/icons/ic_download.svg" },
  { label: "More", icon: "/icons/ic_hamburger.svg" },
];

export default function BottomNavigation() {
  return (
    <nav
      className="w-[375px] flex-[0_0_87.703px] bg-black"
      aria-label="Bottom navigation"
    >
      <div className="flex h-14 w-[375px] items-center justify-center bg-grey-900">
        <div className="flex h-[52.5px] w-[375px] shrink-0 items-center justify-center gap-4 px-5">
          {navigationItems.map((item) => (
            <button
              className={`flex h-10 w-[60px] shrink-0 flex-col items-center justify-center gap-2 bg-transparent p-0 ${
                item.active ? "text-white" : "text-grey-700"
              }`}
              type="button"
              key={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <Image
                className={`aspect-square h-[18px] w-[18px] object-contain ${
                  item.active ? "brightness-0 invert" : ""
                }`}
                src={item.icon}
                width={18}
                height={18}
                alt=""
              />
              <span className="w-full overflow-hidden text-center font-[Pretendard] text-[10px] leading-[135%] font-medium tracking-[-0.2px] text-ellipsis whitespace-nowrap [font-feature-settings:'liga'_off,'clig'_off]">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="relative h-[31.703px] w-[375px] bg-black"
        aria-hidden="true"
      >
        <div className="absolute top-[19.022px] left-[126.812px] h-[4.529px] w-[121.377px] rounded-[90.58px] bg-white" />
      </div>
    </nav>
  );
}
