import '../styles/Dialog.css';

import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/OpenInNewRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Footer from '@mui/material/DialogActions';
import Content from '@mui/material/DialogContent';
import Header from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import { Artwork } from '../../types';

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  artwork: Artwork;
};

const DialogComponent = ({ open, setOpen, artwork }: props) => {
  if (!open) return null;
  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <Header className="dialog-header">
        {artwork.title}
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon sx={{ color: "#c5c5c5" }}></CloseIcon>
        </IconButton>
      </Header>
      <Content className="dialog-content">
        <a href={artwork.primaryImage} target="_blank" rel="noreferrer">
          <img src={artwork.primaryImageSmall} alt="" className="image"></img>
        </a>
      </Content>
      <Footer className="dialog-footer">
        <div className="footer-columns">
          <div className="footer-rows">
            <div>
              <div id="left">Name:</div>
              <div id="right">{artwork.title}</div>
            </div>
            <div>
              <div id="left">Date:</div>
              <div id="right">{artwork.objectDate}</div>
            </div>
            <div>
              <div id="left">Medium:</div>
              <div id="right">{artwork.medium}</div>
            </div>
            <div>
              <div id="left">Dimensions:</div>
              <div id="right">{artwork.dimensions}</div>
            </div>
            <div>
              <div id="left">Object Name:</div>
              <div id="right">{artwork.objectName}</div>
            </div>
            <div>
              <div id="left">Department:</div>
              <div id="right">{artwork.department}</div>
            </div>
          </div>
        </div>
        <div className="footer-columns">
          <div className="footer-rows">
            <div>
              <div id="left">Artist:</div>
              <div id="right">{artwork.artistDisplayName}</div>
            </div>
            <div>
              <div id="left">Nationality:</div>
              <div id="right">{artwork.artistNationality}</div>
            </div>
            <div>
              <div id="left">Birth-Death:</div>
              {artwork.artistBeginDate}-{artwork.artistEndDate}
            </div>
            <div>
              <div id="left">Bio:</div>
              <div id="right">{artwork.artistDisplayBio}</div>
            </div>
            <div></div>
            {/* <div>
              <div id="left">
              </div>
            </div> */}
          </div>
          <div>
            <Button
              href={artwork.artistWikidata_URL}
              target="_blank"
              rel="noreferrer"
              variant="text"
              title="Artist's WikiData"
              sx={{
                color: "#c5c5c5",
                fontSize: "12px",
                fontStretch: "expanded",
                padding: "0 1rem 0 0",
              }}
            >
              <div style={{ marginRight: "6px" }}>Artist's WikiData</div>
              <LinkIcon sx={{ color: "#00ccff", fontSize: "1rem" }}></LinkIcon>
            </Button>
            <Button
              href={artwork.objectWikidata_URL}
              target="_blank"
              rel="noreferrer"
              variant="text"
              title="Artwork's WikiData"
              sx={{
                color: "#c5c5c5",
                fontSize: "12px",
                fontStretch: "expanded",
                padding: "0 1rem 0 0",
              }}
            >
              <div style={{ marginRight: "6px" }}>Artworks's WikiData</div>
              <LinkIcon sx={{ color: "#00ccff", fontSize: "1rem" }}></LinkIcon>
            </Button>
          </div>
        </div>
      </Footer>
    </Dialog>
  );
};

export default DialogComponent;
