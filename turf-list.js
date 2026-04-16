const filterGroups = [document.getElementById("dateFilter"), document.getElementById("timeFilter")];

filterGroups.forEach((group) => {
  if (!group) return;
  const buttons = group.querySelectorAll(".filter-chip, .date-pill");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
});
