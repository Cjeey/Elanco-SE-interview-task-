// script.js

async function fetchCountryPopulation() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
        const data = await response.json();

        if (data.error) {
            console.error('Error fetching data:', data.error);
            return;
        }

        const countryPopulations = {};
        data.data.forEach(item => {
            if (countryPopulations[item.country]) {
                countryPopulations[item.country] += item.populationCounts[item.populationCounts.length - 1].value;
            } else {
                countryPopulations[item.country] = item.populationCounts[item.populationCounts.length - 1].value;
            }
        });

        const labels = Object.keys(countryPopulations);
        const populations = Object.values(countryPopulations);

        renderChart(labels, populations);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

async function fetchCountryCapitals() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/capital');
        const data = await response.json();

        if (data.error) {
            console.error('Error fetching data:', data.error);
            return;
        }

        let output = '<h3>Country Capitals</h3><ul>';
        data.data.forEach(item => {
            output += `<li>${item.name}: ${item.capital} (ISO2: ${item.iso2}, ISO3: ${item.iso3})</li>`;
        });
        output += '</ul>';

        document.getElementById('countryCapitals').innerHTML = output;
    } catch (error) {
        console.error('Failed to fetch capitals:', error);
    }
}

async function fetchCountryFlags() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const data = await response.json();

        if (data.error) {
            console.error('Error fetching data:', data.error);
            return;
        }

        let output = '<h3>Country Flags</h3><div style="display: flex; flex-wrap: wrap; gap: 10px;">';
        data.data.forEach(item => {
            output += `<div style="text-align: center;"><img src="${item.flag}" alt="${item.name} flag" style="width: 100px; height: auto;"><br>${item.name}</div>`;
        });
        output += '</div>';

        document.getElementById('countryFlags').innerHTML = output;
    } catch (error) {
        console.error('Failed to fetch flags:', error);
    }
}

function renderChart(labels, populations) {
    const ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Population by Country',
                data: populations,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}