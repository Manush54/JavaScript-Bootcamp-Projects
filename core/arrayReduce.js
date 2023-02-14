const grades = [87, 64, 96, 92, 88, 99, 73, 70, 64]

const maxGrade = grades.reduce((max, currentValue) => {
    if(currentValue > max) return currentValue
    else return max;
})


console.log(maxGrade)

const votes = [
    'y',
    'n',
    'n',
    'y',
    'n',
    'n',
    'y',
    'y',
    'n',
    'y',
    'n',
    'y',
    'n',
    'y',
    'n',
    'y',
    'y',
    'n',
    'y',
]

const countVotes = votes.reduce((tally, val)=> {
    if(!tally[val]) {
        tally[val] = 1
    } else {
        tally[val]++
    }
    return tally
}, {})

// Shorter Way
const countVotes2 = votes.reduce((tally, val)=> {
    tally[val] = (tally[val] || 0) + 1
    return tally
}, {})

// when tally[val] does not exists (undefined || 0) + 1 gives 0+1 = 1
// then when it exists already (1 || 0) + 1 gives 1+1 = 2 and so on..!
console.log(countVotes)

const books = [{
    title: 'Good Omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Changing My Mind',
    authors: ['Zadie Smith'],
    rating: 3.83,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Bone: The Complete Edition',
    authors: ['Jeff Smith'],
    rating: 4.42,
    genres: ['fiction', 'graphic novel', 'fantasy']
  },
  {
    title: 'American Gods',
    authors: ['Neil Gaiman'],
    rating: 4.11,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'A Gentleman in Moscow',
    authors: ['Amor Towles'],
    rating: 4.36,
    genres: ['fiction', 'historical fiction']
  },
  {
    title: 'The Name of the Wind',
    authors: ['Patrick Rothfuss'],
    rating: 4.54,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'The Overstory',
    authors: ['Richard Powers'],
    rating: 4.19,
    genres: ['fiction', 'short stories']
  },
  {
    title: 'A Truly Horrible Book',
    authors: ['Xavier Time'],
    rating: 2.18,
    genres: ['fiction', 'garbage']
  },
  {
    title: 'The Way of Kings',
    authors: ['Brandon Sanderson'],
    rating: 4.65,
    genres: ['fantasy', 'epic']
  },
  {
    title: 'Lord of the flies',
    authors: ['William Golding'],
    rating: 3.67,
    genres: ['fiction']
  }
]

const groupedByRatings = books.reduce((groupedBooks, book) => {
    const key = Math.floor(book.rating)
    // if(!groupedBooks[key]) groupedBooks[key] = []
    // groupedBooks[key].push(book)
    // Shorter way
    groupedBooks[key] = (groupedBooks[key] || [])
    groupedBooks[key].push(book)
    return groupedBooks
}, {})

console.log(groupedByRatings)

const greet = (person, greeting = 'hi', punctuation = '!') => (
  console.log(`${greeting}, ${person} ${punctuation}`)
)
greet('Manush')

function sum(a,b) {
  console.log([...arguments].reduce((sum, val) => {return (sum + val)}, 0))
}
sum(1,2,3,4)