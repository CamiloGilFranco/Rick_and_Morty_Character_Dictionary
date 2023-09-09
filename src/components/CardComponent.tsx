import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { Character, CardProps } from "@/types/types";

const CardComponent: React.FC<CardProps> = ({
  character,
  reRender,
  setReRender,
}) => {
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

  const handlerNewFavorite = () => {
    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([character]));
      toast.success(
        "The character was added to your favorites list successfully"
      );
      return;
    }

    const savedDataString = localStorage.getItem("favorites");

    if (savedDataString !== null) {
      const savedData = JSON.parse(savedDataString) as Character[];

      const existingFavorite = savedData.some(
        (element) => element.id === character.id
      );

      if (existingFavorite) {
        toast.error("This character is already on your favorites list");
      } else {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...savedData, character])
        );
        toast.success(
          "The character was added to your favorites list successfully"
        );
      }
    }
  };

  const handlerDeleteFavorite = () => {
    const dataString = localStorage.getItem("favorites");

    if (dataString !== null) {
      const data = JSON.parse(dataString) as Character[];

      const index = data.findIndex((e) => e.id === character.id);

      data.splice(index, 1);

      localStorage.setItem("favorites", JSON.stringify(data));

      toast.success("the character was removed from your favorites list");

      if (setReRender && reRender !== undefined) {
        setReRender(!reRender ?? false);
      }
    }
  };

  return (
    <div className="flex w-96 h-56 bg-gray-700 p-4 flex-col rounded-2xl justify-between items-center text-white">
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
        {router.pathname === "/" ? (
          <span
            className="bg-white text-slate-950 p-1 rounded-md w-28 flex justify-center align-middle cursor-pointer font-bold hover:bg-slate-400"
            onClick={() => router.push(`/${character.id}`)}
          >
            Details
          </span>
        ) : null}
        {router.pathname === "/" ? (
          <span
            className="bg-white text-slate-950 p-1 rounded-md w-28 flex justify-center align-middle cursor-pointer font-bold hover:bg-slate-400"
            onClick={handlerNewFavorite}
          >
            Add Favorite
          </span>
        ) : null}
        {router.pathname === "/favorites" ? (
          <span
            className="bg-white text-slate-950 p-1 rounded-md w-28 flex justify-center align-middle cursor-pointer font-bold hover:bg-slate-400"
            onClick={handlerDeleteFavorite}
          >
            Delete
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default CardComponent;
