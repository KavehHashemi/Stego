import "../styles/SingleArtwork.css";

import { useState } from "react";

import { Artwork } from "../../types";
import DialogComponent from "./DialogComponent";

type props = {
  artwork: Artwork;
};

const SingleArtwork = ({ artwork }: props) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="card"
        onClick={() => {
          console.log(artwork);
          setOpenDialog(true);
        }}
      >
        <div className="header">
          <div>{artwork.title}</div>
        </div>
        <div className="content">
          {artwork.primaryImageSmall !== "" ? (
            <img
              src={artwork.primaryImageSmall}
              alt={artwork.title}
              width={"100%"}
            ></img>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                backgroundImage: "url('./noimage.png')",
                width: "50px",
                height: "200px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          )}
        </div>
        <div className="footer">
          <div>{artwork.artistDisplayName}</div>
          <div>{artwork.department}</div>
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
};

export default SingleArtwork;
