export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
  };
}

export interface CharacterData {
  characters: {
    results: Character[];
  };
}

export interface CharacterExtended {
  character: SingleCharacter;
}

export interface SingleCharacter {
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
}

export interface RootState {
  querySlice: {
    allData: Character[];
    showData: Character[];
    welcome: Boolean;
  };
}

export interface CardProps {
  character: Character;
  reRender?: Boolean;
  setReRender?: React.Dispatch<React.SetStateAction<boolean>>;
}
