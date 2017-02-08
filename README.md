# Poker
A simple game that compare two decks.

### Installation
* Clone this repo.
* npm install
* npm run main.js

### Config Cards
Poker will auto suffle and deal cards.
But you still can config deck cards in main.js

```
let deck1 = [
    { suit: '黑桃', number: 1 },
    { suit: '愛心', number: 2 },
    { suit: '黑桃', number: 3 },
    { suit: '黑桃', number: 4 },
    { suit: '黑桃', number: 5 }
]
let deck2 = [
    { suit: '黑桃', number: 1 },
    { suit: '愛心', number: 2 },
    { suit: '愛心', number: 3 },
    { suit: '愛心', number: 4 },
    { suit: '愛心', number: 5 }
]
```

then pass to Poker

```
const MyPoker = new Poker(deck1, deck2)
```

### Dependencies
* babel-cli
