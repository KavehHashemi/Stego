/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/MainContainer.css';

import { useEffect, useState } from 'react';

import { Artwork } from '../../types';
import { getCollection, getDBSize } from '../utils';
import ArtworksList from './ArtworksList';

type props = {
  idx: number;
};

const MainContainer = ({ idx }: props) => {
  const [collection, setCollection] = useState<Artwork[]>([]);
  const [DBCount, setDBCount] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      let a = await getCollection(idx);
      setCollection(collection.concat(a));
    })();
  }, [idx]);

  useEffect(() => {
    (async () => {
      setDBCount(await getDBSize());
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
