// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object

function getCard() {
    let valueArray = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
    let value = pick(valueArray)
    
    let suitArray = ['clubs', 'spades', 'hearts', 'diamonds']
    let suit = pick(suitArray)
    
    return {value, suit}

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }
}

console.log(getCard())