// Champ contenant la localisation : <h1>Paris</h1>
const CITYFIELD = document.querySelector("#city");

// Champ contenant la température : <span>10</span>
const FIELD = document.querySelector("#temp");

// API KEY
const KEY = "5068edde6b0e29a47729a28d62d89e3a";

async function main(useIP = true) {

    let LOCATION;

    if (useIP) {
        // Contient l'adresse IP de l'utilisateur
        const IP = await fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => data["ip"])

        // Charge dans la variable LOCALISATION la localisation de l'utilisateur
        LOCATION = await fetch(`http://ip-api.com/json/${IP}`)
            .then(response => response.json())
            .then(data => data["city"])
    } else {
        // Charge dans la variable LOCALISATION la localisation entrée par l'utilisateur
        LOCATION = CITYFIELD.textContent;
    }

    // Charge dans la variable TEMP la temperature correspondant à la ville (variable LOCATION)
    const TEMP = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ LOCATION }&appid=${ KEY }&units=metric`)
        .then(response => response.json())
        .then(data => Math.round(data["main"]["temp"]))

    FIELD.textContent = TEMP;
}

main()

// Permet à l'utilisateur de modifier le contenu de la balise <h1></h1>
CITYFIELD.contentEditable = true;

CITYFIELD.addEventListener("keydown", (event) => {
    if (event.keyCode != 13) return;

    // Pas de saut à la ligne
    event.preventDefault();

    main(false);
})