import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    jobData: {},
  }

  componentDidMount() {
    console.log('2')
    this.getJobData()
  }

  getJobData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchRes = await fetch(apiUrl, options)
    if (fetchRes.ok === true) {
      const jsonData = await fetchRes.json()
      const jobDetails = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        id: jsonData.job_details.id,
        jobDescription: jsonData.job_details.job_description,
        lifeAtCompany: jsonData.job_details.life_at_company,
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        rating: jsonData.job_details.rating,
        skills: jsonData.job_details.skills,
        title: jsonData.job_details.title,
      }
      const similarJobs = jsonData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobData: {jobDetails, similarJobs},
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  render() {
    const {apiStatus, jobData} = this.state
    const {jobDetails} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    console.log(jobDetails)

    return (
      <div className="job-card-bg-cont">
        <div className="logo-title-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-company-logo"
          />
          <div>
            <h1 className="job-card-title">{title}</h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingTop: '6px',
                marginTop: '0px',
              }}
            >
              <AiFillStar size={22} className="job-card-star" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-loc-emp-type-sal-cont">
          <div className="job-card-loc-emp-type-cont">
            <div className="loc-or-type-cont">
              <MdLocationOn size={22} />
              <p
                style={{
                  marginTop: '0px',
                  marginLeft: '8px',
                  marginRight: '20px',
                }}
              >
                {location}
              </p>
            </div>
            <div className="loc-or-type-cont">
              <BsFillBriefcaseFill size={22} />
              <p
                style={{
                  marginTop: '0px',
                  marginLeft: '8px',
                  marginRight: '25px',
                }}
              >
                {employmentType}
              </p>
            </div>
          </div>
          <p style={{fontWeight: '500', marginTop: '0px'}}>{packagePerAnnum}</p>
        </div>
        <hr style={{color: '#2c364c'}} />
        <h1 className="job-card-description-header">Description</h1>
        <p style={{fontFamily: 'Roboto', fontSize: '15px', lineHeight: '26px'}}>
          {jobDescription}
        </p>
      </div>
    )
  }
}

export default JobItemDetails
