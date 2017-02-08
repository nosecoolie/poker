export default class Poker {
    constructor (deck1, deck2) {
        if (!deck1 || !deck2) {
            var shuffleCards = this._shuffle()
            this.deck1 = this._deal(shuffleCards)
            this.deck2 = this._deal(shuffleCards)
        } else {
            this.deck1 = deck1
            this.deck2 = deck2
        }
    }

    _suit (number) {
        switch (Math.floor((number - 1) / 13)) {
            case 0 : return '黑桃'
            case 1 : return '紅心'
            case 2 : return '方塊'
            case 3 : return '梅花'
        }
    }

    _numbers (number) {
        let remain = number % 13

        switch (remain) {
            case 0 : return 13
            default: return remain
        }
    }

    _shuffle () {
        let cards = []
        for (let i = 0; i < 52; i++) {
            cards.push({
                suit: this._suit(i + 1),
                number: this._numbers(i + 1)
            })
        }

        for (let i in cards) {
            let j = parseInt(Math.random() * cards.length - 1)
            let temp = cards[i]
            cards[i] = cards[j]
            cards[j] = temp
        }

        return cards.slice(0, cards.length)
    }

    _deal (shuffleCards) {
        let deck = []
        // deal 5 cards from top
        for (let i = 0; i < 5; i++) {
            deck.push(shuffleCards[0])
            shuffleCards.shift()
        }
        return deck
    }

    _getDeckRank (deck) {
        deck = deck.sort((a, b) => a.number - b.number)
        let matchCount = 0
        let biggestCard = deck[deck.length - 1]
        let cardRank
        let pairCardNumber
        let secondPairCardNumber
        let threeKindNumber
        let {
            number: biggestNumber,
            suit: biggestNumberSuit
        } = biggestCard
        // change biggestSuit to numbers for compare later
        switch (biggestNumberSuit) {
            case '黑桃':
                biggestNumberSuit = 3
                break
            case '愛心':
                biggestNumberSuit = 2
                break
            case '方塊':
                biggestNumberSuit = 1
                break
            case '梅花':
                biggestNumberSuit = 0
                break
            default:
                biggestNumberSuit = 0
        }

        for (let i in deck) {
            for (let j in deck) {
                if (i !== j && deck[i].number === deck[j].number) {
                    if (!pairCardNumber) {
                        pairCardNumber = deck[i].number
                    } else if (pairCardNumber && pairCardNumber !== deck[i].number) {
                        secondPairCardNumber = deck[i].number
                    }
                    matchCount++
                }
            }
        }
        /* ========================
                Card level:

            Straight flush: 8
            Four of a kind: 7
            Full house: 6
            Flush: 5
            Straight: 4
            Three of a kind: 3
            Two Pairs: 2
            Pair: 1
            Unmatched: 0

        ========================= */
        switch (matchCount / 2) {
            case 1:
                cardRank = 1
                break
            case 2:
                cardRank = 2
                break
            case 3:
                cardRank = 3
                break
            case 4:
                cardRank = 6
                /*
                    get threeKindNumber for compare same fullHouse deck
                    the deck had sorted, so it's the first card or the third card.
                */
                threeKindNumber = (deck[0] === deck[1] && deck[0] === deck[2]) ? deck[0].number : deck[2].number
                break
            case 6:
                cardRank = 7
                break
            default:
                let {
                    number: firstCardNumber,
                    suit: firstCardSuit
                } = deck[0]

                // handle the exception for (1,10,11,12,13)
                if (deck[1].number === deck[2].number - 1 && deck[1].number === deck[3].number - 2 && deck[1].number === deck[4].number - 3) {
                    if (firstCardNumber === deck[1].number - 1 || (firstCardNumber === 1 && deck[4].number === 13)) {
                        if (firstCardSuit === deck[1].suit && firstCardSuit === deck[2].suit && firstCardSuit === deck[3].suit && firstCardSuit === deck[4].suit) {
                            cardRank = 8
                        } else {
                            cardRank = 4
                        }
                    }
                } else if (firstCardSuit === deck[1].suit && firstCardSuit === deck[2].suit && firstCardSuit === deck[3].suit && firstCardSuit === deck[4].suit) {
                    cardRank = 5
                } else {
                    cardRank = 0
                }
        }

        return {
            cardRank,
            biggestNumber,
            biggestNumberSuit,
            pairCardNumber,
            secondPairCardNumber,
            threeKindNumber,
            deck
        }
    }

    _genWinningWords (winningDeck) {
        return `${winningDeck} has the better hand!`
    }

    compareDecks () {
        let winningDeck
        let {
            cardRank: cardRank1,
            biggestNumber: biggestNumber1,
            biggestNumberSuit: biggestNumberSuit1,
            pairCardNumber: pairCardNumber1,
            secondPairCardNumber: secondPairCardNumber1,
            threeKindNumber: threeKindNumber1,
            deck: deck1
        } = this._getDeckRank(this.deck1)

        let {
            cardRank: cardRank2,
            biggestNumber: biggestNumber2,
            biggestNumberSuit: biggestNumberSuit2,
            pairCardNumber: pairCardNumber2,
            secondPairCardNumber: secondPairCardNumber2,
            threeKindNumber: threeKindNumber2,
            deck: deck2
        } = this._getDeckRank(this.deck2)
        // for showing hands
        console.log('deck1:')
        console.log(deck1)
        console.log('deck2:')
        console.log(deck2)

        if (cardRank1 !== cardRank2) {
            winningDeck = cardRank1 > cardRank2 ? 'deck1' : 'deck2'
        } else {
            /* ========================
                    Card Rank:

                Straight flush: 8
                Four of a kind: 7
                Full house: 6
                Flush: 5
                Straight: 4
                Three of a kind: 3
                Two Pairs: 2
                Pair: 1
                Unmatched: 0

            ========================= */
            switch (cardRank1) {
                case 8:
                    if (biggestNumber1 !== biggestNumber2) {
                        winningDeck = biggestNumber1 > biggestNumber2 ? 'deck1' : 'deck2'
                    } else {
                        winningDeck = biggestNumberSuit1 > biggestNumberSuit2 ? 'deck1' : 'deck2'
                    }
                    break
                case 7:
                    winningDeck = pairCardNumber1 > pairCardNumber2 ? 'deck1' : 'deck2'
                    break
                case 6:
                    winningDeck = threeKindNumber1 > threeKindNumber2 ? 'deck1' : 'deck2'
                    break
                case 5:
                    if (biggestNumberSuit1 !== biggestNumberSuit2) {
                        winningDeck = biggestNumberSuit1 > biggestNumberSuit2 ? 'deck1' : 'deck2'
                    } else {
                        winningDeck = biggestNumber1 > biggestNumber2 ? 'deck1' : 'deck2'
                    }
                    break
                case 4:
                    // for (1,10,11,12,13) exception
                    if (deck1[1].number !== deck2[1].number) {
                        winningDeck = deck1[1].number > deck2[1].number ? 'deck1' : 'deck2'
                    } else {
                        winningDeck = biggestNumberSuit1 > biggestNumberSuit2 ? 'deck1' : 'deck2'
                    }
                    break
                case 3:
                    winningDeck = pairCardNumber1 > pairCardNumber2 ? 'deck1' : 'deck2'
                    break
                case 2:
                    let biggestPair1 = pairCardNumber1 > secondPairCardNumber1 ? pairCardNumber1 : secondPairCardNumber1
                    let biggestPair2 = pairCardNumber2 > secondPairCardNumber2 ? pairCardNumber2 : secondPairCardNumber2
                    winningDeck = biggestPair1 > biggestPair2 ? 'deck1' : 'deck2'
                    break
                case 1:
                    winningDeck = pairCardNumber1 > pairCardNumber2 ? 'deck1' : 'deck2'
                    break
                case 0:
                    if (biggestNumber1 !== biggestNumber2) {
                        winningDeck = biggestNumber1 > biggestNumber2 ? 'deck1' : 'deck2'
                    } else {
                        winningDeck = biggestNumberSuit1 > biggestNumberSuit2 ? 'deck1' : 'deck2'
                    }
                    break
                default:
            }
        }
        console.log(this._genWinningWords(winningDeck))
    }
}
