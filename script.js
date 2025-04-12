
const board = document.getElementById('game-board');
const letters = [...'ABCDEFGH', ...'ABCDEFGH'];
let flippedCards = [];
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.innerText = ''; // hidden by default

  card.addEventListener('click', () => {
    if (
      card.classList.contains('flipped') ||
      card.classList.contains('matched') ||
      flippedCards.length === 2
    ) return;

    flipCard(card);

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.dataset.letter === second.dataset.letter) {
        first.classList.add('matched');
        second.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];

        if (matchedCount === 16) {
          setTimeout(() => alert('🎉 You matched all the cards!'), 300);
        }
      } else {
        setTimeout(() => {
          unflipCard(first);
          unflipCard(second);
          flippedCards = [];
        }, 1000);
      }
    }
  });

  return card;
}

function flipCard(card) {
  card.classList.add('flipped');
  card.innerText = card.dataset.letter;
}

function unflipCard(card) {
  card.classList.remove('flipped');
  card.innerText = '';
}

function setupGame() {
  const shuffled = shuffle(letters);
  shuffled.forEach(letter => {
    const card = createCard(letter);
    board.appendChild(card);
  });
}

setupGame();
