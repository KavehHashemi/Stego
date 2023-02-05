/* eslint-disable array-callback-return */
import '../styles/ArtworksList.css';

import { Artwork } from '../../types';
import SingleArtwork from './SingleArtwork';

type props = {
  artworks: Artwork[];
};

const ArtworksList = ({ artworks }: props) => {
  let artworkObjects: JSX.Element[] = [];
  artworks.map((a) => {
    artworkObjects.push(
      <SingleArtwork artwork={a} key={a.objectID}></SingleArtwork>
    );
  });

  return <div className="list">{artworkObjects}</div>;
};

export default ArtworksList;
