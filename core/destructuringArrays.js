const raceResults = [
    'Eliud Kipchoge',
    'Feyisa Lelisa',
    'Galen Rupp',
    'Ghirmay Ghebreslassie',
    'Alphonce Simbu',
    'Jared Ward'
  ];
  
// The old way:
// const gold = raceResults[0]
// const silver = raceResults[1]
// const bronze = raceResults[2]

// Using Destructuring:
const [gold, silver, bronze] = raceResults;
gold; //'Eliud Kipchoge'
silver; //'Feyisa Lelisa'
bronze; //'Galen Rupp'

const [first, , , fourth] = raceResults;
first; //'Eliud Kipchoge'
fourth; //'Ghirmay Ghebreslassie'

const [winner, ...others] = raceResults;
winner; //'Eliud Kipchoge'
others; //["Feyisa Lelisa", "Galen Rupp", "Ghirmay Ghebreslassie", "Alphonce Simbu", "Jared Ward"]

// destructuring Objects
const runner = {
first: "Eliud",
last: "Kipchoge",
country: "Kenya",
title: "Elder of the Order of the Golden Heart of Kenya"
}

// const {
//   first,
//   last,
//   time
// } = runner;

const {
country: nation,
title: honorific
} = runner;

const {
first : fname,
last : lname,
...other
  } = runner;
// fname = 'Eliud'
//   lname = 'Kipchoge
//  other = {country : 'Kenya', title : 'Elder of the Order of the Golden Heart of Kenya'}

console.log(other)

// Nested Destructuring !!
const results = [{
    first: "Eliud",
    last: "Kipchoge",
    country: "Kenya",
  },
  {
    first: 'Feyisa',
    last: 'Lilesa',
    country: 'Ethiopia'
  },
  {
    first: 'Galen',
    last: 'Rupp',
    country: 'United States'
  }
]
// NESTED DESTRUCTURING
const [{
  first: goldWinner
}, {
  country
}] = results;
goldWinner; //"Eliud"
country; //"Ethiopia"


// Another example
const [ ,           // Skipped object 
    { first : runnersUpFname, last : runnersUpLname, country : runnersUpCountry }
] = results;
runnersUpFname;  // Feyisa
runnersUpLname;   // Lilesa
runnersUpCountry; // Ethiopia
console.log(runnersUpCountry)


/* Destructuring in Parameters  */

// Rather than destructuring INSIDE the function body
// function print(person) {
//   const {
//     first,
//     last,
//     title
//   } = person;
//   console.log(`${first} ${last}, ${title}`)
// }

// We can unpack the values we want right in the parameter list:
function print({
    first,
    last,
    title
}) {
console.log(`${first} ${last}, ${title}`)
}

print( {
    first : 'man',
    last:  'shah', 
    extra: 'this', 
    extra:  'is',
    extra: 'ignored',
    title : 'Mr.'
})


const response = [
    'HTTP/1.1',
    '200 OK',
    'application/json',
]

// Also works with array parameters:
function parseResponse( [, statusCode, contentType]) {
console.log(`Status: ${statusCode}`)
}
parseResponse(response)
