import React from "react";
import Image from "next/image";

import welcome from "../assets/welcome.png";

const WelcomeComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <Image src={welcome} alt="" width={330} />
      <h2 className="text-5xl font-bold mt-8">Welcome</h2>
    </div>
  );
};

export default WelcomeComponent;
