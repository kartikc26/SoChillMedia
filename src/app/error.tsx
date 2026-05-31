"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <h1 className="text-4xl font-black mb-4">Something went wrong</h1>
      <p className="text-zinc-400 mb-8">An unexpected error occurred.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#0033CC] hover:bg-[#002299] text-white font-medium rounded-full transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
