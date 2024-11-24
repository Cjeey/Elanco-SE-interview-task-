const urls = {
    flags: 'https://countriesnow.space/api/v0.1/countries/flag/images',
    population: 'https://countriesnow.space/api/v0.1/countries/population/cities',
    capitals: 'https://countriesnow.space/api/v0.1/countries/capital'
};

// General function to fetch and display data
async function fetchData(url, divId, dataProcessor) {
    const div = document.getElementById(divId);
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
        return; // Exit if the section is hidden
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        div.innerHTML = ""; // Clear previous data

        if (response.ok && data && data.data) {
            dataProcessor(data.data, div); // Use the processor function to render data
        } else {
            div.textContent = "No data available.";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        div.textContent = "Error fetching data.";
    }
}

// Process and display flags
function processFlags(data, div) {
    data.forEach(country => {
        const countryDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = country.flag;
        img.alt = `${country.name} Flag`;
        img.style.width = "50px";
        img.style.height = "30px";
        countryDiv.textContent = `${country.name}: `;
        countryDiv.appendChild(img);
        div.appendChild(countryDiv);
    });
}

// Process and display population
function processPopulation(data, div) {
    const seenCountries = new Set();
    data.forEach(country => {
        if (!seenCountries.has(country.country)) {
            const countryDiv = document.createElement("div");
            countryDiv.textContent = `${country.country} - Population: ${country.populationCounts[0].value}`;
            div.appendChild(countryDiv);
            seenCountries.add(country.country);
        }
    });
}

// Process and display capitals
function processCapitals(data, div) {
    data.forEach(country => {
        const countryDiv = document.createElement("div");
        countryDiv.textContent = `${country.name} - Capital: ${country.capital}`;
        div.appendChild(countryDiv);
    });
}

// Event Listeners for buttons
document.getElementById("fetchPopulationBtn").addEventListener("click", () => fetchData(urls.population, "populationData", processPopulation));
document.getElementById("fetchCapitalsBtn").addEventListener("click", () => fetchData(urls.capitals, "capitalsData", processCapitals));
document.getElementById("fetchFlagsBtn").addEventListener("click", () => fetchData(urls.flags, "flagsData", processFlags));