import { Link } from "react-router-dom";

import { Department } from "../../types";

type props = {
  department: Department;
};
const SingleDepartment = ({ department }: props) => {
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "0.5rem",
        backgroundColor: "#383838",
        borderRadius: "4px",
      }}
    >
      <Link to={`/departments/${department.departmentId}`}>
        <div>{department.displayName}</div>
      </Link>
    </div>
  );
};

export default SingleDepartment;
