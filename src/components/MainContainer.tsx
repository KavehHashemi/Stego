/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/MainContainer.css';

import { useEffect, useState } from 'react';

import { Artwork } from '../../types';
import { getCollection, getDBSize } from '../utils';
import ArtworksList from './ArtworksList';

type props = {
  idx: number;
  dbNumber: number;
};

const MainContainer = ({ idx, dbNumber }: props) => {
  const [collection, setCollection] = useState<Artwork[]>([]);
  const [DBCount, setDBCount] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      let a = await getCollection(idx, dbNumber);
      setCollection(collection.concat(a));
    })();
  }, [idx]);

  useEffect(() => {
    (async () => {
      setDBCount(await getDBSize(dbNumber));
    })();
  }, []);

  return (
    <>
      <div className="container">
        <ArtworksList artworks={collection}></ArtworksList>
      </div>
      {idx * 6 >= DBCount ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "red",
          }}
        >
          End
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "green",
          }}
        >
          Scroll to view more
        </div>
      )}
    </>
  );
};

export default MainContainer;
