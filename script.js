const urlFlags = 'https://countriesnow.space/api/v0.1/countries/flag/images';

async function fetchFlags() {
    const flagsDiv = document.getElementById("flagsData");
    if (flagsDiv.style.display === "none" || flagsDiv.style.display === "") {
        flagsDiv.style.display = "block";
        try {
            const response = await fetch(urlFlags);
            const data = await response.json();

            flagsDiv.innerHTML = ""; // Clear previous data

            if (response.status === 200 && data && data.data) {
                data.data.forEach(function(country) {
                    const countryDiv = document.createElement("div");
                    const img = document.createElement("img");
                    img.src = country.flag;
                    img.alt = country.name + " Flag";
                    img.style.width = "50px";
                    img.style.height = "30px";
                    countryDiv.appendChild(document.createTextNode(country.name + ": "));
                    countryDiv.appendChild(img);
                    flagsDiv.appendChild(countryDiv);
                });
            } else {
                console.log("Server Error", data.error ? data.error.message : "Unknown error");
                flagsDiv.textContent = "No data available.";
            }
        } catch (error) {
            console.log("Fetch Error", error);
        }
    } else {
        flagsDiv.style.display = "none";
    }
}

// Fetch Population Data
function fetchPopulation() {
    const populationDiv = document.getElementById("populationData");
    if (populationDiv.style.display === "none" || populationDiv.style.display === "") {
        populationDiv.style.display = "block";
        fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                populationDiv.innerHTML = ""; // Clear previous data

                if (data && data.data) {
                    let seenCountries = new Set();
                    data.data.forEach(function(country) {
                        if (!seenCountries.has(country.country)) {
                            var countryDiv = document.createElement("div");
                            countryDiv.textContent = country.country + " - Population: " + country.populationCounts[0].value;
                            populationDiv.appendChild(countryDiv);
                            seenCountries.add(country.country);
                        }
                    });
                } else {
                    populationDiv.textContent = "No data available.";
                }
            })
            .catch(function(error) {
                console.error("Error fetching population data:", error);
            });
    } else {
        populationDiv.style.display = "none";
    }
}

// Fetch Capitals Data
function fetchCapitals() {
    const capitalsDiv = document.getElementById("capitalsData");
    if (capitalsDiv.style.display === "none" || capitalsDiv.style.display === "") {
        capitalsDiv.style.display = "block";
        fetch("https://countriesnow.space/api/v0.1/countries/capital")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                capitalsDiv.innerHTML = ""; // Clear previous data

                if (data && data.data) {
                    data.data.forEach(function(country) {
                        var countryDiv = document.createElement("div");
                        countryDiv.textContent = country.name + " - Capital: " + country.capital;
                        capitalsDiv.appendChild(countryDiv);
                    });
                } else {
                    capitalsDiv.textContent = "No data available.";
                }
            })
            .catch(function(error) {
                console.error("Error fetching capitals data:", error);
            });
    } else {
        capitalsDiv.style.display = "none";
    }
}

// Event Listeners
document.getElementById("fetchPopulationBtn").addEventListener("click", fetchPopulation);
document.getElementById("fetchCapitalsBtn").addEventListener("click", fetchCapitals);
document.getElementById("fetchFlagsBtn").addEventListener("click", fetchFlags);