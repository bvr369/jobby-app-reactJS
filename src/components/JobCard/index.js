import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
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
    </Link>
  )
}

export default JobCard
