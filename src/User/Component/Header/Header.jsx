import './Header.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <div className='header' id='header'>
                <div className='header_txt'>Hafez</div>
                <div className='header_main'>
                    <div className='header_main_container'>
                        <div className='header_main_container_option'>
                            <button onClick={() => handleScroll('home_landing')} className="header_main_container_option_item">Home</button>
                            <button onClick={() => handleScroll('home_products')} className="header_main_container_option_item">Projects</button>
                            <button onClick={() => handleScroll('footer')} className="header_main_container_option_item">Contact me</button>
                            <button onClick={() => handleScroll('home_about')} className="header_main_container_option_item">About Me</button>
                            <button onClick={handleLogin} className='header_main_container_login'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
