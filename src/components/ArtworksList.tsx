/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import "../styles/ArtworksList.css";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { ResetCollection } from "../store/artworks";
import SingleArtwork from "./SingleArtwork";

// type props = {
//   artworks: Artwork[];
// };

const ArtworksList = () => {
  const { collection } = useAppSelector((state) => state.artworks);
  const { currentDepartment } = useAppSelector((state) => state.departments);
  let artworkObjects: JSX.Element[] = [];

  const dispatch = useAppDispatch();

  collection.map((a) => {
    artworkObjects.push(
      <SingleArtwork artwork={a} key={a.objectID}></SingleArtwork>
    );
  });

  useEffect(() => {
    // console.log(collection.length);
    dispatch(ResetCollection());
  }, [currentDepartment]);

  return <div className="list">{artworkObjects}</div>;
};

export default ArtworksList;
