import './index.css'

const Skills = props => {
  const {skillDet} = props
  const {name} = skillDet
  const imageUrl = skillDet.image_url

  return (
    <div className="skill-card-cont">
      <img
        src={imageUrl}
        alt={name}
        style={{width: '60px', marginRight: '14px'}}
      />
      <h4>{name}</h4>
    </div>
  )
}

export default Skills
