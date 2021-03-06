
/* Global Variables */

// OpenWeatherMap API key
const apiKey = 'f25bd4111fdec5a8948fc32befe9c7d8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/'+ d.getDate()+'/'+ d.getFullYear();

// Load project data by fetching /getData route
const loadProjectData = async () => {
    const getData = await (await fetch("/getData")).json();
    try {
        // Loop over the data and dynamically add them to the page DOM structure
        for (let prop in getData) {
            const element = document.querySelector(`#${prop}`);
            element.innerHTML = `<b>${prop}: </b>${getData[prop]}`;
        }
        document.querySelector('.alert').innerHTML = "";
    }
    catch (err) {
        document.querySelector('.alert').innerHTML = "Can not load data!"
    }
}

// Add data to the server end point
const addData = async (data) => {
    await fetch("/addData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Use this to display temprature unit
const tempUnits = {
    "imperial": "Fahrenheit",
    "standard": "Kelvin",
    "metric": "Celsius"
}

// Add event listener to generate button
document.querySelector('#generate').addEventListener('click', async () => {
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector('#feelings').value;
    const units = document.querySelector('#units').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=${units}`;
    try {
        const response = await (await fetch(url)).json();
        const temp = response.main.temp;
        const data = {
            date: newDate,
            temp: temp,
            content: feelings,
            name: response.name,
            unit: tempUnits[units]
        }
        addData(data);
        loadProjectData();
    }
    catch (err) {
        document.querySelector('.alert').innerHTML = "Invalid entry!"
    }
    
});

// When page loads, display previously stored data
document.addEventListener('DOMContentLoaded', loadProjectData());