import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
// import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Skills from '../Skills'
import './index.css'
import SimilarJobs from '../SimilarJobs'

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

  loadJobData = () => {
    this.getJobData()
  }

  renderJobData = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      //   id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <>
        <div className="job-data-card-bg-cont">
          <div className="logo-title-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <p style={{fontWeight: '500', marginTop: '0px'}}>
              {packagePerAnnum}
            </p>
          </div>
          <hr style={{color: '#2c364c'}} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1
              className="job-card-description-header"
              style={{fontSize: '30px'}}
            >
              Description
            </h1>
            <a
              href={companyWebsiteUrl}
              style={{
                textDecoration: 'none',
                fontSize: '22px',
                color: '#4f46e5',
              }}
            >
              Visit <BiLinkExternal size={20} />
            </a>
          </div>
          <p
            style={{fontFamily: 'Roboto', fontSize: '15px', lineHeight: '26px'}}
          >
            {jobDescription}
          </p>
          <h1
            style={{fontSize: '22px', marginTop: '40px', marginBottom: '25px'}}
          >
            Skills
          </h1>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              paddingLeft: '0px',
            }}
          >
            {skills.map(each => (
              <Skills skillDet={each} key={each.name} />
            ))}
          </ul>
          <h1 style={{fontSize: '20px'}}>Life at Company</h1>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{width: '65%', lineHeight: '30px', fontSize: '18px'}}>
              {lifeAtCompany.description}
            </p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <h1 style={{color: '#fff', marginTop: '50px', fontSize: '24px'}}>
          Similar Jobs
        </h1>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            paddingLeft: '0px',
          }}
        >
          {similarJobs.map(each => (
            <SimilarJobs similarJobDet={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" />
    </div>
  )

  renderFailureView = () => (
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
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.loadJobData}>
        Retry
      </button>
    </div>
  )

  renderOnCondition = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.initial:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobData()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobData} = this.state
    console.log(jobData)
    const {jobDetails} = jobData
    console.log(jobDetails)
    return (
      <>
        <Header />
        <div className="job-data-bg-cont">{this.renderOnCondition()}</div>
      </>
    )
    // const {
    //   //   companyLogoUrl,
    //   companyWebsiteUrl,
    //   employmentType,
    //   id,
    //   jobDescription,
    //   lifeAtCompany,
    //   location,
    //   packagePerAnnum,
    //   rating,
    //   skills,
    //   title,
    // } = jobDetails
    // console.log(companyWebsiteUrl)
    // return <div>hii</div>
    // const {jobDetails} = jobData
    // const {
    //   companyLogoUrl,
    //   companyWebsiteUrl,
    //   employmentType,
    //   id,
    //   jobDescription,
    //   lifeAtCompany,
    //   location,
    //   packagePerAnnum,
    //   rating,
    //   skills,
    //   title,
    // } = jobDetails
    // console.log(jobDetails)

    // return (
    //   <div className="job-card-bg-cont">
    //     <div className="logo-title-cont">
    //       <img
    //         src={companyLogoUrl}
    //         alt="company logo"
    //         className="job-card-company-logo"
    //       />
    //       <div>
    //         <h1 className="job-card-title">{title}</h1>
    //         <div
    //           style={{
    //             display: 'flex',
    //             alignItems: 'flex-start',
    //             paddingTop: '6px',
    //             marginTop: '0px',
    //           }}
    //         >
    //           <AiFillStar size={22} className="job-card-star" />
    //           <p className="job-card-rating">{rating}</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="job-card-loc-emp-type-sal-cont">
    //       <div className="job-card-loc-emp-type-cont">
    //         <div className="loc-or-type-cont">
    //           <MdLocationOn size={22} />
    //           <p
    //             style={{
    //               marginTop: '0px',
    //               marginLeft: '8px',
    //               marginRight: '20px',
    //             }}
    //           >
    //             {location}
    //           </p>
    //         </div>
    //         <div className="loc-or-type-cont">
    //           <BsFillBriefcaseFill size={22} />
    //           <p
    //             style={{
    //               marginTop: '0px',
    //               marginLeft: '8px',
    //               marginRight: '25px',
    //             }}
    //           >
    //             {employmentType}
    //           </p>
    //         </div>
    //       </div>
    //       <p style={{fontWeight: '500', marginTop: '0px'}}>{packagePerAnnum}</p>
    //     </div>
    //     <hr style={{color: '#2c364c'}} />
    //     <h1 className="job-card-description-header">Description</h1>
    //     <p style={{fontFamily: 'Roboto', fontSize: '15px', lineHeight: '26px'}}>
    //       {jobDescription}
    //     </p>
    //   </div>
    // )
  }
}

export default JobItemDetails
