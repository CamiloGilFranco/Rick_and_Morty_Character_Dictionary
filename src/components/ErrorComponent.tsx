import React from "react";
import face from "../assets/face.png";
import Image from "next/image";

import { Gluten } from "next/font/google";

const gluten = Gluten({ subsets: ["latin"] });

const ErrorComponent: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center mt-10">
      <Image src={face} alt="" className="w-1/2 max-w-[300px]" />
      <h2 className={`mt-20 text-center text-4xl ${gluten.className}`}>
        Something went wrong, try again later
      </h2>
    </div>
  );
};

export default ErrorComponent;
