import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const results = await fetch(profileApiUrl, options)
    const jsonData = await results.json()

    if (results.ok === true) {
      const profileDetails = {
        name: jsonData.profile_details.name,
        profileImageUrl: jsonData.profile_details.profile_image_url,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({profileDetails, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getDetails = () => {
    this.getProfileDetails()
  }

  successProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-cont">
        <img src={profileImageUrl} alt={name} className="profile-image" />
        <h1 style={{color: '#6366f1', marginTop: '0px'}}>{name}</h1>
        <p style={{color: ' #7e858e'}}>{shortBio}</p>
      </div>
    )
  }

  failureProfile = () => (
    <div className="profile-failure-bg-cont">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.getDetails}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.successProfile()
      case apiConstants.failure:
        return this.failureProfile()
      case apiConstants.initial:
        return this.loadingView()
      default:
        return null
    }
  }
}

export default ProfileDetails
