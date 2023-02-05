import '../styles/SingleArtwork.css';

import React from 'react';

import { Artwork } from '../../types';

type props = {
  artwork: Artwork;
};

const SingleArtwork = ({ artwork }: props) => {
  if (artwork?.primaryImageSmall !== "")
    return (
      <div className="card">
        <div className="header">
          <div>{artwork.title}</div>
        </div>
        <div className="content">
          <img src={artwork.primaryImageSmall} alt="" width={"100%"}></img>
        </div>
        <div className="footer">
          <div>{artwork.artistDisplayName}</div>
          <div>{artwork.objectID}</div>
        </div>
      </div>
    );
  return null;
};

export default SingleArtwork;
