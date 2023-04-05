/* eslint-disable array-callback-return */
import { useAppSelector } from "../hooks";
import SingleDepartment from "./SingleDepartment";

const DepartmentsList = () => {
  const { departments } = useAppSelector((state) => state.departments);

  let departmentsArray: JSX.Element[] = [];
  departments?.departments.map((dep) => {
    departmentsArray = [
      ...departmentsArray,
      <SingleDepartment
        key={dep.departmentId}
        department={dep}
      ></SingleDepartment>,
    ];
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {departmentsArray}
    </div>
  );
};

export default DepartmentsList;
