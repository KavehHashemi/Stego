/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/styles.scss";

import { useEffect, useState } from "react";

import { status } from "../utils/consts";
import { useAppSelector } from "../utils/hooks";
import { Artwork } from "../utils/types";
import { getCollections } from "../utils/utils";

const Artworks = () => {
  const {
    artworks,
    total,
    status: state,
  } = useAppSelector((state) => state.artworks);
  const [index, setIndex] = useState<number>(0);
  const [aa, setAa] = useState<JSX.Element[]>([]);
  useEffect(() => {
    kaveh();
  }, [state, index]);

  let artworksArray: JSX.Element[] = [];

  const kaveh = async () => {
    const collection: Artwork[] = await getCollections(artworks, index);
    collection.map((artwork, i) => {
      artworksArray = [
        ...artworksArray,
        <div key={i} className="artwork-card">
          <div>{artwork.title}</div>
          <img src={artwork.primaryImageSmall}></img>
          <div>{artwork.artistDisplayName}</div>
        </div>,
      ];
    });
    setAa(artworksArray);
  };

  if (state === status.loading) {
    return <>Loading</>;
  } else if (state === status.error) {
    return <>{state.toString()}</>;
  } else {
    return (
      <div className="artworks-container">
        <div className="header">
          <div>{total}</div>
          <div
            onClick={() => setIndex(index + 1)}
            style={{ cursor: "pointer" }}
          >
            next
          </div>
        </div>
        <div className="cards-container">{aa}</div>
      </div>
    );
  }
};

export default Artworks;
