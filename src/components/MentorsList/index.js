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
        <p className="name">{name}</p>
        <p className="area-of-expertise">{areasOfExpertise}</p>
      </button>
    </li>
  )
}

export default MentorsList
