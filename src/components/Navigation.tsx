import '../styles/Navigation.css';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useRef, useState } from 'react';

import { departmentsdb } from '../db/Artworks';
import DrawerComponent from './DrawerComponent';

type props = {
  setDepartmentId: React.Dispatch<React.SetStateAction<number>>;
  departmentId: number;
};
const Navigation = ({ departmentId, setDepartmentId }: props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string | undefined>("");

  useEffect(() => {
    (async () => {
      let x = await departmentsdb.departments
        .filter((dep) => dep.departmentId === departmentId)
        .toArray();
      setDepartmentName(x[0].displayName);
    })();
  }, [departmentId]);
  return (
    <>
      <AppBar
        sx={{ backgroundColor: "#000000cc", borderBottom: "1px solid #383838" }}
        // className="appbar"
        position="fixed"
      >
        <Toolbar className="toolbar">
          <div className="left">
            <IconButton
              onClick={() => setOpenDrawer(true)}
              size="large"
              edge="end"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className="center">{departmentName}</div>
          <div className="right"></div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="left"
      >
        <DrawerComponent
          setOpen={setOpenDrawer}
          setId={setDepartmentId}
          id={departmentId}
        ></DrawerComponent>
      </Drawer>
    </>
  );
};

export default Navigation;
