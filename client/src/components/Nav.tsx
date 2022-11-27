import './Nav.css'

const Nav = () => {
    return (
        <nav
            className='nav'>
            <a
                className='nav-site-link'
                href='/'>
                <img
                    src='assets/icon.svg'
                    alt='logo'
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
                target='_blank'
                rel='noreferrer'>
                <img
                    className='nav-portfolio-link-image'
                    src='https://franciscodelossantos.com/assets/img/profile.jpg'
                    alt='profile'
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