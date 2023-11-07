import React from "react";
import ListRoute from "./config/listRoute.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <main>
      <Router>
      <Navbar/>
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
      <Footer/>
      </Router>
    </main>
  );
}

export default App;
