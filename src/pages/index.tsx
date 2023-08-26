import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

import SearchBarComponent from "@/components/SearchBarComponent";
import WelcomeComponent from "@/components/WelcomeComponent";
import NotResultsComponent from "@/components/NotResultsComponent";
import LoaderComponent from "@/components/LoaderComponent";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
/* ${inter.className} */

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

interface CharacterData {
  characters: {
    results: Character[];
  };
}

const GET_CHARACTERS_BY_NAME = gql`
  query GetCharacterByName($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      results {
        id
        name
        status
        species
        image
        origin {
          name
        }
      }
    }
  }
`;

export default function Home() {
  const [name, setName] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [welcome, setWelcome] = useState<boolean>(true);
  const [queryLoading, setQueryLoading] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<boolean>(false);
  const [allData, setAllData] = useState<Character[]>([]);
  const [showData, setShowData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [serverPage, setServerPage] = useState<number>(1);
  const [getDataFinished, setGetDataFinished] = useState(false);

  const { refetch } = useQuery<CharacterData>(GET_CHARACTERS_BY_NAME, {
    skip: true,
  });

  const getData = async () => {
    if (welcome) {
      return;
    }
    console.log("en getData");

    setGetDataFinished(false);

    try {
      setQueryLoading(true);
      const { data } = await refetch({
        name,
        page: serverPage,
      });

      setAllData([...allData, ...data?.characters?.results]);
      setQueryLoading(false);
      setGetDataFinished(true);
    } catch (error) {
      setQueryError(true);
      setQueryLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name.length < 2) {
      setIsInputError(true);
      return;
    } else {
      setIsInputError(false);
    }

    setAllData([]);
    setShowData([]);
    setCurrentPage(1);
    setServerPage(1);
    if (!welcome) {
      console.log("oli");

      getData();
    }
    setWelcome(false);
  };

  return (
    <div className="text-white h-full w-full flex flex-col items-center justify-center">
      <SearchBarComponent
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isInputError={isInputError}
      />
      {/* {welcome ? <WelcomeComponent /> : null} */}
      {/* {!welcome &&
      !showData.length &&
      !queryLoading &&
      !queryError &&
      currentPage === 1 &&
      serverPage === 1 ? (
        <NotResultsComponent />
      ) : null} */}
      {queryLoading ? <LoaderComponent /> : null}
    </div>
  );
}
