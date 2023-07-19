let allVelibData = [];
let api_url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=10&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes';
fetch(api_url)
    .then(response => response.json())
    .then(data => {
        allVelibData = data.records;
        searchVelibStation("");
    })
    .catch(error => {
        console.log(error);
    });

const showVelibStation = (element, name, mechanicals, ebike) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <h2>Station : ${name}</h2>
        <p>${mechanicals} - velibs classiques.</p>
        <p>${ebike} - velibs electriques</p>
    `;
    element.appendChild(listItem);
};

const searchVelibStation = (city) => {
    const velibList = document.getElementById('velibList');
    velibList.innerHTML = '';

    if (city) {
        const filteredStation = allVelibData.filter(station => {
            const name = station.fields.name.toLowerCase();
            return name.includes(city.toLowerCase());
        });

        filteredStation.forEach(station => {
            const name = station.fields.name.toLowerCase();
            const mechanicals = station.fields.numbikesavailable;
            const ebike = station.fields.numebikesavailable;
            showVelibStation(velibList, name, mechanicals, ebike);
        });
    } 
    else {
        allVelibData.forEach(station => {
            const name = station.fields.name.toLowerCase();
            const mechanicals = station.fields.numbikesavailable;
            const ebike = station.fields.numebikesavailable;
            showVelibStation(velibList, name, mechanicals, ebike);
        });
    }
};

const searchVelib = () => {
    const searchInput = document.getElementById("search");
    const city = searchInput.value.trim();
    // console.log("City :", city);
    searchVelibStation(city);
}

document.getElementById('btn').addEventListener('click', searchVelib);
setInterval(() => searchVelibStation(""), 60000);