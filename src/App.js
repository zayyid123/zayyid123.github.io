import React from "react";
import ListRoute from "./config/listRoute.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {
            ListRoute.map((data) => (
              <Route 
                key={data.name}
                exact 
                path={data.path} 
                element={<data.component />} 
              />
            ))
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
