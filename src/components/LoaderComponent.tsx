import React from "react";
import Image from "next/image";
import dance from "../assets/rick-and.gif";

const LoaderComponent: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-238px)] flex items-center justify-center relative sm:h-[calc(100vh-185px)]">
      <div className="w-full h-full bg-black bg-opacity-10"></div>
      <Image src={dance} alt="" className="absolute w-96" />
    </div>
  );
};

export default LoaderComponent;
