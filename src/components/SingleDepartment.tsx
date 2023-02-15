import React from 'react';

import { Department } from '../../types';
import { useAppDispatch } from '../hooks';
import { setCurrentDepartment } from '../store/departments';

type props = {
  department: Department;
};
const SingleDepartment = ({ department }: props) => {
  const dispatch = useAppDispatch();
  const setCurrentDep = (departmentID: number) => {
    dispatch(setCurrentDepartment(departmentID));
  };

  return (
    <div
      style={{
        cursor: "pointer",
        padding: "0.5rem",
        backgroundColor: "#383838",
        borderRadius: "4px",
      }}
      onClick={() => setCurrentDep(department.departmentId)}
    >
      <div>{department.displayName}</div>
    </div>
  );
};

export default SingleDepartment;
