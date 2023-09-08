import React from "react";
import Image from "next/image";

import logo from "../assets/Rick_and_Morty.png";
import { useRouter } from "next/router";

interface SearchBarComponentProps {
  name: string;
  setName: (name: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isInputError: boolean;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  name,
  setName,
  handleSubmit,
  isInputError,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-4 border-b border-gray-400 w-full bg-slate-900 sticky top-0">
      <Image src={logo} width={327.8} height={100} alt="title" />
      <form className="flex mt-4 gap-4 flex-wrap justify-center">
        <input
          type="text"
          placeholder="Write a name..."
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="text-xl p-1 rounded-lg h-9 text-center border border-black text-black"
        />
        <input
          type="submit"
          value="Search"
          onClick={handleSubmit}
          className="h-9 rounded-xl w-24 text-xl cursor-pointer bg-gray-500 text-white border border-black hover:shadow-md "
        />
        {router.pathname === "/favorites" ? null : (
          <button
            className="h-9 rounded-xl w-24 text-xl cursor-pointer bg-orange-600 text-white border border-black hover:shadow-md "
            onClick={(e) => {
              e.preventDefault();
              router.push("/favorites");
            }}
          >
            Favorites
          </button>
        )}
      </form>
      {isInputError ? (
        <span className="text-red-500 mt-2 text-center font-bold">
          **You must type at least 2 characters to do the search
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBarComponent;
