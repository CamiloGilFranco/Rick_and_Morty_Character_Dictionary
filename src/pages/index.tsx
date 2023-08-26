import React, { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
/* ${inter.className} */

export default function Home() {
  const [name, setName] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {};

  return (
    <div className="text-white h-full w-full flex flex-col items-center justify-center">
      <SearchBar
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isInputError={isInputError}
      />
    </div>
  );
}
