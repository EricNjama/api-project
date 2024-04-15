// Function to handle errors from API calls
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Function to fetch data from an API endpoint and populate a dropdown
function fetchAndDropdown(url, selectElement) {
    fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
            selectElement.innerHTML = ''; // Clear existing options
            data.MRData.SeasonTable.Seasons.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.season;
                optionElement.textContent = option.season;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
}

// Function to initialize the dropdown for seasons
function loadSeason() {
    const seasonUrl = `https://ergast.com/api/f1/seasons.json?limit=100&offset=0`;
    const selectSeason = document.getElementById('season');
    fetchDataAndPopulateDropdown(seasonUrl, selectSeason);
}

// Function to load constructors based on selected circuit
function loadConstructor() {
    const circuit = document.getElementById('circuit').value;
    const constructorUrl = `https://ergast.com/api/f1/constructors.json?circuit=${circuit}`;
    const selectConstructor = document.getElementById('constructor');
    fetchDataAndPopulateDropdown(constructorUrl, selectConstructor);
}

// Function to load drivers based on selected constructor
function loadDriver() {
    const constructor = document.getElementById('constructor').value;
    const driverUrl = `https://ergast.com/api/f1/drivers.json?constructor=${constructor}`;
    const selectDriver = document.getElementById('driver');
    fetchDataAndPopulateDropdown(driverUrl, selectDriver);
}

// Function to handle the search for drivers
function findDriver() {
    const season = document.getElementById('season').value;
    const circuit = document.getElementById('circuit').value;
    const constructor = document.getElementById('constructor').value;
    const driver = document.getElementById('driver').value;
    const apiUrl = `https://ergast.com/api/f1/${season}/${circuit}/${constructor}/${driver}`;

    fetch(apiUrl)
        .then(handleErrors)
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
            console.error('Error fetching driver information:', error);
            alert('Failed to load driver data. Please try again.');
        });
}

// Event listener to load seasons when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadSeason);

// Event listeners for dropdown changes
document.getElementById('circuit').addEventListener('change', loadConstructor);
document.getElementById('constructor').addEventListener('change', loadDriver);
document.getElementById('searchButton').addEventListener('click', findDriver);
