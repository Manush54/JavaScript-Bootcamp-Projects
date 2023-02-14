// // Breaks only inner for loop
// for(i = 0; i < 10; i++){
//     console.log(`i : ${i}`)
//     for (j = 0; j < 10 ; j++){
//         console.log(`j : ${j}`)
//         if(j === 3){
//             break;
//         }
//     }
// }

// // Break nested loop
// loop1 : for(i = 0; i < 10; i++){
//             console.log(`i : ${i}`)
//     loop2 : for (j = 0; j < 10 ; j++){
//                 console.log(`j : ${j}`)
//                 if(j === 3){
//                     break loop1;
//                 }
//     }
// }

let a = [1,2,3,4,5,6,7]
for (let num of a) {
    console.log(num)
}

let magicSquare = [[2,7,6], [9,5,1], [4,3,8]]
for (let row of magicSquare){
    let sum = 0;
    for(let num of row){
        sum += num
    }
    console.log(`Sum of ${row} is ${sum}`)
}

// For of with Objects
const movieReviews = {
	Arrival                : 9.5,
	Alien                  : 9,
	Amelie                 : 8,
	'In Bruges'            : 9,
	Amadeus                : 10,
	'Kill Bill'            : 8,
	'Little Miss Sunshine' : 8.5,
	Coraline               : 7.5
};

for(let movie of Object.keys(movieReviews)){
    console.log(`${movie} ${movieReviews[movie]}`)
}

// Alternate Way
console.log("--------------------------------------")
Object.keys(movieReviews).map((movie) => {console.log(`${movie} ${movieReviews[movie]}`)})

// Dice roll function
function rollDie(){
    let roll = Math.floor(Math.random() * 6) + 1
    console.log(roll)
}