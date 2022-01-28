import './footer.css';
import { AiOutlineInstagram} from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";

function Footer(){
    return(
        <div className='my-footer'>
                <div className='footer-logo'>
                    <h3>ZAY<span>YID</span></h3>
                </div>
                <div>
                    <a href="https://www.facebook.com/mochamad.zayyid" className='footer-icon'><FaFacebook></FaFacebook></a>
                    <a href="https://www.instagram.com/zayyid_123/" className='footer-icon'><AiOutlineInstagram></AiOutlineInstagram></a>
                    <a href="https://www.linkedin.com/in/mochamad-zayyid-09178518b/" className='footer-icon'><FaLinkedinIn></FaLinkedinIn></a>
                </div>
                <p>&#169; Mochamad Muzayyid Al Hakim. All rigths reserved</p>
        </div>
    )
}

export default Footer;