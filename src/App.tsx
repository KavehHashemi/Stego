/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound';
import { useAppSelector } from './hooks';
import Departments from './pages/Departments';
import Home from './pages/Home';
import { initializeIDsDB } from './utils';

const App = () => {
  const { currentDepartment } = useAppSelector((state) => state.departments);

  useEffect(() => {
    (async () => {
      await initializeIDsDB();
    })();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path={`/departments/${currentDepartment?.departmentId}`}
          element={<Departments />}
        ></Route>
        <Route path={"*"} element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
