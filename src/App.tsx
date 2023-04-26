import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Artworks from "./pages/Artworks";
import Departments from "./pages/Departments";
import { useAppSelector } from "./utils/hooks";

function App() {
  const { currentDepartment } = useAppSelector((state) => state.departments);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Departments></Departments>}></Route>
        <Route
          path={`/departments/${currentDepartment}`}
          element={<Artworks></Artworks>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
