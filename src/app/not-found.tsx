import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-zinc-400 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#0033CC] hover:bg-[#002299] text-white font-medium rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
