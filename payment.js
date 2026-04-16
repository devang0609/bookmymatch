const methodButtons = document.querySelectorAll(".method-btn");
const paymentInput = document.getElementById("paymentInput");
const payBtn = document.getElementById("payBtn");

const params = new URLSearchParams(window.location.search);
const date = params.get("date");
const time = params.get("time");
const amount = params.get("amount");
const turf = document.getElementById("orderTurf").textContent.trim();

if (date) {
  document.getElementById("orderDate").textContent = date;
}
if (time) {
  document.getElementById("orderTime").textContent = time;
}
if (amount) {
  document.getElementById("orderCost").textContent = amount;
  document.getElementById("orderTotal").textContent = amount;
  payBtn.textContent = `Pay ${amount}`;
}

methodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    methodButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const method = button.dataset.method;
    if (method === "UPI") {
      paymentInput.placeholder = "Enter UPI ID";
    } else if (method === "CARD") {
      paymentInput.placeholder = "Enter Card Number";
    } else {
      paymentInput.placeholder = "Enter Bank Name";
    }
  });
});

payBtn.addEventListener("click", () => {
  const paymentValue = paymentInput.value.trim();
  if (!paymentValue) {
    alert("Please fill payment details to continue.");
    return;
  }

  const bookingId = `BMM${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
  const query = new URLSearchParams({
    turf,
    date: document.getElementById("orderDate").textContent.trim(),
    time: document.getElementById("orderTime").textContent.trim(),
    amount: document.getElementById("orderTotal").textContent.trim(),
    bookingId
  });
  window.location.href = `./confirmation.html?${query.toString()}`;
});
