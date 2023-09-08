import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyAllData,
  modifyShowData,
  modifyWelcome,
} from "@/store/slices/querySlice";

import SearchBarComponent from "@/components/SearchBarComponent";
import WelcomeComponent from "@/components/WelcomeComponent";
import NotResultsComponent from "@/components/NotResultsComponent";
import LoaderComponent from "@/components/LoaderComponent";
import ErrorComponent from "@/components/ErrorComponent";
import CardComponent from "@/components/CardComponent";
import next from "../assets/next.svg";
import prev from "../assets/prev.svg";
import { useRouter } from "../../node_modules/next/router";

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

export default function Home(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);
  /* const [welcome, setWelcome] = useState<boolean>(true); */
  const [queryLoading, setQueryLoading] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<boolean>(false);
  /* const [allData, setAllData] = useState<Character[]>([]); */
  /* const [showData, setShowData] = useState<Character[]>([]); */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [serverPage, setServerPage] = useState<number>(1);
  const [getDataFinished, setGetDataFinished] = useState(false);
  const [empty, setEmpty] = useState(false);

  const pageSize = 6;
  const serverResultSize = 20;

  const dispatch = useDispatch();
  const allData = useSelector((state: RootState) => state.querySlice.allData);
  const showData = useSelector((state: RootState) => state.querySlice.showData);
  const welcome = useSelector((state: RootState) => state.querySlice.welcome);

  const router = useRouter();

  useEffect(() => {
    renderData();
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, [serverPage]);

  useEffect(() => {
    if (!welcome) {
      getData();
    }
  }, [welcome]);

  useEffect(() => {
    if (getDataFinished) {
      renderData();
    }
  }, [getDataFinished]);

  useEffect(() => {
    if (!allData.length) {
      getData();
    }
  }, [allData]);

  const { refetch } = useQuery<CharacterData>(GET_CHARACTERS_BY_NAME, {
    skip: true,
  });

  const getData = async () => {
    if (welcome) {
      return;
    }

    setGetDataFinished(false);

    try {
      setQueryLoading(true);
      const { data } = await refetch({
        name,
        page: serverPage,
      });

      if (data?.characters?.results.length === 0) {
        setEmpty(true);
        setQueryLoading(false);
        return;
      }

      setQueryLoading(false);
      dispatch(modifyAllData([...allData, ...data?.characters?.results]));
      /* setAllData([...allData, ...data?.characters?.results]); */
      setGetDataFinished(true);
    } catch (error) {
      setQueryError(true);
      setQueryLoading(false);
    }
  };

  const renderData = async () => {
    if (welcome) {
      return;
    }

    dispatch(modifyShowData([]));
    /* setShowData([]); */

    const firstIndex = pageSize * currentPage - pageSize;
    const lastIndex = currentPage * pageSize;

    if (lastIndex > serverResultSize * serverPage) {
      setServerPage(serverPage + 1);
      return;
    }

    const charactersToShow = allData.slice(firstIndex, lastIndex);
    dispatch(modifyShowData(charactersToShow));
    /* setShowData(charactersToShow); */
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name.length < 2) {
      setIsInputError(true);
      return;
    } else {
      setIsInputError(false);
    }

    dispatch(modifyAllData([]));
    /* setAllData([]); */
    dispatch(modifyShowData([]));
    /* setShowData([]); */
    setCurrentPage(1);
    setServerPage(1);
    setQueryError(false);

    if (!welcome && !allData.length) {
      getData();
    }

    dispatch(modifyWelcome(false));
    /* setWelcome(false); */
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="text-white h-full  ">
      <SearchBarComponent
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        isInputError={isInputError}
      />
      {showData.length ? (
        <div className="h-full w-full flex justify-center flex-col items-center">
          <div className="w-11/12 max-w-[1200px] flex flex-wrap items-center justify-center gap-4 py-5 ">
            {showData.map((character) => {
              return <CardComponent character={character} key={character.id} />;
            })}
          </div>
          <div className="flex gap-5 mb5">
            <div>
              {currentPage > 1 ? (
                <Image
                  src={prev}
                  alt=""
                  className="px-1 bg-lime-300 rounded-3xl w-20 h-10 cursor-pointer"
                  onClick={handlePrevious}
                />
              ) : null}
            </div>
            <div>
              {showData.length === 6 ? (
                <Image
                  src={next}
                  alt=""
                  className="px-1 bg-lime-300 rounded-3xl w-20 h-10 cursor-pointer"
                  onClick={handleNext}
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {welcome ? <WelcomeComponent /> : null}
      {!welcome &&
      !showData.length &&
      !queryLoading &&
      !queryError &&
      currentPage === 1 &&
      serverPage === 1 &&
      empty ? (
        <NotResultsComponent />
      ) : null}
      {queryLoading ? <LoaderComponent /> : null}
      {queryError ? <ErrorComponent /> : null}
    </div>
  );
}
