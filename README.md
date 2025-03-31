# ex-js-promise-combinators-dashboard
https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}

# Chiamate a catena
const eseguiTask = (durata) => {
    return new Promise((res, rej) => {
        if (!durata) {
            rej("Non hai fornito una durata");
        } else {
            setTimeout(() => {
                res(`Task effettuata dopo ${durata}ms`);
            }, durata);
        }
    });
}

(async () => {
    const promise1 = eseguiTask(700);
    const promise2 = eseguiTask(1000);
    const promise3 = eseguiTask(500);
    const messaggi = await Promise.all([promise1, promise2, promise3]);
    console.log(messaggi);
})();

Se non inserisco una durata a una promise, vanno in errore tutte le promise. Posso mettere in un try/catch il codice per avere il messaggio di errore.

# getUser a catena
const getUser = async id => {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    const user = await res.json();
    return user;
}

(async () => {
    const promises = [];
    for (let id = 1; id <= 5; id++) {
        const userPromise = await getUser(id);
        promises.push(userPromise);
    }
    const users = await Promise.all(promises);
    console.log(users);
})();