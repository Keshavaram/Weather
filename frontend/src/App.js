import React from "react";
import './style.css'
import cloud from './cloud.png'
import rain from './rain.png'
import sunny from './sun.png'
import loc from './loc.png'
import temp from './temp.png'
import realFeel from './realFeel.svg'
import pressure from './pressure.png'
import wind from './wind.png'
import humidity from './humidity.png'
import fog from './fog.png'
import $ from 'jquery'

let day;

class Weather extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            currentData : {"content" : "none"},
            forecastData : [],
            image : null,
            description : "",
            temperature : "",
            city : "",
            realFeel : "",
            max : "",
            min : "",
            humidity : "",
            pressure : "",
            wind : "",
            today : "",
            days : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            searchQuery : ""
        }
        this.fetchCurrentData = this.fetchCurrentData.bind(this);
        this.daySelect = this.daySelect.bind(this);
        this.runOnce();
        this.captureQuery = this.captureQuery.bind(this);
        this.search = this.search.bind(this);
    }

    async runOnce()
    {
        let now = new Date().getDay();
        this.setState({today : now})
        const response = await fetch("http://localhost:8000/forecast/:" + this.state.days[now]);
        $("#daySelect").val(this.state.days[now])
        const jsonData = await response.json();
        this.setState({forecastData : jsonData});
    }

    async fetchCurrentData()
    {
        const response = await fetch("http://localhost:8000/current");
        const jsonData = await response.json();
        this.setState({currentData : jsonData});
    }

    async fetchForecastData()
    {
        let now = new Date().getDay();
        this.setState({today : now})
        const response = await fetch("http://localhost:8000/forecast/:" + this.props.day);
        $("#daySelect").val(this.props.day)
        const jsonData = await response.json();
        this.setState({forecastData : jsonData});
    }

    componentDidMount() {
        this.fetchCurrentData()
            .then(() => {
                this.setState({description : this.state.currentData.weather[0].description});
                switch (this.state.currentData.weather[0].main)
                {
                    case "Clouds": case "Mist" : this.setState({image : cloud});break;
                    case "Rain": case "Drizzle": this.setState({image : rain});break;
                    case "Clear" : this.setState({image : sunny});break;
                    case "Haze" : case "Foggy":case "Fog": this.setState({image : fog});break;
                }
                this.setState({temperature : this.state.currentData.main.temp.toString()});
                this.setState({realFeel : this.state.currentData.main.feels_like});
                this.setState({max : this.state.currentData.main.temp_max});
                this.setState({min : this.state.currentData.main.temp_min});
                this.setState({humidity : this.state.currentData.main.humidity});
                this.setState({pressure : this.state.currentData.main.pressure});
                this.setState({wind : this.state.currentData.wind.speed});
                this.setState({city : this.state.currentData.name});
            });

        this.fetchForecastData();
    }

    async daySelect(event)
    {
        window.location.href = '/' + event.target.value;
        const response = await fetch("http://localhost:8000/forecast/:" + event.target.value);
        const jsonData = await response.json();
        this.setState({forecastData : jsonData})
        day = event.target.value;
    }

    search()
    {
        console.log(this.state.searchQuery)
    }

    captureQuery(event)
    {
        this.setState({searchQuery : event.target.value});
    }

    render()
    {
        return(
            <section id={"weatherCard"}>
                <div style={{"textAlign" : "center"}}>
                    <input className={"search"}  type={"text"} onChange={this.captureQuery}/>
                    <input className={"search"} type={"button"} value={"Search"} onClick={this.search}/>
                </div>
                <div id={"location"} style={{"display":"flex","flexDirection" : "row"}}>
                    <img className={"forecastImage"} alt={"..."} src={loc}/>
                    <h3 id={"city"}>Now in {this.state.city}</h3>
                    <select id={"daySelect"} onChange={this.daySelect}>
                        <option  value={"Monday"}>Monday</option>
                        <option value={"Tuesday"}>Tuesday</option>
                        <option value={"Wednesday"}>Wednesday</option>
                        <option value={"Thursday"}>Thursday</option>
                        <option value={"Friday"}>Friday</option>
                        <option value={"Saturday"}>Saturday</option>
                        <option value={"Sunday"}>Sunday</option>
                    </select>
                </div>
                <section id={"current"}>
                    <div>
                        <img id={"mainImage"} alt={"..."} src={this.state.image}/>
                        <h1>{this.state.temperature}<sup>o</sup>C</h1>
                        <h2>{this.state.description}</h2>
                    </div>
                    <div>
                        <div style={{"display":"flex","flexDirection" : "row"}}>
                            <img className={"forecastImage"} alt={"..."} src={realFeel}/>
                            <h1> RealFeel {this.state.realFeel}<sup>o</sup>C</h1>
                        </div>
                        <div style={{"display":"flex","flexDirection" : "row"}}>
                            <img className={"forecastImage"} alt={"..."} src={temp}/>
                            <h1>{this.state.max}<sup>o</sup>c / {this.state.min}<sup>o</sup>c</h1>
                        </div>
                        <div style={{"display":"flex","flexDirection" : "row","fontSize":"20px"}}>
                            <img className={"forecastImage"} alt={"..."} src={wind}/>
                            <h1 style={{"paddingTop" : "8px"}}>{this.state.wind} m/s</h1>
                        </div>
                    </div>
                    <div>
                        <div style={{"display":"flex","flexDirection" : "row","fontSize":"20px"}}>
                            <img className={"forecastImage"} alt={"..."} src={pressure}/>
                            <h1>{this.state.pressure} Pa</h1>
                        </div>
                        <div style={{"display":"flex","flexDirection" : "row","fontSize":"20px"}}>
                            <img className={"forecastImage"} alt={"..."} src={humidity}/>
                            <h1>{this.state.humidity} Kg/m<sup>3</sup></h1>
                        </div>
                    </div>
                </section>
                <section style={{"textAlign" : "center","paddingTop" : "15px"}}>
                    <h1>{this.props.day||this.state.days[new Date().getDay()]}'s Forecast</h1>
                </section>
                <section id={"forecast"}>
                    {
                        this.state.forecastData.map((each) =>
                        {
                            let forecastImage =null;
                            switch(each.weather[0].main)
                            {
                                case "Clouds": case "Mist" : forecastImage = cloud;break;
                                case "Rain": case "Drizzle": forecastImage = rain;break;
                                case "Clear" : forecastImage = sunny;break;
                                case "Haze" : case "Foggy":case "Fog": forecastImage = fog;break;
                            }
                            return(<PredictedWeather image={forecastImage} time={each.dt_txt.split(" ")[1]} temp={each.main.temp} key={each.dt_txt.split(" ")[1]}/>)
                        })
                    }
                </section>
            </section>
        )
    }
}

const PredictedWeather = ({image,time,temp}) =>
{
    return(
        <section id={"forecastCard"}>
            <img alt={"..."} className={"forecastImage"} src={image}/>
            <h4>{temp}<sup>o</sup>C</h4>
            <h6>{time}</h6>
        </section>
    )
}

export {Weather,day}
