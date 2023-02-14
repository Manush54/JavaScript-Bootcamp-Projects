/* Spread for function calls */
function giveMeFour(a, b, c, d) {
    console.log('a', a)
    console.log('b', b)
    console.log('c', c)
    console.log('d', d)
  }
  
const colors = ['red', 'orange', 'yellow', 'green']

// Without spread:
giveMeFour(colors);
// a ["red", "orange", "yellow", "green"]
// b undefined
// c undefined
// d undefined

// WITH SPREAD!!!
// Values are passed as separate args:
giveMeFour(...colors);
// a 'red'
// b 'orange'
// c 'yellow'
// d 'green'

//We can also spread strings!
giveMeFour(...'GOAT');
// a G
// b O
// c A
// d T

/* Spread in Array Literals */

const cephalopods = ['dumbo octopus', 'humboldt squid', 'flamboyant cuttlefish'];

const gastropods = ['giant african snail', 'banana slug', 'variable neon slug'];

const cnidaria = ['fire coral', 'moon jelly'];


const mollusca = [...cephalopods, ...gastropods]
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish", "giant african snail", "banana slug", "variable neon slug"]

const inverts = [...cnidaria, ...gastropods, ...cephalopods]
//["fire coral", "moon jelly", "giant african snail", "banana slug", "variable neon slug", "dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]

const cephCopy = [...cephalopods];
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]

console.log([...'abc', 'to', ...'xyz'])
// Concat strings with literals and more!

/* Spread in Object Literals */
const feline = {
    legs: 4,
    family : 'Felidae'
}

const canine = {
    family : 'Caninae',
    furry : true
}

const dog = {
    ...canine,
    isPet : true,
    adorable : true
}
console.log(dog)
// Now has four keys -> family, furry, isPet, adorable. (Also takes the value of caninae)
// { family: 'Caninae', furry: true, isPet: true, adorable: true }


const houseCat = {
    ...feline,
    isGrumpy : true,
    personality : 'unpredictable'
}

// For same keys -> newest key overwrites the old one! Hence, Order matters.
const tripod = {
    ...dog,
    legs: 3,
}
// Takes in all values of Dog and overwrites legs to 3
console.log(tripod)
/* {
    family: 'Caninae',
    furry: true,
    isPet: true,
    adorable: true,
    legs: 3
  } */
