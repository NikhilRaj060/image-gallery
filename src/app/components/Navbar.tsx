import Link from "next/link";

import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="bg-black sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center font-bold p-4 max-w-6xl mx-auto">
        <h1>
          <Link
            href="/"
            className="text-white text-2xl sm:text-3xl text-center whitespace-nowrap"
          >
            Next.Js Image Gallery
          </Link>
        </h1>
        <Search />
      </nav>
    </header>
  );
}
