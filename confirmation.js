const params = new URLSearchParams(window.location.search);

const turf = params.get("turf");
const date = params.get("date");
const time = params.get("time");
const amount = params.get("amount");
const bookingId = params.get("bookingId");

if (turf) {
  document.getElementById("confirmTurf").textContent = turf;
}
if (date) {
  document.getElementById("confirmDate").textContent = date;
}
if (time) {
  document.getElementById("confirmTime").textContent = time;
}
if (amount) {
  document.getElementById("confirmAmount").textContent = amount;
}
if (bookingId) {
  document.getElementById("confirmBookingId").textContent = bookingId;
}

const shareBtn = document.getElementById("shareBtn");
const bookAnotherBtn = document.getElementById("bookAnotherBtn");

shareBtn.addEventListener("click", () => {
  const shareText = `Booking confirmed! ${document.getElementById("confirmTurf").textContent} on ${document.getElementById("confirmDate").textContent} at ${document.getElementById("confirmTime").textContent}.`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  window.open(whatsappLink, "_blank");
});

bookAnotherBtn.addEventListener("click", () => {
  window.location.href = "./index.html";
});
