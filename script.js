const getForecast = document.querySelector("#get-forecast");
const info_display = document.getElementById("get-information"); 
const selectCity = document.querySelector("#drop");
const image = document.getElementById("weather-icon");
const update_city =document.getElementById("weather-main") ;
const humidity =   document.getElementById("humidity");
const wind_speed = document.getElementById("wind");
const wind_gust =  document.getElementById("wind-gust");
const pressure =   document.getElementById("pressure");
const feels_like = document.getElementById("feels-like");
const temperature = document.getElementById("main-temperature");
const slist = document.getElementById('suggestionList');

// selectCity.addEventListener("input", ()=>{

// const query = selectCity.value;
// clearTimeout(debounceTimer);
// debounceTimer = setTimeout(()=>{
// getSuggestionCity(query);
// },1000)

// })

// function getSuggestionCity(query){
//   const apiKey = "8bc16afc26f84edeba892e55cef52823";
//   fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${apiKey}`) 
//   .then((response)=>{
//     return response.json();
//   })
//   .then((data)=>{
//     console.log(data);
    
//   })
//   .catch(err){
//     console.log("error in suggesting city",err);
//   }
// }


async function showWeather(city){
  try{
    const data = await getWeather(city);

    update_city.innerText = city;
    image.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    temperature.innerText  = (data?.main?.temp === undefined || data?.main?.temp === null) ? "N/A" : `${data.main.temp}°C`;

    feels_like.innerText   = (data?.main?.feels_like === undefined ) ? "N/A" : `Feels like:   ${data.main.feels_like}°C`;
    
    humidity.innerText     = (data?.main?.humidity === undefined ) ? "N/A" : `${data.main.humidity}%`;
    
    wind_speed.innerText   = (data?.wind?.speed === undefined ) ? "N/A" : `${data.wind.speed} km/h`;
    
    wind_gust.innerText    = (data?.wind?.gust === undefined ) ? "N/A" : `${data.wind.gust} km/h`;
    
    pressure.innerText     = (data?.main?.pressure === undefined ) ? "N/A" : `${data.main.pressure} hPa`;



  }
  catch(err){
    console.log("Error in showWeather function");
  }
}

async function getWeather(city){
  const key ="8bc16afc26f84edeba892e55cef52823" ;

  try{
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

  if(!response.ok){
    throw new Error("response not okay!");
  }
  const data = await response.json();
  return data;

  }
  catch(err){
    alert("Oops! Please enter a valid city or country name.");
    console.log(err);
  }
}

// getWeather("ahmedabad")

getForecast.addEventListener("click",()=>{
  showWeather(selectCity.value);
});