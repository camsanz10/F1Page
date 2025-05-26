document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const driverId = params.get("id");

    const pilotName = document.getElementById("pilot-name");
    const pilotNationality = document.getElementById("pilot-nationality");
    const pilotBio = document.getElementById("pilot-bio");
    const pilotDob = document.getElementById("pilot-dob");
    const pilotWiki = document.getElementById("pilot-wiki");
    const pilotImg = document.getElementById("pilot-img");

    const imagenesPilotos = {
        "albon": "albon.png",
        "alonso": "alonso.png",
        "bearman": "bearman.png",
        "bottas": "bottas.png",
        "gasly": "gasly.png",
        "hamilton": "hamilton.png",
        "hulkenberg": "hulkenberg.png",
        "leclerc": "leclerc.png",
        "lawson": "lawson.png",
        "magnussen": "magnussen.png",
        "norris": "norris.png",
        "ocon": "ocon.png",
        "perez": "perez.png",
        "piastri": "piastri.png",
        "ricciardo": "ricciardo.png",
        "russell": "russell.png",
        "sainz": "sainz.png",
        "sargeant": "sargeant.png",
        "stroll": "stroll.png",
        "tsunoda": "tsunoda.png",
        "verstappen": "verstappen.png",
        "zhou": "zhou.png"
    };

    fetch(`https://ergast.com/api/f1/2024/drivers/${driverId}.json`)
        .then(response => response.json())
        .then(data => {
            const driver = data.MRData.DriverTable.Drivers[0];

            pilotName.textContent = `${driver.givenName} ${driver.familyName}`;
            pilotNationality.textContent = `Nacionalidad: ${driver.nationality}`;
            pilotBio.textContent = `ID del piloto: ${driver.driverId}`;
            pilotDob.textContent = `Fecha de nacimiento: ${driver.dateOfBirth}`;
            pilotWiki.innerHTML = `📚 <a href="${driver.url}" target="_blank">Ver en Wikipedia</a>`;
            pilotImg.src = `../img/${imagenesPilotos[driver.driverId] || 'default.png'}`;
            pilotImg.alt = `${driver.givenName} ${driver.familyName}`;
        })
        .catch(error => {
            console.error("Error al cargar los datos del piloto:", error);
        });
});