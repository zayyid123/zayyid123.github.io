/* eslint-disable no-useless-constructor */
import React from 'react';
import './App.css';
import About from './component/com_about';
import Footer from './component/com_footer';
import Home from './component/com_home';
import Navbar from './component/com_navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
          <div className='content'>
            <Home></Home>
            <About></About>
          </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
