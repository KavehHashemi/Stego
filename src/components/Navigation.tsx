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

// import SearchIcon from '@mui/icons-material/SearchRounded';
type props = {
  setDepartmentId: React.Dispatch<React.SetStateAction<number>>;
  departmentId: number;
};
const Navigation = ({ departmentId, setDepartmentId }: props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>("");
  // const [searchParam, setSearchParam] = useState<string>("");
  // const Search = () => {
  //   console.log(`search for ${searchParam}`);
  // };

  // const CssTextField = styled(TextField)({
  //   "& label.Mui-focused": {
  //     color: "#c5c5c5",
  //   },
  //   "& MuiInputLabel-root": {
  //     color: "#00ccff",
  //   },
  //   "& label.Mui": {
  //     color: "#00ccff",
  //   },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "#00ccff",
  //   },
  // });

  useEffect(() => {
    (async () => {
      let x = await departmentsdb.departments
        .filter((dep) => dep.departmentId === departmentId)
        .toArray();
      console.log(`x[0].departmentId is ${x[0].departmentId}`);
      console.log(`departmentId is ${departmentId}`);
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
          {/* <div className="center">{departmentName}</div> */}
          <div className="right">
            {/* <CssTextField
              className="myTextField"
              variant="standard"
              label="Search"
              id="search-input"
            /> */}
            {/* <input
              className="search"
              title="search"
              placeholder="search"
              value={searchParam}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchParam(event.target.value);
              }}
            ></input>
            <SearchIcon
              style={{ cursor: "pointer" }}
              onClick={() => Search()}
            ></SearchIcon> */}
            {/* {searchParam !== "" ? <SearchIcon></SearchIcon> : null} */}
            {/* <TextField
              label="Search"
              variant="standard"
              fullWidth
              sx={{ color: "#c5c5c5", border: "1px solid #c5c5c5" }}
              value={searchParam}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchParam(event.target.value);
              }}
            /> */}
            {/* <FormControl
              color="info"
              fullWidth
              sx={{ m: 1 }}
              variant="standard"
            >
              <InputLabel color="info" htmlFor="standard-adornment-amount">
                Search
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment
                    position="start"
                    color="info"
                  ></InputAdornment>
                }
              />
            </FormControl> */}
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
