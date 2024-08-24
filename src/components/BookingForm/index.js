import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

import MentorsList from '../MentorsList'

import './index.css'

const roles = [
  {
    id: 'FMCG_Sales',
    displayText: 'FMCG Sales',
  },
  {
    id: 'Equity_Research',
    displayText: 'Equity Research',
  },
  {
    id: 'Digital_Marketing',
    displayText: 'Digital Marketing',
  },
]

const interviewDuration = [
  {
    id: 30,
    displayText: '30min',
    cost: 2000,
  },
  {
    id: 45,
    displayText: '45min',
    cost: 3000,
  },
  {
    id: 60,
    displayText: '60min',
    cost: 4000,
  },
]

class BookingForm extends Component {
  state = {
    studentname: '',
    mentorname: '',
    mentorsList: [],
    duration: interviewDuration[0].id,
    areaOfIntrest: roles[0].id,
    premiumMentorCost: 0,
    durationCost: 2000,
    showNameError: false,
    showSelectMentorError: true,
    noOfBookings: 0,
  }

  componentDidMount() {
    this.getMentors()
    this.getBookings()
  }

  getMentors = async () => {
    const url = 'https://gopichand-careercarve-backend.onrender.com/mentors'
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data)
    const fetchedData = data.map(eachMentor => ({
      name: eachMentor.name,
      areasOfExpertise: eachMentor.area_of_expertise,
      isPremium: eachMentor.is_premium,
      id: eachMentor.id,
    }))
    //console.log(fetchedData)
    this.setState({mentorsList: fetchedData})
  }

  getBookings = async () => {
    const url = 'https://gopichand-careercarve-backend.onrender.com/bookings'
    const response = await fetch(url)
    const data = await response.json()
    const length = data.length
    console.log(length)
    this.setState({noOfBookings: length})
  }

  onChangeStudentName = event => {
    this.setState({studentname: event.target.value})
  }

  onChangeAreaOfIntrest = event => {
    this.setState({areaOfIntrest: event.target.value})
  }

  onChangeDuration = event => {
    if (event.target.value === '30') {
      this.setState({duration: event.target.value, durationCost: 2000})
    } else if (event.target.value === '45') {
      this.setState({duration: event.target.value, durationCost: 3000})
    } else {
      this.setState({duration: event.target.value, durationCost: 4000})
    }
  }

  onSelectMentor = (id, name) => {
    const {mentorsList} = this.state
    const selectedMentor = mentorsList.filter(each => each.id === id)
    //console.log(selectedMentor)
    if (selectedMentor[0].isPremium === 1) {
      this.setState({
        premiumMentorCost: 1000,
        mentorname: name,
        showSelectMentorError: false,
      })
    } else {
      this.setState({
        premiumMentorCost: 0,
        mentorname: name,
        showSelectMentorError: false,
      })
    }
  }

  onSubmitBooking = async event => {
    event.preventDefault()
    const {
      durationCost,
      premiumMentorCost,
      studentname,
      mentorname,
      duration,
      selectMentor,
      noOfBookings,
    } = this.state

    if (studentname === '') {
      this.setState({showNameError: true})
    } else {
      const url = 'https://gopichand-careercarve-backend.onrender.com/bookings'
      const newBooking = {
        studentname,
        mentorname,
        duration,
        id: noOfBookings + 1,
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
        } else {
          const errorData = await response.json()
          console.error('Failed to book', errorData)
        }
      } catch (error) {
        console.error('Network error:', error)
      }
    }
  }

  openBookings = () => {
    const {history} = this.props
    history.replace('/bookings')
  }

  render() {
    const {
      studentname,
      duration,
      areaOfIntrest,
      mentorsList,
      showNameError,
      showSelectMentorError,
      durationCost,
      premiumMentorCost,
    } = this.state
    const nonPremiumMentorsList = mentorsList.filter(
      each => each.areasOfExpertise === areaOfIntrest && each.isPremium === 0,
    )
    const premiumMentorsList = mentorsList.filter(
      each => each.areasOfExpertise === areaOfIntrest && each.isPremium === 1,
    )

    return (
      <div className="app-bg-container">
        <div className="form-bg-container">
          <div className="icon-bg-container">
            <img
              src="https://res.cloudinary.com/dy5es3bf4/image/upload/v1724434045/dlsp7cw4exnk4moj0ezz.png"
              className="icon"
            />
          </div>

          <form className="form-container" onSubmit={this.onSubmitBooking}>
            <h1 className="form-heading">Book your 1x1 Mock Interview</h1>
            <div className="label-input-cont">
              <label htmlFor="studentName" className="label">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                value={studentname}
                onChange={this.onChangeStudentName}
                className="input"
              />
              {showNameError && (
                <p className="error-msg">*Please enter your name</p>
              )}
            </div>

            <div className="label-input-cont">
              <label htmlFor="areaOfIntrest" className="label">
                Area of Intrest
              </label>
              <select
                id="areaOfIntrest"
                className="input"
                value={areaOfIntrest}
                onChange={this.onChangeAreaOfIntrest}
              >
                {roles.map(each => (
                  <option key={each.id} value={each.id}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>

            <div className="label-input-cont">
              <label htmlFor="duration" className="label">
                Duration
              </label>
              <select
                id="duration"
                className="input"
                value={duration}
                onChange={this.onChangeDuration}
              >
                {interviewDuration.map(each => (
                  <option key={each.id} value={each.id}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>

            <div className="label-input-cont">
              <label htmlFor="duration" className="label">
                Mentors
              </label>
              <ul className="mentors-list-bg-cont">
                {nonPremiumMentorsList.map(each => (
                  <MentorsList
                    key={each.id}
                    mentorData={each}
                    onSelectMentor={this.onSelectMentor}
                  />
                ))}
              </ul>
              {showSelectMentorError && (
                <p className="error-msg">*Please select a mentor</p>
              )}
            </div>

            <div className="label-input-cont">
              <label htmlFor="duration" className="label">
                Premium Mentors
              </label>
              <ul className="mentors-list-bg-cont">
                {premiumMentorsList.map(each => (
                  <MentorsList
                    key={each.id}
                    mentorData={each}
                    onSelectMentor={this.onSelectMentor}
                  />
                ))}
              </ul>
              {showSelectMentorError && (
                <p className="error-msg">*Please select a mentor</p>
              )}
            </div>

            <div className="popup-containe">
              <Popup
                modal
                trigger={
                  <>
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                    <button type="button">
                      <Link to="/bookings">Bookings</Link>
                    </button>
                  </>
                }
              >
                {close => (
                  <div className="popup-container">
                    <div className="payment-container">
                      <div className="purchase-detail-cont">
                        <p>Mock Interview</p>
                        <p>{durationCost}</p>
                      </div>
                      <div className="purchase-detail-cont">
                        <p>Premium charge</p>
                        <p>{premiumMentorCost}</p>
                      </div>
                      <div className="purchase-detail-cont">
                        <p className="grand-total-text">Grand total</p>
                        <p>{premiumMentorCost + durationCost}</p>
                      </div>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Check Out
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default BookingForm
