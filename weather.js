const API_ID = '794556aeef96f051489fe4771ab39730';
const URL1 = `https://api.openweathermap.org/data/2.5/weather?q=`;
const URL2 = `&appid=${API_ID}`;

const buttonElement = document.querySelector('.search-btn');
const inputElement = document.querySelector('.inputvalue');
const weatherbody = document.querySelector('.weatherbody');
let searchQuery = '';


// on clicking the button of search

// getting the data of the particular city 
buttonElement.onclick = function (event) {

    event.preventDefault();
    searchQuery = inputElement.value;
    const newurl = URL1 + searchQuery + URL2 + '&units=metric';
    // fetchging the data
    fetch(newurl).then((api_data) => {
        return api_data.json();
    })
        .then((actual_data) => {
            console.log(actual_data);
            showWeatherReport(actual_data);
        })
        .catch((error) => {
            console.log(`Error is :- ${error}`);
        })

    inputElement.value = '';
}


// showing the weatehr report
function showWeatherReport(results){

    let city = document.getElementById('city');
    city.innerHTML  = `${results.name} , ${results.sys.country}`;

    let temprature = document.getElementById('temp');
    temprature.innerHTML = `${results.main.temp}&deg;C`;

    let cli = document.getElementById('climate');
    cli.innerHTML = `${results.weather[0].main}`;

    let minmax = document.getElementById('minmax');
    minmax.innerHTML = 
    `Minimum :- ${Math.floor(results.main.temp_min)}&deg;C<br> 
     Maximum :- ${Math.ceil(results.main.temp_max)}&deg;C`;

    let date = document.getElementById('date');
    let todaydate = new Date();
    date.innerHTML = dateManage(todaydate);

    if(cli.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/bgsunny.jpg')";
    }
    else if(cli.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/bgcloudy.jpg')";
    }
    else if(cli.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/bghaze.jpg')";
    }
    else if(cli.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/bgrainy.jpg')";
    }
    else if(clo.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/bgthunder.jpg')";
    }
}

// date managment

function dateManage(date){
    let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
    let months = ["Jnauary" , "Feburary" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];

    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let date_ = date.getDate();
    let day = days[date.getDay()];

    return `${date_} ${month} (${day}), ${year}`;
}