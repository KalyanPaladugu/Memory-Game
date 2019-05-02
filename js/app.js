'use strict';
/*
Create a list that holds all of your cards
*/
let card = document.getElementsByClassName("card");
let cardsList = [...card];
let moves = 0;
let counter = document.querySelector(".moves");
var time = 0;
let timer = document.querySelector(".timer");
let match = 0;
let star = document.querySelectorAll(".fa-star");
let stars = 3;
//console.log(star);
window.onload = gameStart();
clickedCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// cards array holds all cards
// cards array holds all cards
// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// loop to add event listeners to each card
for (var i = 0; i < cardsList.length; i++) {
  var displayCard = function() {
    this.classList.add("open", "show", "disabled");
    console.log(this);
  }
  cardsList[i].addEventListener("click", displayCard);
  cardsList[i].addEventListener("click", openCard);
};
/*update cards*/
function gameStart() {
  var cards = document.getElementById("deck");
  var shuffledCards = shuffle(cardsList);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      // console.log(item);
      cards.appendChild(item);
    });
  }
}
/*open card functionality*/
function openCard() {
  time = time + 1;
  clickedCards.push(this);
  var len = clickedCards.length;
  var matchedCard = document.querySelectorAll(".match");
  if (len === 2) {
    moveCounter();

    /*cards matching if their class name is equal */
    if (clickedCards[0].children[0].classList.item(1) === clickedCards[1].children[0].classList.item(1)) {
      match += 1;
      clickedCards[0].classList.add("match", "disabled");
      clickedCards[1].classList.add("match", "disabled");
      clickedCards[0].classList.remove("open", "show");
      clickedCards[1].classList.remove("open", "show");
      clickedCards = [];

      /*After completion of game a sweet alert with rating, moves and time to complete game*/
      if (match === 8) {
        clearInterval(interval);

        var span = document.createElement("span");
        span.innerHTML = " Star rating: " + (stars + "/3") + "<br>" + " Moves: " + moves + "<br>" + " Time to complete game: " + timer.innerHTML;
        swal({

          title: "Good job!",
          content: span,
          text: "Successfully completed the game",
          icon: "success",
          button: "Play again"

        }).then(
          isConfirm => {
            if (isConfirm) {
              location.reload();
            }
          });

      }
    }
    /*If cards not matching setTimeOut */
    else {
      clickedCards[0].classList.add("unmatched");
      clickedCards[1].classList.add("unmatched");
      for (var i = 0; i < cardsList.length; i++) {
        cardsList[i].classList.add("disabled");
      }

      setTimeout(function() {
        clickedCards[0].classList.remove("show", "open", "disabled", "unmatched");
        clickedCards[1].classList.remove("show", "open", "disabled", "unmatched");
        clickedCards.filter.call(cardsList, function(cardItem) {
          cardItem.classList.remove('disabled');
          for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add('disabled');
          }
        })
        clickedCards = [];
      }, 300);
    }
  }
  /*when time == 1 call the startTimer function*/
  if (time == 1) {
    startTimer();
  }
}

/*moves count and stars display respective moves count*/

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  if (moves <= 10) {
    stars = 3;
  } else if (moves > 8 && moves < 16) {
    stars = 2;
    star[2].style.display = "none";
  } else if (moves >= 17 && moves <= 20) {
    stars = 1;
    star[1].style.display = "none";
  }
}


/*time start when game begins*/


var seconds = 0,
  minutes = 0,
  hour = 0;

var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minutes + "mins " + seconds + "secs";
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes == 60) {
      hour++;
      minutes = 0;
    }
  }, 1000);
}

/*reset game when click on refresh button*/

function resetGame() {
  window.location.reload();
}
