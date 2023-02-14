/**
 * THIS KEYWORD in Methods
 */

function sayHi() {
    console.log("HI")
    //this refers to the window (global scope object in the browser)
    console.log(this);
}


const person = {
    first: 'Cherilyn',
    last: 'Sarkisian',
    nickName: 'Cher',
    fullName() {
        //In a method, this refers to the object the method "lives" in:
        const {
        first,
        last,
        nickName
        } = this;
        return `${first} ${last } AKA ${nickName}`;
    },
    printBio() {
        console.log(this)
        const fullName = this.fullName()
        console.log(`${fullName} is a person!`)
    },
    // Changin laugh to normal function will make 'this' work as expected
    laugh : () => {
        console.log(this); // Refers to Window Object
        console.log(`${this.nickName} says HAHAHAHA`)  //undefined
    }  // Arrow functions do not get their own 'this'. They have a scoping to lexical scoping to 'this' context.
}

const printBio = person.printBio; 
// called outside the function (in window scope) via reference
// Hence now 'this' refers to the window object where the reference belongs and not the "person" object.
person.printBio()  // Works perfectly FINE!

// Annoyer DEMO using THIS
const annoyer = {
    phrases: ["literally", "cray cray", "I can't even", 
        "Totes!", "YOLO", "Can't stop, Won't Stop"],
    pickPhrase () {
        const {phrases} = this
        const idx = Math.floor(Math.random() * phrases.length)
        return phrases[idx]
    },
    start () {
        /**
        * USING Arrow Function
        * NOW WORK AS EXPECTED
        **/
       this.timerId = setInterval(() => {
        console.log(this)  // Points to start() as per lexical scope
        console.log(this.pickPhrase())
        // Will work because arrow function now uses start() as reference
    }, 3000)

        /**
         * USING regular function
         * NOT WORK AS EXPECTED
        setInterval(function () {
            console.log(this)  // Points to window object
            console.log(this.pickPhrase())
            // Will not work because it is called by setInterval which is a window method
        }, 3000)
        **/

    },
    stop () {
        console.log(this) // Points to annoyer obj.
        clearInterval(this.timerId)
        // timerId was dynamically added in the start function to the 'annoyer' object. Hence we can access it here
    }
}