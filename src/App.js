import {Switch, Route} from 'react-router-dom'

import BookingForm from './components/BookingForm'
import Bookings from './components/Bookings'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={BookingForm} />
    <Route exact path="/bookings" component={Bookings} />
  </Switch>
)

export default App
