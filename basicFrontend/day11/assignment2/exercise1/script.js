const paymentSection = document.getElementById("paymentSection");
const payBtn = document.getElementById("payBtn");
const logBox = document.getElementById("log");

function log(msg) {
  console.log(msg);
  logBox.innerHTML += msg + "<br>";
}

// 1) Click event for button
payBtn.addEventListener("click", () => {
  log("Button clicked: Pay Premium");
});

// 2) Click event for div
paymentSection.addEventListener("click", () => {
  log("Div clicked: paymentSection");
});
