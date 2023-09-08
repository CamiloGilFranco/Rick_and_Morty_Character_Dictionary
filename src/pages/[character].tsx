import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import LoaderComponent from "@/components/LoaderComponent";

interface Character {
  character: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    image: string;
  };
}

const characterData = gql`
  query GetCharacterByID($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

const character = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery<Character>(characterData, {
    variables: { id: router.query.character },
  });

  const iconColor = (character: Character) => {
    switch (data.character.status) {
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

  return (
    <div
      className="flex flex-col items-center justify-center text-slate-200  gap-6"
      style={{ height: "calc(100vh - 30px" }}
    >
      {loading ? <LoaderComponent /> : null}
      {data && (
        <div className="border-white flex justify-between items-center w-11/12 max-w-5xl border-4 p-5 rounded-3xl max-sm:flex-col gap-5">
          <Image
            src={data.character.image}
            width={350}
            height={350}
            alt=""
            className="rounded-3xl"
          />
          <div
            className="flex items-center flex-col justify-between flex-grow max-sm:w-full "
            style={{ minHeight: 350 }}
          >
            <span className="font-bold text-4xl text-white text-center">
              {data.character.name}
            </span>
            <div className="flex justify-between w-full border-white border-b-2 gap-3">
              <span className="text-xl font-bold">
                Species: {data.character.species}
              </span>
              <span className="text-xl font-bold">
                Type: {data.character.type}
              </span>
            </div>
            <span className="text-xl font-bold">
              Gender: {data.character.gender}
            </span>

            <div className="flex justify-between w-full border-white border-b-2 gap-3">
              <span className="text-xl font-bold">
                Origin: {data.character.origin.name}
              </span>
              <span className="text-xl font-bold">
                Location: {data.character.location.name}
              </span>
            </div>
            <span className="text-xl font-bold flex gap-1 items-center">
              Status: {data.character.status}
              <div
                className={`w-4 h-4 rounded-full ${iconColor(data.character)}`}
              ></div>
            </span>
          </div>
        </div>
      )}
      <button
        className="px-1 bg-lime-300 rounded-3xl w-20 h-10 cursor-pointer text-black"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default character;
