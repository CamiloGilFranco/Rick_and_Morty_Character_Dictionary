import React from "react";
import logo from "../assets/Rick_and_Morty.png";
import Image from "next/image";

interface SearchBarProps {
  name: string;
  setName: (name: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isInputError: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  name,
  setName,
  handleSubmit,
  isInputError,
}) => {
  return (
    <div className="flex flex-col items-center p-4 border-b border-gray-400 w-full bg-slate-900 sticky top-0">
      <Image src={logo} width={327.8} height={100} alt="title" />
      <form className="flex mt-4 gap-4 flex-wrap justify-center">
        <input
          type="text"
          placeholder="Write a name..."
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="text-xl p-1 rounded-lg h-9 text-center border border-black"
        />
        <input
          type="submit"
          value="Search"
          onClick={handleSubmit}
          className="h-9 rounded-xl w-24 text-xl cursor-pointer bg-gray-500 text-white border border-black hover:shadow-md"
        />
      </form>
      {isInputError ? (
        <span className="text-red-500 mt-10 text-center">
          **You must type at least 2 characters to do the search
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
