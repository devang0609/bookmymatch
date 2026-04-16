const preview = document.getElementById("mainPreview");
const thumbs = document.querySelectorAll(".thumb");
const slotButtons = document.querySelectorAll(".slot-btn");
const bookTriggers = document.querySelectorAll(".book-trigger");
const reviewsViewport = document.getElementById("reviewsViewport");
const reviewsTrack = document.querySelector(".reviews-track");
const reviewCards = document.querySelectorAll(".reviews-track .review-card");
const reviewDots = document.getElementById("reviewDots");
const reviewPrev = document.querySelector(".review-nav-prev");
const reviewNext = document.querySelector(".review-nav-next");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
    preview.src = thumb.dataset.image;
  });
});

slotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    slotButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

function handleBookNow() {
  const selectedSlot = document.querySelector(".slot-btn.active");
  if (!selectedSlot) {
    alert("Please select an available slot first.");
    return;
  }

  window.location.href = "./booking.html";
}

bookTriggers.forEach((button) => {
  button.addEventListener("click", handleBookNow);
});

if (reviewsTrack && reviewCards.length && reviewDots && reviewsViewport) {
  let reviewIndex = 0;
  let startX = 0;
  let dragging = false;

  function renderReviewDots() {
    reviewDots.innerHTML = "";
    reviewCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `review-dot${index === reviewIndex ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `Go to review ${index + 1}`);
      dot.addEventListener("click", () => setReviewIndex(index));
      reviewDots.appendChild(dot);
    });
  }

  function updateReviewCarousel() {
    reviewsTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
    const dots = reviewDots.querySelectorAll(".review-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === reviewIndex);
    });
  }

  function setReviewIndex(nextIndex) {
    const last = reviewCards.length - 1;
    if (nextIndex < 0) {
      reviewIndex = last;
    } else if (nextIndex > last) {
      reviewIndex = 0;
    } else {
      reviewIndex = nextIndex;
    }
    updateReviewCarousel();
  }

  renderReviewDots();
  updateReviewCarousel();

  if (reviewPrev) {
    reviewPrev.addEventListener("click", () => setReviewIndex(reviewIndex - 1));
  }
  if (reviewNext) {
    reviewNext.addEventListener("click", () => setReviewIndex(reviewIndex + 1));
  }

  reviewsViewport.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
  });

  reviewsViewport.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (delta > 45) {
      setReviewIndex(reviewIndex - 1);
    } else if (delta < -45) {
      setReviewIndex(reviewIndex + 1);
    }
    dragging = false;
  });

  reviewsViewport.addEventListener("pointercancel", () => {
    dragging = false;
  });
}
