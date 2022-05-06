/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './work.css';
import sme from '../image/work/sme.png';
import adzan from '../image/work/adzan.png';
import ngaji from '../image/work/ngaji.png';
import bookshelf from '../image/work/bookshelf.png';
import myresto from '../image/work/myResto.png';

function Work() {
    return(
        <div data-aos="fade-up" className='work' id='work'>
            <h1>Work</h1>

            <div className='container-work'>
                <a href='https://sharemyevents.netlify.app/' className ="card" terget="_blank">
                    <img src={sme}/>
                    <div className ="container">
                        <h4>SME (Share My Event)</h4> 
                    </div>
                </a>

                <a href='https://zayyid123.github.io/jadwalAdzan.co.github.io/' className ="card" terget="_blank">
                    <img src={adzan}/>
                    <div className ="container">
                        <h4>Jadwal Adzan</h4> 
                    </div>
                </a>

                <a href='https://zayyid123.github.io/ngaji.github.io/' className ="card" terget="_blank">
                    <img src={ngaji}/>
                    <div className ="container">
                        <h4>Ngaji.co</h4> 
                    </div>
                </a>

                <a href='https://zayyid123.github.io/bookShelf-Natife.github.io/' className ="card" terget="_blank">
                    <img src={bookshelf}/>
                    <div className ="container">
                        <h4>Book Shelf</h4> 
                    </div>
                </a>


                <a href='https://zayyid123.github.io/MyResto/' className ="card" terget="_blank">
                    <img src={myresto}/>
                    <div className ="container">
                        <h4>My Resto</h4> 
                    </div>
                </a>

            </div>
        </div>
    );
}

export default Work