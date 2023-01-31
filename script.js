//chrome-v8

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async position =>{
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(" lat: "+ lat + " long: "+ long);
        //making an ajax call to the free api - asynchronous call
        /*const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
 
        let response = await fetch(api);
        let data = await response.json();

        //to make our code look like synchronous call we use async keyword

        console.log(data);*/

        const data = await getWeatherData(lat,long);
        renderWeatherData(data);

        var map = L.map('map').setView([20.9716, 80.5946], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = L.marker([lat,long]).addTo(map);
        marker.bindPopup(data.name).openPopup();

        map.on('click', async function(e){
            console.log("Lat: "+ e.latlng.lat + "Long: "+e.latlng.lng);
            const data1 = await getWeatherData(e.latlng.lat,e.latlng.lng);
            renderWeatherData(data1);
        })
        

        })
    }
}

async function getWeatherData(lat,long){
    //making an ajax call to the free api - asynchronous call
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
 
    let response = await fetch(api);
    let data = await response.json();

    //to make our code look like synchronous call we use async keyword

    console.log(data);
    return data;
}

function renderWeatherData(data){
    document.getElementById("name").innerHTML = "city: "+ data.name;
    document.getElementById("humidity").innerHTML = "humidity: "+data.main.humidity;
    document.getElementById("temp_min").innerHTML = "minimum temperature: "+data.main.temp_min;
    document.getElementById("temp_max").innerHTML = "maximum temperature: "+data.main.temp_max;
    document.getElementById("pressure").innerHTML = "pressure: "+data.main.pressure;
}

/*const myCallBack = () => {
    console.log("I am sleeping");
}
setTimeout(myCallBack, 1000);

function HOF(){
    return function(a,b){
        return a+b;
    }
}*/


getLocation();

