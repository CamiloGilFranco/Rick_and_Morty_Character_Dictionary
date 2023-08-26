import React from "react";
import Image from "next/image";
import dance from "../assets/rick-and.gif";

const LoaderComponent: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center relative  h-96">
      <Image src={dance} alt="" className="absolute w-96" />
    </div>
  );
};

export default LoaderComponent;
