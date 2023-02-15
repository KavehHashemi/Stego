/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getDepartmentsArtworks } from '../store/artworks';
import SingleDepartment from './SingleDepartment';

const DepartmentsList = () => {
  const { departments, currentDepartment } = useAppSelector(
    (state) => state.departments
  );
  let departmentObjects: JSX.Element[] = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentDepartment)
      dispatch(getDepartmentsArtworks(currentDepartment.departmentId));
  }, [currentDepartment]);

  departments?.departments.map((dep) => {
    departmentObjects.push(
      <SingleDepartment
        key={dep.departmentId}
        department={dep}
      ></SingleDepartment>
    );
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {departmentObjects}
    </div>
  );
};

export default DepartmentsList;
