import {Component} from 'react'
import './index.css'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'

const jobsApiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: jobsApiStatusOptions.initial,
    jobsList: [],
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-cont">
          <div className="jobs-left-cont">
            <ProfileDetails />
          </div>
          <div className="jobs-right-cont">gj</div>
        </div>
      </>
    )
  }
}
//     jobsList: [],
//     profileDetails: [],
//     jobsApiStatus: jobsApiStatusOptions.initial,
//     profileApiStatus: profileApiStatusOptions.failure,
//     employmentTypeList: [],
//     minPackage: '',
//     searchInput: '',
//   }

//   componentDidMount() {
//     const jwtToken = Cookies.get('jwt_token')
//     console.log('trigered')
//     this.getProfileDetails(jwtToken)
//     this.getJobsList(jwtToken)
//     console.log('vkj')
//   }

//   getProfileDetails = async jwtToken => {
//     const profileApiUrl = 'https://apis.ccbp.in/profile'
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const results = await fetch(profileApiUrl, options)
//     const jsonData = await results.json()

//     if (results.ok === true) {
//       const profileDetails = {
//         name: jsonData.profile_details.name,
//         profileImageUrl: jsonData.profile_details.profile_image_url,
//         shortBio: jsonData.profile_details.short_bio,
//       }
//       this.setState({
//         profileDetails,
//         profileApiStatus: profileApiStatusOptions.success,
//       })
//     } else {
//       this.setState({profileApiStatus: profileApiStatusOptions.failure})
//     }
//   }

//   getJobsList = async jwtToken => {
//     const {employmentTypeList, minPackage, searchInput} = this.state
//     const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList}&minimum_package=${minPackage}&search=${searchInput}`
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const fetchRes = await fetch(apiUrl, options)
//     if (fetchRes.ok === true) {
//       const jsonData = await fetchRes.json()
//       const {jobs} = jsonData
//       const updatedJobs = jobs.map(each => ({
//         companyLogoUrl: each.company_logo_url,
//         employmentType: each.employment_type,
//         id: each.id,
//         jobDescription: each.job_description,
//         location: each.location,
//         packagePerAnnum: each.package_per_annum,
//         rating: each.rating,
//         title: each.title,
//       }))
//       this.setState({
//         jobsList: updatedJobs,
//         jobsApiStatus: jobsApiStatusOptions.success,
//       })
//     }
//   }

//   successProfile = () => {
//     const {profileApiStatus, profileDetails} = this.state
//     const {name, profileImageUrl, shortBio} = profileDetails
//     return (
//       <div className="profile-bg-cont">
//         <img src={profileImageUrl} alt={name} className="profile-image" />
//         <h1 style={{color: '#6366f1', marginTop: '0px'}}>{name}</h1>
//         <p style={{color: ' #7e858e'}}>{shortBio}</p>
//       </div>
//     )
//   }

//   failureProfile = () => (
//     <div className="failure-profile-cont">
//       <button type="button">Retry</button>
//     </div>
//   )

//   //   renderProfileView = () => {
//   //     // const {profileApiStatus, profileDetails} = this.state
//   //     // const {name, profileImageUrl, shortBio} = profileDetails
//   //     // console.log(profileDetails)
//   //     // if (profileApiStatus === profileApiStatusOptions.success) {
//   //     //   return (
//   //     //     <div className="profile-bg-cont">
//   //     //       <img src={profileImageUrl} alt={name} className="profile-image" />
//   //     //       <h1 style={{color: '#6366f1', marginTop: '0px'}}>{name}</h1>
//   //     //       <p style={{color: ' #7e858e'}}>{shortBio}</p>
//   //     //     </div>
//   //     //   )
//   //     // }
//   //     // if (profileApiStatus === profileApiStatusOptions.failure) {
//   //     //   return (
//   //     //     <div className="failure-profile-cont">
//   //     //       <button type="button">Retry</button>
//   //     //     </div>
//   //     //   )
//   //     // }
//   //     // return <Loader type="Three Dots" color="#ffffff" />

//   //     switch (profileApiStatus) {
//   //       case profileApiStatusOptions.success:
//   //         return this.successProfile()
//   //       case profileApiStatusOptions.failure:
//   //         return this.failureProfile()
//   //       default:
//   //         return <Loader type="Three Dots" color="#ffffff" />
//   //     }
//   //   }

//   render() {
//     const {
//       profileDetails,
//       jobsList,
//       profileApiStatus,
//       jobsApiStatus,
//     } = this.state

//     console.log(profileDetails, jobsList, profileApiStatus, jobsApiStatus)

//     return (
//       <>
//         <Header />
//         <div className="jobs-bg-cont">
//           <div className="jobs-left-cont">
//           </div>
//           <div className="jobs-right-cont">gj</div>
//         </div>
//       </>
//     )
//   }

export default Jobs
