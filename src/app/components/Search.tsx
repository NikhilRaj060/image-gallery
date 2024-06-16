"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

import React from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) router.push(`/results/${search}`);
    setSearch("");
  };

  return (
    <form
      className="flex justify-center md:justify-between"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target?.value)}
        className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black"
      />
      <button>
        <FiSearch />
      </button>
    </form>
  );
}
