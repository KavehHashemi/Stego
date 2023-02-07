import '../styles/Dialog.css';

import CloseIcon from '@mui/icons-material/Close';
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
    <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>{artwork.artistDisplayName}</div>
          <div>{artwork.artistNationality}</div>
        </div>
        <div></div>
      </Footer>
    </Dialog>
  );
};

export default DialogComponent;
