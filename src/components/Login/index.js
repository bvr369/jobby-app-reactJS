import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errMsg: '',
    showError: false,
  }

  changeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  changePwd = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSuccess = token => {
    if (token !== undefined) {
      const {history} = this.props
      Cookies.set('jwt_token', token, {expires: 30})
      history.replace('/')
    }
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('event triggered')
    const {usernameInput, passwordInput} = this.state
    const requestBody = JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    })
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: requestBody,
    }
    const fetchResult = await fetch(url, options)
    console.log(fetchResult)
    const jsonData = await fetchResult.json()
    console.log(jsonData)

    if (fetchResult.ok === true) {
      const jwtToken = jsonData.jwt_token
      this.onSuccess(jwtToken)
    } else {
      const errorMsg = jsonData.error_msg
      this.setState({errMsg: errorMsg, showError: true})
    }
  }

  render() {
    const {errMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-cont">
        <form className="login-cont" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input-ele"
            onChange={this.changeUsername}
          />
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-ele"
            onChange={this.changePwd}
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
          {showError && <p className="err-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
