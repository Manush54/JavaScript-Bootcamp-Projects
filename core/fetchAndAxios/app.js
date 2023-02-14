/* XML Request */

// const firstReq = new XMLHttpRequest();

// firstReq.open('GET', 'https://swapi.dev/api/planets/');
// firstReq.send();
// console.log('Request Sent!');

// firstReq.addEventListener('load', function() {
// 	console.log('FIRST REQUEST WORKED!!!');

// 	const data = JSON.parse(this.responseText);
// 	const filmURL = data.results[0].films[0];
// 	const filmReq = new XMLHttpRequest();

// 	filmReq.addEventListener('load', function() {
// 		console.log('SECOND REQUEST WORKED!!!');
// 		const filmData = JSON.parse(this.responseText);
// 		console.log(filmData);
// 	});

// 	filmReq.addEventListener('error', function(e) {
// 		console.log('ERROR!!', e);
// 	});

// 	filmReq.open('GET', filmURL);
// 	filmReq.send();
// });

// firstReq.addEventListener('error', (e) => {
// 	console.log('ERROR!!!!!!');
// });

/* FETCH */

// fetch('https://swapi.dev/api/planets/')
// 	.then((response) => {
// 		if (!response.ok)
// 			throw new Error(`Status Code Error: ${response.status}`);
// 		console.log(response)
		
// 		return response.json()
// 	})
// 	.then((data) => {
// 		console.log('FETCHED ALL PLANETS (first 10)')
// 		const filmURL = data.results[0].films[0];
// 		return fetch(filmURL)
// 	})
// 	.then((response) => {
// 		if (!response.ok)
// 		throw new Error(`Status Code Error: ${response.status}`);
// 		console.log(response)
		
// 		return response.json()
// 	})
// 	.then((data) => {
// 		console.log('FETCHED FIRST FILM, based off of first planet')
// 		console.log(data.title)
// 	})
// 	.catch((err) => {
// 		console.log('SOMETHING WENT WRONG WITH FETCH!');
// 		console.log(err);
// 	});

// axios
// 	.get('https://swapi.dev/api/planets/')
// 	.then((res) => {
// 		//We don't have to parse the JSON!
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('IN CATCH CALLBACK!!!');
// 		console.log(err);
// 	});

// axios
// 	.get('https://swapi.co/api/planetaslkjdaklsjds/') //BAD URL!
// 	.then((res) => {
// 		//We don't need to check for a 200 status code, because...
// 		//Axios will reject the promise for us, unlike fetch!
// 		console.log(res.data);
// 	})
// 	.catch((err) => {
// 		//In this example with a not-found URL, this callback will run...
// 		console.log('IN CATCH CALLBACK!!!');
// 		console.log(err);
// 	});

	// Multiple Requests with Axios

	// const fetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
	// 	return axios.get(url)
	// }

	// const printNextPlanets = ({data}) => {
	// 	console.log(data)
	// 	for(let planet of data.results){
	// 		console.log(planet.name)
	// 	}
	// 	return Promise.resolve(data.next)
	// }

	// fetchNextPlanets()
	// .then(printNextPlanets)
	// .then(fetchNextPlanets)
	// .then(printNextPlanets)
	// .catch((err) => {
	// 	console.log(err)
	// })