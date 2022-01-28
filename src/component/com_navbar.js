/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import './navbar.css';

function Navbar(){
    return(
        <div className='my-navbar'>
            <div className='nav-logo'>
                <h3>ZAY<span>YID</span></h3>
            </div>
            <div className='nav-menu'>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>Skills</a></li>
                    <li><a href='#'>Work</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;