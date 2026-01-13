/************************************************************
  events.js — Java Script Events (Bubbling/Capturing/Stop)
************************************************************/

/* =========================
   Exercise 1 – Basic (Event Bubbling)
   Add click event to both div and button.
   Observe output order when button is clicked.
   Mention which phase.
========================= */
const paymentSection = document.getElementById("paymentSection");
const payBtn = document.getElementById("payBtn");

paymentSection.addEventListener("click", () => {
  console.log("DIV clicked (paymentSection)");
});
payBtn.addEventListener("click", () => {
  console.log("BUTTON clicked (Pay Premium)");
});

/*
Expected when clicking button (BUBBLING):
1) BUTTON clicked
2) DIV clicked
Phase: Bubbling (default addEventListener without capture)
*/


/* =========================
   Exercise 2 – Basic (Event Capturing)
   Use capturing phase for both parent and child.
   Ensure parent runs first.
========================= */
const parentValidate = document.getElementById("parentValidate");
const childShowPolicy = document.getElementById("childShowPolicy");

parentValidate.addEventListener(
  "click",
  () => console.log("PARENT (capture): Validating user..."),
  true // capture ON
);

childShowPolicy.addEventListener(
  "click",
  () => console.log("CHILD (capture): Showing policy details..."),
  true // capture ON
);

/*
Expected when clicking child button (CAPTURING):
1) PARENT (capture) first
2) CHILD (capture) next
*/


/* =========================
   Exercise 3 – Intermediate (stopPropagation)
   Clicking card navigates, but clicking delete should only delete.
========================= */
const policyCard = document.getElementById("policyCard");
const deleteBtn = document.getElementById("deleteBtn");

policyCard.addEventListener("click", () => {
  console.log("Navigating to policy details...");
});

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // stops bubbling to policyCard
  console.log("Deleting policy...");
});


/* =========================
   Exercise 4 – Claim Row + Approve button
   Row click: Opening Claim Details
   Approve button click: Claim Approved
   Ensure approve doesn't open details.
========================= */
const claimRow1 = document.getElementById("claimRow1");
const approveBtn = claimRow1.querySelector(".approveBtn");

claimRow1.addEventListener("click", () => {
  console.log("Opening Claim Details");
});

approveBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Claim Approved");
});

/*
Explain:
- Without stopPropagation(): clicking Approve would also trigger row click,
  so you'd see:
  "Claim Approved"
  "Opening Claim Details"
- With stopPropagation(): only "Claim Approved" is logged.
*/
