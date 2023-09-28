class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    if (!this.cards) return undefined;

    /**
     * make random to be between i and the array length without repeating it
     */
    let nums = structuredClone(this.cards),
      ranNums = [],
      i = nums.length,
      j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(nums[j]);
      nums.splice(j, 1);
    }

    this.cards = ranNums;
    return this.cards;
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked++;

    /**
     * if both cards are the same, block them. else turn them back with a timeout for better UX
     */
    if (card1 === card2) {
      this.pairsGuessed++;
    }

    return card1 === card2;
  }

  samePair(card1, card2) {
    this.pairsGuessed++;
    card1.classList.add("blocked");
    card2.classList.add("blocked");
    this.updatedPairsGuessed();

    /**
     * if finished win mesage
     */
    if (this.checkIfFinished()) {
      this.winMessage();
    }
  }

  differentPair(card1, card2) {
    setTimeout(() => {
      card1.classList.remove("turned");
      card2.classList.remove("turned");
    }, 1000);
  }

  // Update the counters on the page
  updatedPairsClicked() {
    pairsClickedCounter.textContent = this.pairsClicked;
  }
  updatedPairsGuessed() {
    pairsGuessedCounter.textContent = this.pairsGuessed;
  }

  checkIfFinished() {
    // ... write your code here
    if (this.pairsGuessed === this.cards.length / 2) {
      return true;
    } else {
      return false;
    }
  }

  winMessage() {
    winModal.showModal();
  }

  // Reset all values and recreate board (with suffled cards)
  newGame() {
    prepareGame();
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    updatedPairsClicked();
    updatedPairsGuessed();
    winModal.hide();
  }
}
