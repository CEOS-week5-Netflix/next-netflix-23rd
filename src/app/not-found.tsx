import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-4">
        <h1 className="text-3xl font-bold">Lost your way?</h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          Sorry, we can&apos;t find that page.
          <br />
          You&apos;ll find lots to explore on the home page.
        </p>
        <Link
          href="/main"
          className="mt-2 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          Netflix Home
        </Link>
        <p className="mt-6 text-xs text-gray-400">
          <span className="text-red-600">|</span> Error Code{" "}
          <span className="font-semibold">NSES-404</span>
        </p>
      </div>
    </div>
  );
}
