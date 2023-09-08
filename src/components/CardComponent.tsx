import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
  };
}

interface CardProps {
  character: Character;
}

const CardComponent: React.FC<CardProps> = ({ character }) => {
  const iconColor = (character: Character) => {
    switch (character.status) {
      case "Alive":
        return "bg-green-500";
      case "unknown":
        return "bg-yellow-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "";
    }
  };

  const router = useRouter();

  return (
    <div className="flex w-96 h-56 bg-gray-700 p-4 flex-col rounded-2xl justify-between items-center">
      <div className="flex w-full">
        <div>
          <Image
            src={character.image}
            alt=""
            width={120}
            height={120}
            className=" rounded-xl"
          />
          <div>
            <span>Status:</span>
            <div className="flex gap-3 items-center">
              <div
                className={`w-4 h-4 rounded-full ${iconColor(character)}`}
              ></div>
              <span className="card-left-state-text">{character.status}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-between ml-1">
          <span className="font-bold text-2xl text-center">
            {character.name}
          </span>
          <div className="flex flex-col items-center">
            <span className="font-bold">Origin:</span>
            <span className="text-center">{character.origin.name}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Species:</span>
            <span className="text-center">{character.species}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <span
          className="bg-white text-slate-950 p-1 rounded-md w-28 flex justify-center align-middle cursor-pointer font-bold hover:bg-slate-400"
          onClick={() => router.push(`/${character.id}`)}
        >
          Details
        </span>
        <span
          className="bg-white text-slate-950 p-1 rounded-md w-28 flex justify-center align-middle cursor-pointer font-bold hover:bg-slate-400"
          onClick={() => router.push("/favorites")}
        >
          Add Favorite
        </span>
      </div>
    </div>
  );
};

export default CardComponent;
