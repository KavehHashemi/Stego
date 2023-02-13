/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/MainContainer.css';

import Up from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

import { Artwork } from '../../types';
import { getCollection, getDBSize } from '../utils';
import ArtworksList from './ArtworksList';

// import SearchIcon from '@mui/icons-material/SearchRounded';
type props = {
  idx: number;
  dbNumber: number;
  // departmentId: number;
};

const MainContainer = ({ idx, dbNumber }: props) => {
  const [collection, setCollection] = useState<Artwork[]>([]);
  const [DBCount, setDBCount] = useState<number>(-1);

  // const [searchParam, setSearchParam] = useState<string>("");
  // const Search = async () => {
  //   if (searchParam !== "") {
  //     console.log(`searching for ${searchParam}`);
  //     let x = await storeSearchedIDs(searchParam, departmentId);
  //     let a = await getCollection(idx, x);
  //     setCollection(a);
  //   }
  // };

  useEffect(() => {
    (async () => {
      setDBCount(await getDBSize(dbNumber));
    })();
  }, []);

  useEffect(() => {
    console.log(`index is ${idx}`);
    (async () => {
      let a = await getCollection(idx, dbNumber);
      setCollection(collection.concat(a));
    })();
  }, [idx]);

  useEffect(() => {
    setCollection([]);
    (async () => {
      let a = await getCollection(idx, dbNumber);
      setCollection(a);
    })();
  }, [dbNumber]);

  useEffect(() => {
    collection.map((c) => {
      // console.log(`item: ${c.primaryImageSmall}`);
    });
  }, [collection]);

  return (
    <div className="">
      {/* <div className="search-container">
        <input
          className="search"
          title="search"
          placeholder="search"
          value={searchParam}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchParam(event.target.value);
          }}
        ></input>
        <SearchIcon
          sx={{ color: "#c5c5c5" }}
          style={{ cursor: "pointer" }}
          onClick={() => Search()}
        ></SearchIcon>
      </div> */}
      <div className="container">
        <ArtworksList artworks={collection}></ArtworksList>
      </div>
      {idx * 6 >= DBCount && idx !== 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="#top">
            <IconButton>
              <Up sx={{ color: "#c5c5c5" }}></Up>
            </IconButton>
          </a>
        </div>
      ) : (
        <div>
          <LinearProgress
            sx={{ height: "2px", backgroundColor: "#000" }}
          ></LinearProgress>
        </div>
      )}
    </div>
  );
};

export default MainContainer;
