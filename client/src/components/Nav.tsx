import icon from '../assets/icon.svg'

import './Nav.css'

const Nav = () => {
  return (
    <nav className="nav">
      <a className="nav-site-link" href="/">
        <img src={icon} alt="logo" width={40} height={40} />
        <h1 className="nav-site-link-title">wazaa</h1>
      </a>
    </nav>
  )
}

export default Nav
