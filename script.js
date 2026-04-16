const turfData = [
  { name: "Elite Cricket Hub", city: "Mumbai", price: 3500, rating: 4.9 },
  { name: "Strikers Paradise", city: "Bengaluru", price: 3000, rating: 4.9 },
  { name: "Night Owl Cricket", city: "Delhi", price: 2800, rating: 4.8 },
  { name: "Champions Arena", city: "Mumbai", price: 2500, rating: 4.8 },
  { name: "Midnight Strikers", city: "Pune", price: 2200, rating: 4.7 },
  { name: "Sunset Cricket Arena", city: "Bangalore", price: 2000, rating: 4.6 }
];

const imagePool = [
  "https://images.unsplash.com/photo-1771909713672-4e351f1f8b62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxjcmlja2V0JTIwdHVyZiUyMG5pZ2h0fGVufDB8fHx8MTc3NjA3NzMxMXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1671209151455-86980f5bf293?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwdHVyZiUyMG5pZ2h0fGVufDB8fHx8MTc3NjA3NzMxMXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1766756499755-0ae763777974?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBhcmVuYSUyMG5pZ2h0fGVufDB8fHx8MTc3NjA3NzMxMXww&ixlib=rb-4.1.0&q=85"
];

function createTurfCard(turf, index) {
  const card = document.createElement("article");
  card.className = "turf-card";

  card.innerHTML = `
    <img class="turf-image" src="${imagePool[index % imagePool.length]}" alt="${turf.name}" />
    <div class="turf-content">
      <div class="turf-row">
        <div>
          <h3 class="turf-name">${turf.name}</h3>
          <p class="turf-place">${turf.city}</p>
        </div>
        <div>
          <p class="price">₹${turf.price}</p>
          <p class="per">per slot</p>
        </div>
      </div>
      <p class="rating">★ ${turf.rating}</p>
      <button class="details-btn" type="button">View Details</button>
    </div>
  `;

  const detailsBtn = card.querySelector(".details-btn");
  detailsBtn.addEventListener("click", () => {
    window.location.href = "./turf-detail.html";
  });

  return card;
}

function createPlaceCard(turf, index) {
  const card = document.createElement("article");
  card.className = "place-card";
  const img = imagePool[index % imagePool.length];

  card.innerHTML = `
    <img class="place-img" src="${img}" alt="" />
    <div class="place-scrim" aria-hidden="true"></div>
    <button type="button" class="place-fav" aria-label="Save turf">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
    <div class="place-body">
      <h3>${turf.name}</h3>
      <p class="place-loc">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        ${turf.city}, India
      </p>
      <p class="place-stars" aria-label="Rating ${turf.rating}"><span aria-hidden="true">★</span> ${turf.rating}</p>
      <p class="place-price">₹${turf.price} <span>/ slot</span></p>
      <button type="button" class="place-cta">View details</button>
    </div>
  `;

  card.querySelector(".place-cta").addEventListener("click", () => {
    window.location.href = "./turf-detail.html";
  });

  return card;
}

const WELCOME_STACK_DEPTH = 4;

