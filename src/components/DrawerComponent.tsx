/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import '../styles/Navigation.css';

import GithubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';

import { Department } from '../../types';
import { departmentsdb } from '../db/Artworks';

type CheckedDepartments = {
  [id: number]: boolean;
};

type props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  id: number;
};

const DrawerComponent = ({ setOpen, setId, id }: props) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [checkboxes, setCheckboxes] = useState<JSX.Element[]>([]);
  const [checked, setChecked] = useState<CheckedDepartments>({});
  let objects: JSX.Element[] = [];

  useEffect(() => {
    (async () => {
      setDepartments(await departmentsdb.departments.toArray());
      setChecked({ ...checked, [id]: true });
    })();
  }, []);

  const handleChecked = (id: number) => {
    setId(id);
    setChecked({ ...checked, [id]: true });
    setOpen(false);
  };

  useEffect(() => {
    for (let c in departments) {
      // console.log(checked[departments[c].departmentId]);
    }
  }, [checked]);

  useEffect(() => {
    departments.map((d) => {
      objects.push(
        <ListItem
          key={d.departmentId}
          className={
            checked[d.departmentId]
              ? "drawer-item-checked"
              : "drawer-item-unchecked"
          }
        >
          <div
            key={d.departmentId}
            onClick={() => handleChecked(d.departmentId)}
          >
            {d.displayName}
          </div>
        </ListItem>
      );
    });
    setCheckboxes(objects);
  }, [departments]);

  return (
    <div className="drawer">
      <div className="drawer-header">The Metropolitan Museum of Art</div>
      <div className="drawer-content">{checkboxes}</div>
      <a
        className="drawer-footer"
        href="https://github.com/KavehHashemi/museum-website-ts"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <IconButton>
            <GithubIcon sx={{ color: "#c5c5c5" }}></GithubIcon>
          </IconButton>
        </div>
        <div>GitHub</div>
      </a>
    </div>
  );
};

export default DrawerComponent;
