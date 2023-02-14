// Functions as Return Values
function multiplyBy(num) {
    return function (x) {
        return x * num;
    }
}

const double = multiplyBy(2)
console.log(double(100))

function makeBetween(x,y) { 
    return function (num) {
        return (num >=x && num <= y)
    }
}

const percent = makeBetween(0,100)

console.log(percent(101))

const isChild = makeBetween(0,18)

console.log(isChild('15'))


// Functions as arguments
function add (x,y) {
    return x+y;
}
function subtract (x,y) {
    return x-y;
}
function multiply (x,y) {
    return x*y;
}
function divide (x,y) {
    return x/y;
}

const operations = [add,subtract,multiply,divide]

function ops (x,y,func) {
    return func(x,y)
}

console.log(ops(1,5,subtract))
console.log(ops(10,9,operations[2]))