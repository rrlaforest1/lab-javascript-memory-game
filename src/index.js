const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

/**
 * all my consts
 */
const memoryGame = new MemoryGame(cards);
const pairsClickedCounter = document.querySelector("#pairs-clicked");
const pairsGuessedCounter = document.querySelector("#pairs-guessed");
const winModal = document.querySelector("#winModal");
const playAgain = winModal.querySelector("button");

let cardHolder = [];

window.addEventListener("load", (event) => {
  prepareGame();
});

/**
 * Created a function to used it with the "play again button"
 */
function prepareGame() {
  let html = "";
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // TODO: write some code here
      // console.log(`Card clicked: ${card}`);

      const currentCard = e.target.closest(".card");
      currentCard.classList.add("turned");

      /**
       * limit the number of cards to 2
       */
      cardHolder.push(currentCard);

      if (cardHolder.length === 2) {
        const pairChecked = memoryGame.checkIfPair(
          cardHolder[0].getAttribute("data-card-name"),
          cardHolder[1].getAttribute("data-card-name")
        );
        memoryGame.updatedPairsClicked();
        if (pairChecked) {
          memoryGame.samePair(cardHolder[0], cardHolder[1]);
        } else {
          memoryGame.differentPair(cardHolder[0], cardHolder[1]);
        }
        cardHolder = [];
      }
    });
  });
}

playAgain.addEventListener("click", memoryGame.newGame);
