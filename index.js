function findDriver() {
    const season = document.getElementById('season').value;
    const circuit = document.getElementById('circuit').value;
    const constructor = document.getElementById('constructor').value;
    const driver = document.getElementById('driver').value;
    const apiUrl = `https://ergast.com/api/f1/${season}/${circuit}/${constructor}/${driver}`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const driverFinder = `
            <h2>Results</h2>
            <p>Season: ${data.season}</p>
            <p>Circuit: ${data.circuit}</p>
            <p>Constructor: ${data.constructor}</p>
            <p>Grid: ${data.grid}</p>
            <p>Result: ${data.result}</p>
        `;
        document.getElementById('driverData').innerHTML = driverFinder;
        })
        .catch(error => {
            console.error('Error fetching driver information:', error)
            alert('Failed to load driver data. Please try again.')
        })
}
function populateDropdown(selectElement, options) {
    selectElement.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.season;
        optionElement.textContent = option.season;
        selectElement.appendChild(optionElement);
    });
}

function loadSeason() {
    const seasonUrl = `https://ergast.com/api/f1/seasons.json?limit=100&offset=0`;
    fetch(seasonUrl)
        .then(response => response.json())
        .then(data => {
            const selectSeason = document.getElementById('season');
            populateDropdown(selectSeason, data.MRData.SeasonTable.Seasons);
        })
        .catch(error => {
            console.error('Error fetching seasons:', error);
            alert('Failed to fetch seasons. Please try again.');
        });
}

function loadCircuit() {
    const circuit = document.getElementById('circuit').value;
    const circuitUrl = `https://ergast.com/api/f1/circuits/${circuit}`;
    fetch(circuitUrl)
        .then(response => response.json())
        .then(data => {
            const selectCircuit = document.getElementById('circuit');
            populateDropdown(selectCircuit, data.MRData.CircuitTable.Circuits);
        })
        .catch(error => {
            console.error('Error fetching circuits:', error);
            alert('Failed to fetch circuits. Please try again.');
        });
}

function loadConstructor() {
    const constructor = document.getElementById('constructor').value;
    const constructorUrl = `https://ergast.com/api/f1/constructors/${constructor}`;
    fetch(constructorUrl)
        .then(response => response.json())
        .then(data => {
            const selectConstructor = document.getElementById('constructor');
            populateDropdown(selectConstructor, data.MRData.ConstructorTable.Constructors);
        })
        .catch(error => {
            console.error('Error fetching constructor:', error);
            alert('Failed to fetch constructor. Please try again.');
        });
}

function loadDriver() {
    const driver = document.getElementById('driver').value;
    const driverUrl = `https://ergast.com/api/f1/drivers/${driver}`;
    fetch(driverUrl)
        .then(response => response.json())
        .then(data => {
            const selectDriver = document.getElementById('driver');
            populateDropdown(selectDriver, data.MRData.DriverTable.Drivers);
        })
        .catch(error => {
            console.error('Error fetching driver:', error);
            alert('Failed to fetch driver. Please try again.');
        });
}
document.addEventListener('DOMContentLoaded', () => {
    loadSeason();
});
document.getElementById('season').addEventListener('change', () => {
    loadSeason();
})
document.getElementById('circuit').addEventListener('change', () => {
    loadConstructor();
})
document.getElementById('constructor').addEventListener('change', () => {
    loadDriver();
})