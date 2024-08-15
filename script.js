// maybe when this stops working refactor the code to work better with
// IP-API.com's free API. I'm not sure if it is as accurate but they limit 
// requests per minute not by total requests.

// variables
let query = "";

// GeoIPify
const key = "at_Grjj5fD01jJCTHzH0tJG5i40YlO63"; // feel free to use up all my requests

// constants
const inputEl = document.getElementById("input-el");
const ipEl = document.getElementById("ip-el");
const locationEl = document.getElementById("location-el");
const timezoneEl = document.getElementById("timezone-el");
const ispEl = document.getElementById("isp-el");

// Leaflet map setup
const map = L.map('map').setView([40.7537, -73.9992], 13);
const myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [42, 50],
    iconAnchor: [21, 50]
});
const marker = L.marker([40.7537, -73.9992], { icon: myIcon }).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// functions
async function search() {
    query = inputEl.value;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&domain=${query}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        
        ipEl.innerText = json.ip;
        locationEl.innerText = `${json.location.city}, ${json.location.country} ${json.location.postalCode}`;
        timezoneEl.innerText = json.location.timezone;
        ispEl.innerText = json.isp;
        
        map.setView([json.location.lat, json.location.lng], 13);
        marker.setLatLng([json.location.lat, json.location.lng]);

    } catch (error) {
        console.error(error.message);
    }
}

// event listeners
inputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        search()
    }
});

// main
search();