import fetch from 'node-fetch'

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let data = [];
const response = await fetch("http://localhost:8000/forecast");
const jsonData = await response.json();
data = jsonData.list;

// function parse(data,day)
// {
//     let forecast = [];
//     data.map(each =>
//     {
//         let date = new Date();
//         date.setDate(each.dt_txt.split(" ")[0].split("-")[2])
//         if(date.getDay() === days.indexOf(day))
//         {
//             forecast.push(each);
//         }
//     })
//     return forecast;
// }

console.log(parse(data,"Sunday"));