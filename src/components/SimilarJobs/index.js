import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDet} = props
  const {
    companyLogoUrl,
    employmentType,
    // id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDet

  return (
    <div
      className="job-card-bg-cont"
      style={{width: '30%', marginRight: '20px', marginBottom: '20px'}}
    >
      <div className="logo-title-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      </div>
      <hr style={{color: '#2c364c'}} />
      <h1 className="job-card-description-header">Description</h1>
      <p style={{fontFamily: 'Roboto', fontSize: '15px', lineHeight: '26px'}}>
        {jobDescription}
      </p>
    </div>
  )
}

export default SimilarJobs
