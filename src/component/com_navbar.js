/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import './navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";

class Navbar extends React.Component{
    state = {
        isActive: true,
    }

    render(){
        return (
            <div className='my-navbar'>
                <div className='nav-container'>
                    <div className='nav-logo'>
                        <h3>ZAY<span>YID</span></h3>
                    </div>
                    <div className='nav-menu' id='nav-menu'>
                        <ul className={this.state.isActive ? 'container-menu' : 'container-menu show'}>
                            <li><a href='#'>Home</a></li>
                            <li><a href='#about'>About</a></li>
                            <li><a href='#skills'>Skills</a></li>
                            <li><a href='#work'>Work</a></li>
                            <li><a href='#contact'>Contact</a></li>
                        </ul>
                    </div>
    
                    <div className='nav-toggle'>
                        <GiHamburgerMenu onClick={ () => this.setState({isActive: !this.state.isActive})}></GiHamburgerMenu>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;