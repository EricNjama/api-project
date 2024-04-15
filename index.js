function findDriver() {
    const season = document.getElementById('season').value;
    const circuit = document.getElementById('circuit').value;
    const constructor = document.getElementById('constructor').value;
    const driver = document.getElementById('driver').value;
    const apiUrl = `http://ergast.com/api/f1/${season}/${circuit}/${constructor}/${driver}`

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
function populateSeasonDropdown() {
    const seasonDropdown = document.getElementById('season');
    fetch('http://ergast.com/api/f1/seasons.json?limit=100&offset=0')
        .then(response => response.json())
        .then(data => {
            data.MRData.SeasonTable.Seasons.forEach(season => {
                const option = document.createElement('option');
                option.value = season.season;
                option.textContent = season.season;
                seasonDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching seasons:', error);
            alert('Failed to load seasons. Please try again.');
        });
}