function initWelcomeStack() {
  const deck = document.getElementById("welcomeStackDeck");
  if (!deck) return;

  const n = turfData.length;
  if (n === 0) return;

  let startIndex = 0;
  const cards = [];

  const pinSvg =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  function updateCardContent(card) {
    const slot = Number(card.dataset.slot);
    const ti = (startIndex + (3 - slot)) % n;
    const turf = turfData[ti];
    card.querySelector(".stack-title").textContent = turf.name;
    card.querySelector(".stack-city").textContent = `${turf.city}, India`;
    card.querySelector(".stack-rating-val").textContent = String(turf.rating);
    card.querySelector(".stack-card-bg").style.backgroundImage = `url("${imagePool[ti % imagePool.length]}")`;
  }

  function refreshAllCards() {
    cards.forEach(updateCardContent);
  }

  function cycleStackAfterSwipe() {
    startIndex = (startIndex + 1) % n;
    cards.forEach((card) => {
      card.dataset.slot = String((Number(card.dataset.slot) + 1) % WELCOME_STACK_DEPTH);
    });
    refreshAllCards();
  }

  /** @param {"left"|"right"} direction which way the top card flies off */
  function startExit(direction) {
    const front = cards.find((c) => c.dataset.slot === "3");
    if (!front || front.classList.contains("is-exiting")) return;
    front.classList.remove("is-dragging");
    front.style.removeProperty("--drag-x");
    const exitClass = direction === "left" ? "is-exit-left" : "is-exit-right";
    front.classList.add("is-exiting", exitClass);
    const onDone = (e) => {
      if (!front.contains(e.target) || e.propertyName !== "transform") return;
      front.removeEventListener("transitionend", onDone);
      front.classList.remove("is-exiting", "is-exit-right", "is-exit-left");
      cycleStackAfterSwipe();
    };
    front.addEventListener("transitionend", onDone);
  }

  deck.innerHTML = "";
  for (let i = 0; i < WELCOME_STACK_DEPTH; i++) {
    const art = document.createElement("article");
    art.className = "stack-card";
    art.dataset.slot = String(WELCOME_STACK_DEPTH - 1 - i);
    art.innerHTML = `
      <div class="stack-card-bg" aria-hidden="true"></div>
      <div class="stack-scrim" aria-hidden="true"></div>
      <span class="stack-tag">Offer</span>
      <div class="stack-footer">
        <div class="stack-meta">
          <h3 class="stack-title"></h3>
          <p class="stack-loc">${pinSvg}<span class="stack-city"></span></p>
        </div>
        <div class="stack-rating" aria-label="Rating">
          <span class="star" aria-hidden="true">★</span>
          <span class="stack-rating-val"></span>
        </div>
      </div>
    `;
    deck.appendChild(art);
    cards.push(art);
  }

  refreshAllCards();

  let dragStartX = 0;
  let dragActive = false;
  let activePointerId = null;
  let dragCard = null;

  deck.addEventListener("pointerdown", (e) => {
    const card = e.target.closest(".stack-card");
    if (!card || card.dataset.slot !== "3" || card.classList.contains("is-exiting")) return;
    dragActive = true;
    dragCard = card;
    dragStartX = e.clientX;
    activePointerId = e.pointerId;
    card.classList.add("is-dragging");
    card.style.setProperty("--drag-x", "0px");
    try {
      card.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  });

  deck.addEventListener("pointermove", (e) => {
    if (!dragActive || e.pointerId !== activePointerId || !dragCard) return;
    if (!dragCard.classList.contains("is-dragging")) return;
    const dx = e.clientX - dragStartX;
    dragCard.style.setProperty("--drag-x", `${dx}px`);
  });

  function endDrag(e, cancelled) {
    if (!dragActive || e.pointerId !== activePointerId) return;
    const cardEl = dragCard;
    dragActive = false;
    activePointerId = null;
    dragCard = null;
    if (!cardEl) return;
    try {
      cardEl.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const dx = parseFloat(String(cardEl.style.getPropertyValue("--drag-x")).replace("px", "")) || 0;
    cardEl.classList.remove("is-dragging");
    if (!cancelled && Math.abs(dx) > 56) {
      cardEl.style.removeProperty("--drag-x");
      startExit(dx < 0 ? "left" : "right");
    } else {
      cardEl.style.setProperty("--drag-x", "0px");
    }
  }

  deck.addEventListener("pointerup", (e) => endDrag(e, false));
  deck.addEventListener("pointercancel", (e) => endDrag(e, true));

  deck.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      startExit("left");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      startExit("right");
    }
  });

  deck.tabIndex = 0;
  deck.setAttribute("role", "region");
  deck.setAttribute("aria-label", "Welcome offers, swipe for next");
}

function initHomePage() {
  if (!document.body.classList.contains("page-home")) return;

  initWelcomeStack();

  const secondary = turfData[1] || turfData[0];

  const highlightVisual = document.getElementById("highlightVisual");
  const highlightTitle = document.getElementById("highlightTitle");
  const highlightSub = document.getElementById("highlightSub");
  const highlightRating = document.getElementById("highlightRating");
  if (highlightVisual && highlightTitle && highlightSub && highlightRating) {
    highlightVisual.style.backgroundImage = `url("${imagePool[1]}")`;
    highlightTitle.textContent = secondary.name;
    highlightSub.textContent = `Premium turf in ${secondary.city} — book in seconds.`;
    highlightRating.textContent = `★ ${secondary.rating}`;
  }

  const hlPlay = document.querySelector(".hl-play");
  if (hlPlay) {
    hlPlay.addEventListener("click", () => {
      window.location.href = "./turf-detail.html";
    });
  }

  const pills = document.querySelectorAll(".cat-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => {
        p.classList.toggle("is-active", p === pill);
        p.setAttribute("aria-selected", p === pill ? "true" : "false");
      });
    });
  });

  const popularPlaces = document.getElementById("popularPlaces");
  if (popularPlaces) {
    turfData.forEach((turf, index) => {
      popularPlaces.appendChild(createPlaceCard(turf, index));
    });
  }
}

const turfsGrid = document.getElementById("turfsGrid");
if (turfsGrid) {
  turfData.forEach((turf, index) => turfsGrid.appendChild(createTurfCard(turf, index)));
}

initHomePage();
