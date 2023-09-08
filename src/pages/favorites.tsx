import SearchBarComponent from "@/components/SearchBarComponent";
import React, { useEffect, useState } from "react";
import CardComponent from "@/components/CardComponent";

const favorites = () => {
  const [savedData, setSavedData] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setSavedData(JSON.parse(localStorage.getItem("favorites")));
  }, [reRender]);

  return (
    <div>
      <h1 className="m-6 text-center text-white text-5xl font-bold">
        Favorites List
      </h1>
      {savedData?.length ? (
        <div className="h-full w-full flex justify-center flex-col items-center">
          <div className="w-11/12 max-w-[1200px] flex flex-wrap items-center justify-center gap-4 py-5 ">
            {savedData.map((character) => {
              return (
                <CardComponent
                  character={character}
                  key={character.id}
                  reRender={reRender}
                  setReRender={setReRender}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default favorites;
