/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import Checkbox from '@mui/material/Checkbox';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setChecked({ ...checked, [id]: e.target.checked });
    setId(id);
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
        <ListItem key={d.departmentId} style={{ backgroundColor: "#000" }}>
          <Checkbox
            sx={{ color: "#c5c5c5" }}
            checked={checked[d.departmentId]}
            onChange={(e) => handleChange(e, d.departmentId)}
          ></Checkbox>
          <div style={{ color: "#c5c5c5" }}>{d.displayName}</div>
        </ListItem>
      );
    });
    setCheckboxes(objects);
  }, [departments]);

  return <div>{checkboxes}</div>;
};

export default DrawerComponent;
