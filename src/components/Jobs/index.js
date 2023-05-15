import {Component} from 'react'
import './index.css'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'

const jobsApiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: jobsApiStatusOptions.initial,
    jobsList: [],
    employmentTypes: [],
    salaryRange: '',
    searchInput: '',
    searchValue: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentTypes, salaryRange, searchInput} = this.state
    const employmentTypeString = employmentTypes.join()
    console.log(employmentTypeString)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchRes = await fetch(apiUrl, options)
    if (fetchRes.ok === true) {
      const jsonData = await fetchRes.json()
      const jobsList = jsonData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList, apiStatus: jobsApiStatusOptions.success})
    }
  }

  updateEmploymentTypes = e => {
    const employmentTypes = this.setState(
      prevState => ({
        employmentTypes: [...prevState.employmentTypes, e.target.value],
      }),
      this.getJobsList,
    )
  }

  updateSalaryRange = e => {
    this.setState({salaryRange: e.target.value}, this.getJobsList)
    // this.getJobsList()
  }

  changeInput = event => {
    this.setState({searchValue: event.target.value})
  }

  updateSearchInput = () => {
    this.setState(
      prevState => ({searchInput: prevState.searchValue}),
      this.getJobsList,
    )
    // this.getJobsList()
  }

  render() {
    const {
      employmentTypes,
      salaryRange,
      searchInput,
      searchValue,
      jobsList,
    } = this.state
    console.log(employmentTypes)
    console.log(jobsList)
    return (
      <>
        <Header />
        <div className="jobs-bg-cont">
          <div className="jobs-left-cont">
            <div style={{marginBottom: '20px'}}>
              <ProfileDetails />
              <hr className="left-hr" />
              <p className="filter-grp">Type of Employment</p>
              {employmentTypesList.map(each => (
                <div>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    onChange={this.updateEmploymentTypes}
                    value={each.employmentTypeId}
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="checkbox-label"
                  >
                    {each.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="left-hr" />
            <p className="filter-grp">Salary Range</p>
            {salaryRangesList.map(each => (
              <div>
                <input
                  type="radio"
                  name="radio-btns"
                  id={each.salaryRangeId}
                  value={each.salaryRangeId}
                  onChange={this.updateSalaryRange}
                />
                <label htmlFor={each.salaryRangeId} className="checkbox-label">
                  {each.label}
                </label>
              </div>
            ))}
          </div>
          <div className="jobs-right-cont">
            <div className="search-input-cont">
              <input
                type="text"
                className="input-search"
                value={searchValue}
                onChange={this.changeInput}
                placeholder="Search"
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.updateSearchInput}
              >
                <BiSearch size={20} color="#cbd5e1" />
              </button>
            </div>
          </div>
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
