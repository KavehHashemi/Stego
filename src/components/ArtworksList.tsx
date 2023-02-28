/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import "../styles/ArtworksList.css";

import { useEffect } from "react";

import { Artwork } from "../../types";
import SingleArtwork from "./SingleArtwork";

type props = {
  artworks: Artwork[];
};

const ArtworksList = ({ artworks }: props) => {
  // const { collection } = useAppSelector((state) => state.artworks);
  let artworkObjects: JSX.Element[] = [];

  artworks.map((a) => {
    artworkObjects.push(
      <SingleArtwork artwork={a} key={a.objectID}></SingleArtwork>
    );
  });

  useEffect(() => {
    console.log(artworks.length);
  }, [artworks]);

  return <div className="list">{artworkObjects}</div>;
};

export default ArtworksList;
