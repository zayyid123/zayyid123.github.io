import './contact.css';

function Contact() {
    return(
        <div className='contact' id='contact'>
            <h1>Contact</h1>

            <div className="contact__container bd-grid">
                <form action="" className="contact__form">
                    <input type="text" placeholder="Name" className="contact__input"/>
                    <input type="mail" placeholder="Email" className="contact__input"/>
                    <textarea name="" id="" cols="0" rows="10" className="contact__input"></textarea>
                    <input type="button" value="Send" className="contact_button"/>
                </form>
            </div>
        </div>
    );
}

export default Contact;
