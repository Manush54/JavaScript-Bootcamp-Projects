// Customized Ordering

// JavaScript program to sort an array
// of strings based on the given order

// For storing priority of each character
let priorityMap = new Map();

// Custom comparator function for sort
function comp(a, b)
{
	console.log(a,b)

	// Loop through the minimum size
	// between two names
	for (let i = 0; i < Math.min(a.length, b.length);i++) {

		// Check if the characters
		// at position i are different,
		// then the word containing lower
		// valued character is smaller

		if (priorityMap.get(a[i]) != priorityMap.get(b[i])){
			return priorityMap.get(a[i]) - priorityMap.get(b[i]);
		}
	}

	/* When loop breaks without returning, it
	means the prefix of both names were same
	till the execution of the loop.
	Now, the word with the smaller size will
	occur before in sorted order
		*/
	return (a.length - b.length);
}

// Function to print the
// new sorted array of strings
const customSort = (names,order) => 
{
	const namesArray = names.map((nameObj) => nameObj.name)
	console.log("Original Array : ", names)

	// Mapping each character
	// to its occurrence position
	for (let i = 0; i < order.length; i++)
		priorityMap.set(order[i],i);

	// Sorting with custom sort function
	namesArray.sort(comp);

	let sortedArray = [];
	// Pushing the sorted objects in the new array based on their names.
	for (let x of namesArray){
		sortedArray = sortedArray.concat(names.filter(n => n.name === x))
	}

	return sortedArray;
}

// Driver code
const names = [{name:'gaurav'},{name:'ayush'}, {name:'vishal'},{name:'ravi', index: 1}, {name: 'manush'}, {name: 'ravi', index : 2}, {name : 'hasti'}, {name : "mann"}, {name: 'mannu'}]
let basedOn = "ZAHXGBYPQRFELUNCJIVWOTSMDK".toLowerCase()
const arr = [...basedOn]
console.log(arr)
// console.log(new Map([...basedOn]))
// let basedOn = "abcdefghijklmnopqrstuvwxyz"

let sortedArray = customSort(names, basedOn);
console.log("Sorted Array : ", sortedArray)