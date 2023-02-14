/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/SearchComponent.css';

import CloseIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useRef } from 'react';

type props = {
  setSearchParam: React.Dispatch<React.SetStateAction<string | undefined>>;
  resultsCount: number | undefined;
};
const SearchComponent = ({ setSearchParam, resultsCount }: props) => {
  const searchParamRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resultsCount === undefined) clearSearch();
  }, [resultsCount]);

  const submitSearch = () => {
    if (searchParamRef.current?.value)
      setSearchParam(searchParamRef.current.value);
  };

  const clearSearch = () => {
    if (searchParamRef.current?.value) searchParamRef.current.value = "";
    setSearchParam(searchParamRef.current?.value);
  };

  return (
    <div className="search-container">
      <IconButton onClick={() => clearSearch()} style={{ cursor: "pointer" }}>
        <CloseIcon sx={{ color: "#c5c5c5" }}></CloseIcon>
      </IconButton>
      <input
        className="search"
        title="search"
        placeholder="search"
        ref={searchParamRef}
      ></input>
      <IconButton onClick={() => submitSearch()} style={{ cursor: "pointer" }}>
        <SearchIcon sx={{ color: "#c5c5c5" }}></SearchIcon>
      </IconButton>
      {resultsCount !== undefined ? (
        <div>{`${resultsCount} results found`}</div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
