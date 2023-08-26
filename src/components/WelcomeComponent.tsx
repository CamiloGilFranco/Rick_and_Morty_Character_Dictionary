import React from "react";
import Image from "next/image";

import welcome from "../assets/welcome.png";

const WelcomeComponent: React.FC = () => {
  return (
    <div className="h-[calc(100vh-185px)] flex flex-col items-center justify-around ">
      <Image src={welcome} alt="" width={330} />
      <h2 className="text-5xl font-bold">Welcome</h2>
    </div>
  );
};

export default WelcomeComponent;
