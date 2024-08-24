import {Component} from 'react'
import BookingsList from '../BookingsList'

import './index.css'

class Bookings extends Component {
  state = {
    bookingsList: [],
  }

  componentDidMount() {
    this.getBookings()
  }

  getBookings = async () => {
    const url = 'https://gopichand-careercarve-backend.onrender.com/bookings'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.map(each => ({
        studentname: each.studentname,
        mentorname: each.mentorname,
        duration: each.duration,
        id: each.id,
      }))
      this.setState({bookingsList: formattedData})
    }
  }

  render() {
    const {bookingsList} = this.state

    return (
      <div className="app-bg-container">
        <div className="icon-bg-container">
          <img
            src="https://res.cloudinary.com/dy5es3bf4/image/upload/v1724434045/dlsp7cw4exnk4moj0ezz.png"
            className="icon"
          />
        </div>
        <div className="bookings-container">
          <ul className="bookings-list-bg-cont">
            {bookingsList.map(each => (
              <BookingsList key={each.id} bookingData={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Bookings
