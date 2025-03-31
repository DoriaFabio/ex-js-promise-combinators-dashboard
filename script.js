async function fetchJson(url) { 
    const res = await fetch(url);
    const obj = await res.json();
    return obj;
} 

const getDashboardData = async query => {
    try {
        const desPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const wetPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const airPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);
        const promises = [desPromise, wetPromise, airPromise]; //? Creo l'array delle promesse
        const [destination, weather, airport] = await Promise.all(promises); //? Destrutturazione
        // const travel = await Promise.all(promises); //? Senza destrutturazione
        console.log();
        return {
            //todo Ritorno i valori senza destrutturazione
            // city: travel[0][0].name,
            // country: travel[0][0].country,
            // temperature: travel[1][0].temperature,
            // weather: travel[1][0].weather_description,
            // airport: travel[2][0].name
            //todo Ritorno i valori con destrutturazione
            city: destination[0].name,
            country: destination[0].country,
            temperature: weather[0].temperature,
            weather: weather[0].weather_description,
            airport: airport[0].name
        }
    } catch(err) {
        throw new Error(`Errore nel recupero dei dati ${err.message}`);
    }
    
}

getDashboardData("london")
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));