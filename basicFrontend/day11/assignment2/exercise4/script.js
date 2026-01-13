const logBox = document.getElementById("log");
const claimsBoard = document.getElementById("claimsBoard");

function log(msg) {
  console.log(msg);
  logBox.innerHTML += msg + "<br>";
}

/*
  Event flow (when clicking Approve button):
  CAPTURE: document -> ... -> claimsBoard -> claimRow -> approveBtn
  TARGET:  approveBtn
  BUBBLE:  approveBtn -> claimRow -> claimsBoard -> ... -> document
*/

// ------------------------
// CAPTURING listeners (top -> down)
// ------------------------
claimsBoard.addEventListener(
  "click",
  (e) => {
    log(`[CAPTURE] claimsBoard (container) | target = ${e.target.className || e.target.tagName}`);
  },
  true
);

document.querySelectorAll(".claimRow").forEach((row) => {
  row.addEventListener(
    "click",
    (e) => {
      log(`[CAPTURE] claimRow ${row.dataset.claimId} | target = ${e.target.className || e.target.tagName}`);
    },
    true
  );
});

// ------------------------
// BUBBLING listeners (bottom -> up)  (default)
// ------------------------
document.querySelectorAll(".claimRow").forEach((row) => {
  // Task 1: Row click -> open details (this is bubbling by default)
  row.addEventListener("click", () => {
    log(`[BUBBLE] Opening Claim Details: ${row.dataset.claimId}`);
  });
});

document.querySelectorAll(".approveBtn").forEach((btn) => {
  // Task 2: Approve click -> approve claim
  btn.addEventListener("click", (e) => {
    log(`[TARGET] Claim Approved`);

    // Task 3: stopPropagation so row click won't fire in bubbling
    e.stopPropagation();
    log(`[INFO] stopPropagation() called (bubbling stopped here)`);
  });
});
