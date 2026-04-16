function setupSingleSelect(gridId, summaryTargetId, defaultValue) {
  const grid = document.getElementById(gridId);
  const buttons = grid.querySelectorAll(".option-btn");
  const summaryTarget = document.getElementById(summaryTargetId);

  summaryTarget.textContent = defaultValue;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      summaryTarget.textContent = button.textContent.trim();
    });
  });
}

setupSingleSelect("dateGrid", "summaryDate", "Apr 15, 2026");
setupSingleSelect("timeGrid", "summaryTime", "6:00 AM");

const paymentBtn = document.getElementById("paymentBtn");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");

paymentBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const selectedDate = document.querySelector("#dateGrid .option-btn.active")?.textContent.trim();
  const selectedTime = document.querySelector("#timeGrid .option-btn.active")?.textContent.trim();

  if (!name || !phone) {
    alert("Please enter your full name and phone number.");
    return;
  }

  const query = new URLSearchParams({
    date: selectedDate || "Apr 15, 2026",
    time: selectedTime || "6:00 AM",
    amount: "₹3500"
  });
  window.location.href = `./payment.html?${query.toString()}`;
});
