import React, { useState, useEffect } from "react";

import SearchBarComponent from "@/components/SearchBarComponent";
import WelcomeComponent from "@/components/WelcomeComponent";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
/* ${inter.className} */

export default function Home() {
  const [name, setName] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [welcome, setWelcome] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent) => {};

  return (
    <div className="text-white h-full w-full flex flex-col items-center justify-center">
      <SearchBarComponent
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isInputError={isInputError}
      />
      {welcome ? <WelcomeComponent /> : null}
    </div>
  );
}
