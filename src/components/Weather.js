import React, { Component } from 'react';
import Atmosphere from './Atmosphere';
import Temperature from './Temperature';
import WeatherDescription from './WeatherDescription';

import './Weather.css'

class Weather extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      unit: 'C',     // Used to hold value entered in the input field
      weatherData: null,  // Used to hold data loaded from the weather API
      status: 'idle',
      error: null
    }
  }


  // async example of handleSubmit
  async handleAsyncSubmit(e) {
    e.preventDefault()
    // ! Get your own API key ! 
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    // Get the zip from the input
    const zip = this.state.inputValue
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`

   try {
    const res = await fetch(url)
    const json = await res.json()
    
    this.setState({ weatherData: json, status: "success" })
    if (this.state.weatherData.cod !== 200) {
          // If OpenWeather returns status error
        this.setState( { weatherData: json, error: json.message, status: 'error' })
      }
    console.log(json.cod , json.message)
   } catch(err) {
      console.log(err)
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    // ! Get your own API key ! 
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    // Get the zip from the input
    const zip = this.state.inputValue
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`
    
    const p1 = fetch(url)
    const p2 = p1.then((res) => {return res.json()})
    p2.then((json) => {
      this.setState({ weatherData: json, status: "success" })
      if (this.state.weatherData.cod !== 200) {
            // If OpenWeather returns status error
          this.setState( { weatherData: json, error: json.message, status: 'error' })
        }
      console.log(json.cod , json.message)
    })
    p2.catch((err) => {
      console.log(err)
    })




    // Get data from the API with fetch
    fetch(url).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json, status: "success" })
      // ! This needs better error checking here or at renderWeather() 
      // It's possible to get a valid JSON response that is not weather 
      // data, for example when a bad zip code entered.
      if (this.state.weatherData.cod !== 200) {
            // If OpenWeather returns status error
          this.setState( { weatherData: json, error: json.message, status: 'error' })
        }
      console.log(json.cod , json.message)
    }).catch((err) => {
      // If there is no data 
      this.setState({ weatherData: null, status: 'error' }) // Clear the weather data we don't have any to display

      // Print an error to the console. 
      console.log('-- Error fetching --')
      console.log(err.message)
      // You may want to display an error to the screen here. 
    })
  }

  checkStatus() {
    if (this.state.status === "idle") {
      return (<div>Please enter your zipcode</div>)
    } else if (this.state.status === "loading") {
      return (<div>Fetching...</div>)
    } else if (this.state.status === 'error') {
      return (<div>Invalid</div>)
    }
    return this.renderWeather()
  }

  renderWeather() {
    // This method returns undefined or a JSX component
    if (this.state.weatherData === null) {
      // If there is no data return undefined
      return undefined
    } 

    /* 
    This next step needs another level of error checking. It's 
    possible to get a JSON response for an invalid zip in which 
    case the step below fails. 
    */ 
    console.log(this.state.weatherData)
    if (this.state.weatherData.cod === 200) {
      // Take the weather data apart to more easily populate the component
      const { main, description, icon } = this.state.weatherData.weather[0]
      const { temp, pressure, humidity, temp_min, temp_max } = this.state.weatherData.main 

      return (
        <div>
          <WeatherDescription main={main} description={description} icon={icon} />
          <Temperature temp={temp} temp_min={temp_min} temp_max={temp_max} unit={this.state.unit} />
          <Atmosphere pressure={pressure} humidity={humidity}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Weather">

        {/** This input uses the controlled component pattern */}
        <form onSubmit={e => this.handleSubmit(e)}>

          {/** 
          This pattern is used for input and other form elements 
          Set the value of the input to a value held in component state
          Set the value held in component state when a change occurs at the input 
          */}

          <input 
            value={this.state.inputValue} 
            onChange={e => this.setState({ inputValue: e.target.value })}
            type="text" 
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="enter zip"
          />  

          <button type="submit">Submit</button>

          <div className='Radio'>

            <div className='row'>
              <input 
                type="radio"
                value="C"
                checked={this.state.unit === "C"}
                onChange={e => this.setState({ unit: "C" })}
              /> <label htmlFor="C">Celcius</label>
            </div>

            <div className='row'>
              <input 
                type="radio"
                value="F"
                checked={this.state.unit === "F"}
                onChange={e => this.setState({ unit: "F" })}
              /> <label htmlFor="F">Fahrenheit</label> 
            </div>

            <div className='row'>
              <input 
                type="radio"
                value="K"
                checked={this.state.unit === "K"}
                onChange={e => this.setState({ unit: "K" })}
              /> <label htmlFor="K">Kelvin</label>
            </div>
          </div>
        </form>

        {/** Conditionally render this component */}
        <div className="Description">
          {this.checkStatus()}
        </div>

      </div>
    );
  }
}

export default Weather;