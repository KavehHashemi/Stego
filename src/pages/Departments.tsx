/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/styles.scss";

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getDepartmentArtworks } from "../store/artworks";
import { getDepartments, setCurrent } from "../store/departments";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const Departments = () => {
  const dispatch = useAppDispatch();
  const { departments, currentDepartment } = useAppSelector(
    (state) => state.departments
  );

  useEffect(() => {
    const fetchDepartments = async () => {
      dispatch(getDepartments());
    };
    fetchDepartments();
  }, []);

  let array: JSX.Element[] = [];

  departments.map((d, i) => {
    array = [
      ...array,
      <div
        key={i}
        className="department-card"
        onMouseDown={() => dispatch(setCurrent(d.departmentId))}
        onMouseUp={() => dispatch(getDepartmentArtworks(d.departmentId))}
      >
        <Link to={`departments/${currentDepartment}`}>{d.displayName}</Link>
      </div>,
    ];
  });

  return <div className="departments-container">{array}</div>;
};

export default Departments;
