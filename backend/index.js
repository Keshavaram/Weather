import fetch from "node-fetch";
import express from 'express';

const app = express();
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Bangalore,India&APPID=b3953cb630387448bb322281abc1fbe2&units=metric"
const currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=Bangalore,India&APPID=b3953cb630387448bb322281abc1fbe2&units=metric"

let fore = [];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function parse(data,day)
{
    let forecast = [];
    data.map(each =>
    {
        let date = new Date();
        date.setDate(each.dt_txt.split(" ")[0].split("-")[2])
        if(date.getDay() === days.indexOf(day))
        {
            forecast.push(each);
        }
    })
    return forecast;
}

app.get('/forecast/:day',(req,res) =>
{
    let day = ""
    for (let i = 1;i < req.params.day.length;i++)
    {
        day += req.params.day[i];
    }
    res.set('Access-Control-Allow-Origin', '*');
    fetch(forecastUrl,{method : "GET"})
        .then((res) => res.json())
        .then(data => {
            fore = data.list
            res.send(parse(fore,day));
        })
        .catch(() => {
            res.send({"content" : "not found"})
        });
});

app.get('/current',(req,res) =>
{
    res.set('Access-Control-Allow-Origin', '*');
    fetch(currentUrl,{method : "GET"})
        .then((res) => res.json())
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.send({"content" : "not found"})
        });
});

app.listen(8000);

