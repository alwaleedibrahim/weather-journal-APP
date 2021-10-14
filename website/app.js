
/* Global Variables */

// OpenWeatherMap API key
const apiKey = 'f25bd4111fdec5a8948fc32befe9c7d8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const loadProjectData = async () => {
    const getData = await (await fetch("/getData")).json();
    for (let prop in getData) {
        const x = document.querySelector(`#${prop}`);
        x.innerHTML = `<b>${prop}: </b>${getData[prop]}`;
    }
}

const addData = async (data) => {
    await fetch("/addData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// add event listener to generate button
// query selector
document.querySelector('#generate').addEventListener('click', async () => {
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector('#feelings').value;
    const units = document.querySelector('#units').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=${units}`;
    const response = await (await fetch(url)).json();
    const temp = response.main.temp;
    const data = {
        date: newDate,
        temp: temp,
        content: feelings,
        name: response.name
    }
    addData(data);
    loadProjectData();
});

document.addEventListener('DOMContentLoaded', loadProjectData);