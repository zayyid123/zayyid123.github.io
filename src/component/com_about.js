/* eslint-disable jsx-a11y/alt-text */
import './about.css';
import gambar from '../image/photo2.png';

function About() {
    return(
        <div data-aos="fade-up" className='my-about' id='about'>
            <p></p>
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
                    Perkenalkan nama saya <span>Mochamad Muzayyid Al Hakim</span> saya mahasiswa semester 6 di <span>Universitas Negeri Surabaya</span> Jurusan <span>Teknik Informatika</span> Prodi <span>Sistem Informasi</span>, saya adalah orang yang senang dan menggeluti tentang <span>front-end web developer</span> dan pernyataan ini di dukung dengan adanya sertifikasi saya di <span>Dicoding Academy</span> yaitu sertifikasi <span>front-end web developer expert</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;