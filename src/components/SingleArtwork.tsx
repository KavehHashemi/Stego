import '../styles/SingleArtwork.css';

import { useState } from 'react';

import { Artwork } from '../../types';
import DialogComponent from './DialogComponent';

type props = {
  artwork: Artwork;
};

const SingleArtwork = ({ artwork }: props) => {
  const [openDialog, setOpenDialog] = useState(false);
  if (artwork?.primaryImageSmall !== "")
    return (
      <>
        <div className="card" onClick={() => setOpenDialog(true)}>
          <div className="header">
            <div>{artwork.title}</div>
            {/* <div>{artwork.objectDate}</div> */}
          </div>
          <div className="content">
            <img src={artwork.primaryImageSmall} alt="" width={"100%"}></img>
          </div>
          <div className="footer">
            <div>{artwork.artistDisplayName}</div>
          </div>
        </div>
        {openDialog ? (
          <DialogComponent
            open={openDialog}
            setOpen={setOpenDialog}
            artwork={artwork}
          ></DialogComponent>
        ) : (
          <></>
        )}
      </>
    );
  return null;
};

export default SingleArtwork;
