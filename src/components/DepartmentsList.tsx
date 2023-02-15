/* eslint-disable array-callback-return */
import { useAppSelector } from '../hooks';
import SingleDepartment from './SingleDepartment';

const DepartmentsList = () => {
  const { departments } = useAppSelector((state) => state.departments);
  let departmentObjects: JSX.Element[] = [];

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
