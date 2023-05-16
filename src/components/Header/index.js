import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    console.log('logout')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-bg-cont">
      <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>
      </ul>
      <ul className="header-inner-cont">
        <li>
          <Link to="/" style={{textDecoration: 'none'}}>
            <p className="header-para">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" style={{textDecoration: 'none'}}>
            <p className="header-para">Jobs</p>
          </Link>
        </li>
      </ul>
      <button type="submit" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
