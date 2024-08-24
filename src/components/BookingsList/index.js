import './index.css'

const BookingsList = props => {
  const {bookingData} = props
  const {id, studentname, mentorname, duration} = bookingData

  return (
    <li className="list-item">
      <p className="name">{studentname}</p>
      <p className="name">{mentorname}</p>
      <p className="area-of-expertise">{duration}</p>
    </li>
  )
}

export default BookingsList
