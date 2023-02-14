import '../styles/Navigation.css';

import UpIcon from '@mui/icons-material/ArrowUpward';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';

import { departmentsdb } from '../db/Artworks';
import DrawerComponent from './DrawerComponent';

type props = {
  setDepartmentId: React.Dispatch<React.SetStateAction<number>>;
  departmentId: number;
};
const Navigation = ({ departmentId, setDepartmentId }: props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>("");

  useEffect(() => {
    (async () => {
      let x = await departmentsdb.departments
        .filter((dep) => dep.departmentId === departmentId)
        .toArray();
      // console.log(`x[0].departmentId is ${x[0].departmentId}`);
      // console.log(`departmentId is ${departmentId}`);
      if (x) setDepartmentName(x[0].displayName);
    })();
  }, [departmentId]);
  return (
    <div>
      <AppBar className="appbar" position="fixed">
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
            <div className="center">{departmentName}</div>
          </div>
          <div className="right">
            <a href="#top">
              <IconButton size="large" edge="end" color="inherit">
                <UpIcon></UpIcon>
              </IconButton>
            </a>
          </div>
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
    </div>
  );
};

export default Navigation;
