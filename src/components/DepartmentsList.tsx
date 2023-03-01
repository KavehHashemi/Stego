/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect } from "react";

import { useAppSelector } from "../hooks";
import SingleDepartment from "./SingleDepartment";

// import {
//   getDepartmentsArtworks,
//   ResetCollection,
//   ResetIndex,
// } from "../store/artworks";
const DepartmentsList = () => {
  const { departments, currentDepartment } = useAppSelector(
    (state) => state.departments
  );

  let departmentObjects: JSX.Element[] = [];
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(`current department is ${currentDepartment?.displayName}`);
  //   dispatch(ResetCollection);
  //   dispatch(ResetIndex);
  //   if (currentDepartment)
  //     dispatch(getDepartmentsArtworks(currentDepartment.departmentId));
  // }, [currentDepartment]);

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
