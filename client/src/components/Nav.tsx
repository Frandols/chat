import './Nav.css'

const Nav = () => {
    return (
        <nav
            className='nav'>
            <a
                className='nav-site-link'
                href='/'
                rel='noreferrer'>
                <img
                    src='assets/icon.svg'
                    alt='Francisco De Los Santos Logo'
                    width={40}
                    height={40}
                />
                <h1
                    className='nav-site-link-title'>
                    wazaa
                </h1>
            </a>
            <a
                className='nav-portfolio-link'
                href='https://franciscodelossantos.com'
                target='_blank'>
                <img
                    className='nav-portfolio-link-image'
                    src='https://franciscodelossantos.com/assets/img/profile.jpg'
                    width={30}
                    height={30}
                />
                <h1
                    className='nav-portfolio-link-title'>
                    frandols
                </h1>
            </a>
        </nav>
    )
}

export default Nav