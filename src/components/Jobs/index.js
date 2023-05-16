import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobCard from '../JobCard'

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
    const {employmentTypes} = this.state
    //   let updatedEmploymentTypes = employmentTypes
    if (employmentTypes.includes(e.target.value)) {
      const index = employmentTypes.indexOf(e.target.value)
      employmentTypes.splice(index, 1)
    } else if (e.target.value === 'FULLTIME') {
      employmentTypes.splice(0, 0, e.target.value)
    } else if (e.target.value === 'PARTTIME') {
      employmentTypes.splice(1, 0, e.target.value)
    } else if (e.target.value === 'FREELANCE') {
      employmentTypes.splice(2, 0, e.target.value)
    } else {
      employmentTypes.push(e.target.value)
    }
    this.setState(employmentTypes, this.getJobsList)
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

  loadJobs = () => {
    this.getJobsList()
  }

  renderJobsLoader = () => {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case jobsApiStatusOptions.initial:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Loader type="ThreeDots" color="#ffffff" />
          </div>
        )
      case jobsApiStatusOptions.success:
        if (jobsList.length > 0) {
          return (
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
              {jobsList.map(each => (
                <JobCard key={each.id} jobDetails={each} />
              ))}
            </ul>
          )
        }
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              color: '#ffffff',
            }}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              style={{width: '300px'}}
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        )
      case jobsApiStatusOptions.failure:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
            }}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              style={{width: '300px'}}
            />
            <h1 style={{color: '#ffffff'}}>Oops! Something Went Wrong</h1>
            <p style={{color: '#b6c5ff'}}>
              We cannot seem to find the page you are looking for
            </p>
            <button type="button" onClick={this.loadJobs}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-cont">
          <div className="jobs-left-cont">
            <div style={{marginBottom: '20px'}}>
              <ProfileDetails />
              <hr className="left-hr" />
              <h1 className="filter-grp">Type of Employment</h1>
              <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {employmentTypesList.map(each => (
                  <li>
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      onChange={this.updateEmploymentTypes}
                      value={each.employmentTypeId}
                      key={each.employmentTypeId}
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="checkbox-label"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="left-hr" />
            <h1 className="filter-grp">Salary Range</h1>
            {salaryRangesList.map(each => (
              <div>
                <input
                  type="radio"
                  name="radio-btns"
                  id={each.salaryRangeId}
                  value={each.salaryRangeId}
                  onChange={this.updateSalaryRange}
                  key={each.salaryRangeId}
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
                type="search"
                className="input-search"
                value={searchValue}
                onChange={this.changeInput}
                placeholder="Search"
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.updateSearchInput}
                data-testid="searchButton"
              >
                <BiSearch size={20} color="#cbd5e1" />
              </button>
            </div>
            {
              /* {jobsList.map(each => (
              <JobCard key={each.id} jobDetails={each} />
            ))} */
              this.renderJobsLoader()
            }
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
