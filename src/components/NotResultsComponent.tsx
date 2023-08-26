import React from "react";
import Image from "next/image";
import cry from "../assets/rick.png";

const NotResultsComponent: React.FC = () => {
  return (
    <div className="h-[calc(100vh-185px)] flex flex-col items-center justify-around">
      <Image src={cry} alt="" className="w-[40vw] max-w-[250px] mt-3" />
      <h2 className="mt-5 text-center text-4xl">
        Oops!! There are no results for this search
      </h2>
    </div>
  );
};

export default NotResultsComponent;
