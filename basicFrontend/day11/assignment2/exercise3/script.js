const logBox = document.getElementById("log");

function log(msg) {
  console.log(msg);
  logBox.innerHTML += msg + "<br>";
}

// 1) Clicking card = navigate to details
document.querySelectorAll(".policy-card").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.dataset.policyId;
    log(`Navigate: Opening policy details for ${id}`);
  });
});

// 2) Clicking delete should ONLY delete (stop bubbling)
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation(); // ✅ Task 1: stop event bubbling

    const card = btn.closest(".policy-card");
    const id = card.dataset.policyId;

    log(`Delete: Policy ${id} deleted`);
  });
});
