import './index.css'

const BookingsList = props => {
  const {bookingData} = props
  const {id, studentname, mentorname, duration} = bookingData

  return (
    <li className="list-item">
      <p className="name">
        <span>Student: </span>
        {studentname}
      </p>
      <p className="name">
        <span>Mentor: </span>
        {mentorname}
      </p>
      <p className="duration">
        <span>Duration: </span>
        {duration} <span>min</span>
      </p>
    </li>
  )
}

export default BookingsList
