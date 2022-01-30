/* eslint-disable jsx-a11y/alt-text */
import './about.css';
import gambar from '../image/my_photo.png';

function About() {
    return(
        <div className='my-about'>
            <h1>About</h1>

            <div className='about-container'>
                <div className='about-img'>
                    <img src={gambar}/>
                </div>
                <div className='about-profil'>
                    <h2>
                        I'am Zayyid
                    </h2>
                    <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate cum expedita quo culpa tempora, assumenda, quis fugiat ut voluptates soluta, aut earum nemo recusandae cumque perferendis! Recusandae alias accusamus atque.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;