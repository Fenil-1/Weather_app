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



async function showWeather(city){
  try{
    const data = await getWeather(city);


    update_city.innerText = city;
    image.setAttribute("src",data.weather[0].icon);
    temperature.innerText  = (data?.main?.temp === undefined || data?.main?.temp === null) ? "N/A" : `${data.main.temp}°C`;

    feels_like.innerText   = (data?.main?.feels_like === undefined ) ? "N/A" : `${data.main.feels_like}°C`;
    
    humidity.innerText     = (data?.main?.humidity === undefined ) ? "N/A" : `${data.main.humidity}%`;
    
    wind_speed.innerText   = (data?.wind?.speed === undefined ) ? "N/A" : `${data.wind.speed} km/h`;
    
    wind_gust.innerText    = (data?.wind?.gust === undefined ) ? "N/A" : `${data.wind.gust} km/h`;
    
    pressure.innerText     = (data?.main?.pressure === undefined ) ? "N/A" : `${data.main.pressure} hPa`;



  }
  catch(err){
    alert("Error in showWeather Function",err);
  }
}

async function getWeather(city){
  try{
  const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);

  if(!response.ok){
    throw new Error("response not okay!");
  }
  const data = await response.json();
  return data;
  }
  catch(err){
    alert("Something went wrong, please try again later");
    console.log(err);
  }
}


getForecast.addEventListener("click",()=>{
  showWeather(selectCity.value);
});
