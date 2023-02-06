import './App.css';

import { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import MainContainer from './components/MainContainer';
import Navigation from './components/Navigation';
import { storeArtworkIDs, storeDepartments } from './utils';

const App = () => {
  const [index, setIndex] = useState<number>();
  const [dbNumber, setDbNumber] = useState<number>(1);
  const [departmentId, setDepartmentId] = useState<number>(11);

  useEffect(() => {
    (async () => {
      await storeDepartments();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let dbnumber = await storeArtworkIDs(departmentId);
      setDbNumber(dbnumber);
      setIndex(0);
    })();
  }, [departmentId]);

  if (index === undefined) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        gap: "1rem",
      }}
    >
      <Navigation
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
      ></Navigation>
      <MainContainer idx={index} dbNumber={dbNumber}></MainContainer>
      <BottomScrollListener onBottom={() => setIndex(index + 1)} />
    </div>
  );
};

export default App;
