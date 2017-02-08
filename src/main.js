import Poker from './poker'

/* =======================================================

The suit can only be '黑桃' || '愛心' || '方塊' || '梅花'
The number can only be 1 ~ 13

======================================================= */

// let deck1 = [
//     { suit: '黑桃', number: 1 },
//     { suit: '愛心', number: 2 },
//     { suit: '黑桃', number: 3 },
//     { suit: '黑桃', number: 4 },
//     { suit: '黑桃', number: 5 }
// ]
// let deck2 = [
//     { suit: '黑桃', number: 1 },
//     { suit: '愛心', number: 2 },
//     { suit: '愛心', number: 3 },
//     { suit: '愛心', number: 4 },
//     { suit: '愛心', number: 5 }
// ]
// const MyPoker = new Poker(deck1, deck2)
const MyPoker = new Poker()
MyPoker.compareDecks()
