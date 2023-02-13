import '../styles/SearchComponent.css';

import SearchIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

import { storeSearchedIDs } from '../utils';

type props = {
  departmentId: number;
  setDbNumber: React.Dispatch<React.SetStateAction<number>>;
};
const SearchComponent = ({ departmentId, setDbNumber }: props) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const Search = async () => {
    if (searchParam !== "") {
      console.log(`searching for ${searchParam}`);
      let x = await storeSearchedIDs(searchParam, departmentId);
      setDbNumber(x);
    }
  };
  return (
    <div className="search-container">
      <input
        className="search"
        title="search"
        placeholder="search"
        value={searchParam}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchParam(event.target.value);
        }}
      ></input>
      <IconButton onClick={() => Search()} style={{ cursor: "pointer" }}>
        <SearchIcon sx={{ color: "#c5c5c5" }}></SearchIcon>
      </IconButton>
    </div>
  );
};

export default SearchComponent;
