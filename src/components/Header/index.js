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
    <div className="header-bg-cont">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="header-inner-cont">
        <Link to="/" style={{textDecoration: 'none'}}>
          <p className="header-para">Home</p>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <p className="header-para">Jobs</p>
        </Link>
      </div>
      <button type="submit" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
