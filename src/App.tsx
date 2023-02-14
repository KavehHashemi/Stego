/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';

import { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import MainContainer from './components/MainContainer';
import Navigation from './components/Navigation';
import SearchComponent from './components/SearchComponent';
import { storeArtworkIDs, storeDepartments, storeSearchedIDs } from './utils';

const App = () => {
  const [index, setIndex] = useState<number>();
  const [dbNumber, setDbNumber] = useState<number>(1);
  const [departmentId, setDepartmentId] = useState<number>(11);

  const [searchParam, setSearchParam] = useState<string | undefined>("");
  const [resultsCount, setResultsCount] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      await storeDepartments();
    })();
  }, []);

  useEffect(() => {
    console.log(`departmentID is ${departmentId}`);
    (async () => {
      let dbnumber = await storeArtworkIDs(departmentId);
      setDbNumber(dbnumber);
      setSearchParam(undefined);
      setResultsCount(undefined);
      setIndex(0);
    })();
  }, [departmentId]);

  useEffect(() => {
    (async () => {
      if (searchParam !== "" && searchParam !== undefined) {
        console.log(`searching for ${searchParam}`);
        let x = await storeSearchedIDs(searchParam, departmentId);
        setDbNumber(x[0]);
        setResultsCount(x[1]);
        setIndex(0);
      } else if (searchParam === "") {
        let dbnumber = await storeArtworkIDs(departmentId);
        setDbNumber(dbnumber);
        setResultsCount(undefined);
        setIndex(0);
      }
    })();
  }, [searchParam]);

  if (index === undefined) return null;
  return (
    <div>
      <Navigation
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
      ></Navigation>
      <SearchComponent
        setSearchParam={setSearchParam}
        resultsCount={resultsCount}
      ></SearchComponent>
      <MainContainer idx={index} dbNumber={dbNumber}></MainContainer>
      <BottomScrollListener onBottom={() => setIndex(index + 1)} />
    </div>
  );
};

export default App;
