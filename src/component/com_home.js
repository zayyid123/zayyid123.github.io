/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import './home.css';
import gambar from '../image/my_photo.png';

function Home() {    
    return(
        <div className='my-home' data-aos="fade-down">
            <div className='home-profile'>
                <h1 className='home_title'>Hi,<br/>I'am <span className="my-name">ZAY<span>YID</span></span><br/> <span className="title-text">Web Developer</span></h1>
            </div>
            <div className='home-img'>
                <img src={gambar}></img>
            </div>
        </div>
    );
}

export default Home;