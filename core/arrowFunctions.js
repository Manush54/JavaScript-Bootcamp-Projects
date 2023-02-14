// Compact way of writing functions
const square = n => {
    return n * n;
}

// More compact
const square2 = n => n * n;

console.log(square2(2))

const nums = [1,2,3,4,5,6,7,8]

const doubles1 = nums.map(function (n) {
    return n * 2
})

// Arrow function in maps
const doubles2 = nums.map(n => n * 2)

