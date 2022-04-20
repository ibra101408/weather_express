const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

const key = 'e187a92b0f0e7b0d085b55e9fbd90abd';
let city = 'Tartu';

app.get('/', function (req,res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            //console.log(data);
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            /*console.log(description);
            console.log(city);
            console.log(temp);
            console.log("QWERT");*/

    res.render('index', {
        description: description,
        city: city,
        temp: temp
        })
    })
})

app.post('/', function(req, res){
    console.log(req.body)
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            console.log(description);
            console.log(city);
            console.log(temp);

            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

  app.listen(3000)
/*
})
})
})
app.post('/', function (res, req){
let city = req.body.cityname
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
.then((response) => {
  return response.json()
})
.then((date) => {
  let description = data.weather[0].description
  let city = data.name
  let temp = Math.round(parseFloat(data.main.temp)-273.15)
  console.log(description);
  console.log(city);
  console.log(temp);
  console.log("pppppppppppppppp");

  res.render('index', {
      description: description,
      city: city,
      temp: temp
  })
})
})
app.listen(3000);
*/