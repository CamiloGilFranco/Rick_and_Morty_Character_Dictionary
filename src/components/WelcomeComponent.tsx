import React from "react";
import Image from "next/image";

import welcome from "../assets/welcome.png";
import { Gluten } from "next/font/google";

const gluten = Gluten({ subsets: ["latin"] });

const WelcomeComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <Image src={welcome} alt="" width={330} />
      <h2 className={`text-5xl font-bold mt-8 ${gluten.className}`}>Welcome</h2>
      <p className="text-center w-96">
        This is a dictionary of characters from the animated series Rick and
        Morty, you must write a word in the search engine and all the characters
        whose names match your search will be displayed.
      </p>
    </div>
  );
};

export default WelcomeComponent;
