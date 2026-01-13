/************************************************************
  asmt1.js — JavaScript Exercises (Insurance Dashboard)
************************************************************/

/* =========================
   Task 1 – Select by ID
========================= */
const pageTitle = document.getElementById("pageTitle");
pageTitle.textContent = "Customer Insurance Overview";

/* =========================
   Task 2 – Select by Tag Name
========================= */
const allLis = document.getElementsByTagName("li");
for (let i = 0; i < allLis.length; i++) {
  allLis[i].style.border = "1px solid #000";
}
console.log("Total customers (li count):", allLis.length);

/* =========================
   Task 3 – Select by Class Name
========================= */
const policiesByClass = document.getElementsByClassName("policy");
for (let i = 0; i < policiesByClass.length; i++) {
  policiesByClass[i].classList.add("highlight");
  policiesByClass[i].style.color = "blue";
}

/* =========================
   Task 4 – Select using CSS Selectors
========================= */
const firstCustomer = document.querySelector("#customerList .customer");
console.log("First customer:", firstCustomer?.textContent);

const allCustomersQS = document.querySelectorAll("#customerList .customer");
console.log("All customers (querySelectorAll):", allCustomersQS.length);

const lastCustomer = document.querySelector("#customerList .customer:last-child");
if (lastCustomer) lastCustomer.classList.add("active");

/* =========================
   Task 5 – HTML Object Collections
========================= */
console.log("Number of forms:", document.forms.length);
console.log("Number of images:", document.images.length);

for (let i = 0; i < document.links.length; i++) {
  document.links[i].textContent = "More Info";
}

/* =========================
   Task 6 – Add a new customer dynamically and observe
========================= */
const customerList = document.getElementById("customerList");

// LIVE
const customersLive = document.getElementsByClassName("customer");
// STATIC snapshot
const customersStatic = document.querySelectorAll("#customerList .customer");

const newLi = document.createElement("li");
newLi.className = "customer";
newLi.textContent = "Sita – Travel";
customerList.appendChild(newLi);

console.log("After adding new customer:");
console.log("LIVE HTMLCollection (.customer):", customersLive.length, "(updates automatically)");
console.log("STATIC NodeList (querySelectorAll):", customersStatic.length, "(does NOT update automatically)");
console.log("Re-query NodeList:", document.querySelectorAll("#customerList .customer").length);

/* =========================
   Task 7 – Attribute-Based Selection
========================= */
const textInputs = document.querySelectorAll('input[type="text"]');
textInputs.forEach((inp) => {
  inp.style.backgroundColor = "yellow";
  inp.placeholder = "Enter Full Name";
});

/* =========================
   Task 8 – Multiple Class Selection
========================= */
const priorityCustomers = document.querySelectorAll(".customer.active");
priorityCustomers.forEach((el) => {
  el.style.color = "darkgreen";
  if (!el.textContent.includes("(Priority Customer)")) {
    el.textContent = el.textContent + " (Priority Customer)";
  }
});

/* =========================
   Task 9 – Descendant vs Child Selector
========================= */
const descendantLis = document.querySelectorAll("#customerList li");
const childLis = document.querySelectorAll("#customerList > li");

console.log("Descendant selector count (#customerList li):", descendantLis.length);
console.log("Child selector count (#customerList > li):", childLis.length);

/* =========================
   Task 10 – Even / Odd Selection
========================= */
const evenCustomers = document.querySelectorAll("#customerList > li:nth-child(even)");
evenCustomers.forEach((li) => (li.style.backgroundColor = "lightgray"));

const oddCustomers = document.querySelectorAll("#customerList > li:nth-child(odd)");
oddCustomers.forEach((li) => (li.style.backgroundColor = "lightblue"));

/* =========================
   Task 11 – Form Elements Collection
========================= */
const enquiryForm = document.forms["enquiryForm"];
if (enquiryForm) {
  const elems = enquiryForm.elements;

  for (let i = 0; i < elems.length; i++) {
    console.log("Form element:", elems[i].tagName, "name=", elems[i].name);
  }

  const submitBtn = enquiryForm.querySelector('button[type="submit"], input[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;
}

/* =========================
   Task 12 – NodeList vs HTMLCollection (Policies)
========================= */
const policiesLiveHC = document.getElementsByClassName("policy"); // LIVE
const policiesStaticNL = document.querySelectorAll(".policy");    // STATIC

const newPolicy = document.createElement("p");
newPolicy.className = "policy";
newPolicy.textContent = "Travel Insurance";
document.body.appendChild(newPolicy);

console.log("After adding new policy:");
console.log("LIVE HTMLCollection (.policy):", policiesLiveHC.length, "(updates automatically)");
console.log("STATIC NodeList (querySelectorAll .policy):", policiesStaticNL.length, "(does NOT update automatically)");
console.log("Re-query NodeList:", document.querySelectorAll(".policy").length);

/* =========================
   Task 13 – Text Content Filtering
========================= */
const allCustomersNow = document.querySelectorAll("#customerList .customer");
allCustomersNow.forEach((li) => {
  const text = li.textContent;

  if (text.includes("Life")) li.classList.add("highlight");
  if (text.includes("Vehicle")) li.style.display = "none";
});

/* =========================
   Task 14 – Closest & Parent Traversal
========================= */
customerList.addEventListener("click", (e) => {
  const clickedLi = e.target.closest("li");
  if (!clickedLi || !customerList.contains(clickedLi)) return;

  const nearestUl = clickedLi.closest("ul");
  if (nearestUl) nearestUl.style.border = "3px solid #000";
});

/* =========================
   Task 15 – Complex Selector Challenge
========================= */
const policyExceptFirst = document.querySelectorAll("p.policy:not(:first-of-type)");
policyExceptFirst.forEach((p) => {
  p.style.fontStyle = "italic";
  if (!p.textContent.startsWith("✔ ")) p.textContent = "✔ " + p.textContent;
});
