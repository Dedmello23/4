import Link from "next/link";
import { FlowerArtwork } from "@/components/FlowerArtwork";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper-ivory text-chocolate flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 mb-6 opacity-75">
        <FlowerArtwork width={128} height={128} />
      </div>
      <h1 className="font-serif text-5xl sm:text-6xl text-wine-muted font-bold mb-3">
        404
      </h1>
      <h2 className="font-serif italic text-2xl sm:text-3xl text-chocolate mb-4">
        You wandered off the romantic path.
      </h2>
      <p className="font-sans text-base text-chocolate-muted max-w-md mb-8">
        This page doesn&apos;t exist, but our fourth anniversary invitation definitely does.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full bg-rose-dusty hover:bg-wine-muted text-paper-ivory font-serif text-lg tracking-wider shadow-romantic transition-all"
      >
        BACK TO OUR INVITATION ♡
      </Link>
    </div>
  );
}
