import { Link } from 'react-router-dom';
function Contact() {
    return (
        <>
            <div className='body'>
                <p id='phone'>Call Me: <Link to="tel:+13074383537">(307) 438-3537</Link></p>
                <p id='email'>Email Me: <Link to="mailto:kailixian97@gmail.com">kailixian97@gmail.com</Link></p>
                <p id='linkedin'>Visit my LinkedIn Profile: <a target="_blank" href="https://www.linkedin.com/in/kai-hampton726">LinkedIn</a></p>
                <p id='github'>Visit my GitHub Profile: <a target="_blank" href="https://github.com/cs-khampton/">GitHub</a></p>
            </div>
        </>
    )
}
export default Contact;