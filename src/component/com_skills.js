/* eslint-disable jsx-a11y/alt-text */
import './skills.css';
import gambar from '../image/skills-01.png';

function Skills() {
    return(
        <div data-aos="fade-up" className='skills' id='skills'>
            <h1>Skills</h1>

            <div className='container-skills'>
                <div className='skills-presentation'>
                    <h2>Profesional Skills</h2>
                    <p>
                        Berikut adalah beberapa skill atau keahlian yang saya punyai yang tentunya sangat berguna dalama pengembangan sebuah website, diantaranya HTML, CSS, JS dan React.js.
                    </p>
                    <div className="skill-bars">
                        <div className="bar">
                            <div className="info">
                                <span>HTML</span>
                            </div>
                            <div className="progress-line html">
                                <span></span>
                            </div>
                        </div>
                        <div className="bar">
                            <div className="info">
                                <span>CSS</span>
                            </div>
                            <div className="progress-line css">
                                <span></span>
                            </div>
                        </div>
                        <div className="bar">
                            <div className="info">
                                <span>JavaScript</span>
                            </div>
                            <div className="progress-line JavaScript">
                                <span></span>
                            </div>
                        </div>
                        <div className="bar">
                            <div className="info">
                                <span>React.js</span>
                            </div>
                            <div className="progress-line React_js">
                                <span></span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='skills-img'>
                    <img src={gambar}/>
                </div>
            </div>
        </div>
    );
}

export default Skills;