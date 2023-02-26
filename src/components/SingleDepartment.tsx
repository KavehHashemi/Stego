import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={`/departments/${department.departmentId}`}>
        <div>{department.displayName}</div>
      </Link>
    </div>
  );
};

export default SingleDepartment;
