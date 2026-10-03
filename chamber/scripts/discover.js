import { items } from "../data/discoverItems.mjs";

const cardsGrid = document.querySelector(".cards-grid");

function displayCards(items) {
  cardsGrid.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add(`card`, `card-${index + 1}`);

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
    `;
    cardsGrid.appendChild(card);
  });
}

displayCards(items);

// 2. Visitor Message using localStorage & Date.now()
const visitorMessageContainer = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit-ls");
const currentDate = Date.now();
const oneDayInMs = 24 * 60 * 60 * 1000;

if (!lastVisit) {
  // First visit
  visitorMessageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const timeDifference = currentDate - Number(lastVisit);
  const daysDifference = Math.floor(timeDifference / oneDayInMs);

  if (timeDifference < oneDayInMs) {
    visitorMessageContainer.textContent = "Back so soon! Awesome!";
  } else if (daysDifference === 1) {
    visitorMessageContainer.textContent = "You last visited 1 day ago.";
  } else {
    visitorMessageContainer.textContent = `You last visited ${daysDifference} days ago.`;
  }
}

// Save current visit timestamp
localStorage.setItem("lastVisit-ls", currentDate);