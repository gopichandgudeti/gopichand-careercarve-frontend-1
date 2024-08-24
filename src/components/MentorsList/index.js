import './index.css'

const MentorsList = props => {
  const {mentorData, onSelectMentor} = props
  const {id, name, areasOfExpertise, isPremium} = mentorData
  const onClickMentor = () => {
    onSelectMentor(id, name)
  }

  return (
    <li className="list-item">
      <button className="list-btn" onClick={onClickMentor}>
        {isPremium ? <p className="premium-text">Premium</p> : ''}
        <p className="name">
          <span className="side-headings">Mentor: </span>
          {name}
        </p>
        <p className="area-of-expertise">
          <span className="side-headings">Area of expertise: </span>
          {areasOfExpertise}
        </p>
      </button>
    </li>
  )
}

export default MentorsList
