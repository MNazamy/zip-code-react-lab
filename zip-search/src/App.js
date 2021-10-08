import React, { Component } from 'react';
import './App.css';


function City(props) {
  return( 
  <div className =  'card'>
    <div className = 'cardtitle'>{props.city.LocationText}</div>
    <ul>
      <li>State: {props.city.State}</li>
      <li>Location: {props.city.Location}</li>
      <li>Population: {props.city.EstimatedPopulation}</li>
      <li>Total Wages: {props.city.TotalWages}</li>
    </ul>
  </div>
  );
}

function Zip(props){
  return(
    <div>{props.zip}</div>
  )
}

function CitySearchField(props){
  return (<div><input onChange={props.handleChange}/></div>);
}

function ZipSearchField(props) {
  return (<div><input onChange={props.handleChange}/></div>);
}

class App extends Component {
  state = {
    zipCode: "",
    cities: [],
    cityName: "",
    zipCodes: [],
  }

  zipChange = (event) => {
    if(event.target.value.length === 5){
      this.setState({zipCode: event.target.value, cityName: "", zipCodes: []}) // store value of user input
      fetch('https://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({cities: data})
      })
      .catch( err => {  // on error, make it a blank array
        this.setState({cities: []})
      })

    }
  }

  cityChange = (event) => {
    let c = event.target.value.toUpperCase();
    this.setState({cityName: c, zipCode: "", cities: []})
    fetch('https://ctp-zip-api.herokuapp.com/city/' + c)
    .then(res => res.json())
    .then (data =>{
      console.log(data)
      this.setState({zipCodes: data})
    })
    .catch( err=> {
      this.setState({zipCodes: []})
    })
  }


  render() {
    return (
      <div className="App">

        <div className="App-header">
          <div style={{float: 'left', width: '50%', height: '50%'}}>
            <h5>Zip Code Search</h5>
          </div>
          <div style ={{float: 'right', width: '50%', height: '50%'}}>
            <h5>City Search</h5>
          </div>
        </div>


        <div className='App-body'>

          <div style={{float: 'left', width: '50%'}} >
            <div><ZipSearchField handleChange={this.zipChange} /></div>
            <div>Current Zip Code is: {this.state.zipCode}</div>
            <div className = "cards-holder">
              {this.state.cities.map (city => <City city = {city} /> ) }
            </div>
          </div>

          <div style={{float: 'right', width: '50%'}} >
            <div><CitySearchField handleChange = {this.cityChange} /></div>
            <div>Current City is: {this.state.cityName}</div>
            <div className = "cards-holder">
              {this.state.zipCodes.map (z => <Zip z = {z}/> ) }
            </div>
          </div>


        </div>


      </div>
    );
  }
}

export default App;
