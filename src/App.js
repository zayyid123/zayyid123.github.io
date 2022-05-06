/* eslint-disable no-useless-constructor */
import React from 'react';
import './App.css';
import About from './component/com_about';
import Contact from './component/com_contact';
import Footer from './component/com_footer';
import Home from './component/com_home';
import Navbar from './component/com_navbar';
import Skills from './component/com_skills';
import Topbutton from './component/com_topbutton';
import Work from './component/com_work';
import AOS from "aos";
import "aos/dist/aos.css";

// aos
AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease',
  delay: 100,
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
          <div className='content'>
            <Home></Home>
            <About></About>
            <Skills></Skills>
            <Work></Work>
            <Contact></Contact>
            <Topbutton></Topbutton>
          </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
