
function makeDeck() {
    const deck = []
    let valueArray = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
    let suitArray = ['clubs', 'spades', 'hearts', 'diamonds']
    for (let value of valueArray){
        for (let suit of suitArray){
            deck.push({value, suit})
        }
    }
    return deck
}

function drawCard(deck){
    return deck.pop()
}
// const myDeck = makeDeck();
// const card1 = drawCard(myDeck)

const myDeck = () => { 
    return {
        deck: [],
        drawnCards: [],
        suits : ['clubs', 'spades', 'hearts', 'diamonds'],
        values : [2,3,4,5,6,7,8,9,10,'J','Q','K','A'],
        initializeDeck () {
            const {suits, values, deck} = this;
            for (let value of values){
                for (let suit of suits){
                    deck.push({value, suit})
                }
            }
            // return deck
        },
        drawCard () {
            const drawnCard = this.deck.pop()
            this.drawnCards.push(drawnCard)
            return drawnCard
        },
        shuffleDeck() {
            this.deck = this.deck.sort(() => Math.random() - 0.5);
        },
        drawMultiple(numCards){
            const cards = []
            for (let i = 0; i < numCards; i++) {
                cards.push(this.drawCard())
            }
            return cards
        },
    }
}

// Create multiple decks
const makeDeck1 = myDeck()
makeDeck1.initializeDeck()
let pokerHand = makeDeck1.drawMultiple(5)

const makeDeck2 = myDeck()
makeDeck2.initializeDeck()
makeDeck2.shuffleDeck()
let pokerHand2 = makeDeck2.drawMultiple(5)