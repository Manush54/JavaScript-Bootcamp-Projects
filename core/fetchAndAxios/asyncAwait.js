// Normal Function
// function add(x,y) {
//     return x+y;
// }

// Async Function
// Returns a Promise
// if function returns a value successfully then resolves the promise
// if function runs into an exception then rejects the promise.

async function add(x,y) {
    if(typeof x !== 'number' || typeof y !== 'number') {
        throw 'X and Y must be a number'
    }
    return x+y;
}

// Equivalent non-async function...
function add(x,y) {
    return new Promise((resolve, reject) => {
        if(typeof x !== 'number' || typeof y !== 'number') {
            reject('X and Y must be a number')
        }
        else {
            resolve(x+y)
        }
    })
}

add(6,'7') // Will not work
add(6,7)
.then((val) => {
    console.log('PROMISE RESOLVED WITH: ', val)
})
.catch((err) => {
    console.log('PROMISE REJECTED WITH: ', err)
})

// /* 
// AWAIT

// Long Code
// function getPlanets() {
//     return axios.get('https://swapi.dev/api/planets/')
// }

// getPlanets()
// .then((res) => {
//     console.log(res.data)
// })

// Shorter code.. without use of then
async function getPlanets() {
    const res = await axios.get('https://swapi.dev/api/planets/')
    console.log(res.data)
}

// For handling async-await errors
getPlanets().catch((err) => {
    console.log("INSIDE CATCH!!!")
    console.log(err)
})

// */

// SEQUENTIAL REQUESTS USING ASYNC AWAIT

async function get3Pokemon() {
    const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
	const poke2 = await axios.get("https://pokeapi.co/api/v2/pokemon/2");
	const poke3 = await axios.get("https://pokeapi.co/api/v2/pokemon/3");
	console.log(poke1.data.name);
	console.log(poke2.data.name);
	console.log(poke3.data.name);
}

// SEND REQUESTS AT THE SAME TIME
async function get3Pokemon() {
	const prom1 = axios.get("https://pokeapi.co/api/v2/pokemon/1");
	const prom2 = axios.get("https://pokeapi.co/api/v2/pokemon/2");
	const prom3 = axios.get("https://pokeapi.co/api/v2/pokemon/3");
	
    const poke1 = await prom1;
	const poke2 = await prom2;
	const poke3 = await prom3;
	
    console.log(poke1.data.name);
	console.log(poke2.data.name);
	console.log(poke3.data.name);
}
get3Pokemon().catch((err) => {
	console.log("Error Occured");
	console.log(err);
});
