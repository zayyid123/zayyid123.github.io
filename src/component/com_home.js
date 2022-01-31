/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import './home.css';
import gambar from '../image/my_photo.png';
import { AiOutlineInstagram} from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";

function Home() {    
    return(
        <div className='my-home' data-aos="fade-down">
            <div className='home-profile'>
                <h1 className='home_title'>Hi,<br/>I'am <span className="my-name">Zay<span>yid</span></span><br/> <span className="title-text">Web Developer</span></h1>
                <a href='#contact' className='btn-contact'>Contact</a>
                <div className='all-icon-home'>
                    <a href="https://www.facebook.com/mochamad.zayyid" className='home-icon'><FaFacebook></FaFacebook></a>
                    <a href="https://www.instagram.com/zayyid_123/" className='home-icon'><AiOutlineInstagram></AiOutlineInstagram></a>
                    <a href="https://www.linkedin.com/in/mochamad-zayyid-09178518b/" className='home-icon'><FaLinkedinIn></FaLinkedinIn></a>
                </div>
            </div>
            <div className='home-img'>
                <img src={gambar}></img>
            </div>
        </div>
    );
}

export default Home;