const pageTitle = document.getElementById("pageTitle");
pageTitle.textContent = "Customer Insurance Overview";


/* =========================
   Task 2 – Select by Tag Name
   Select all <li> elements and:
   - Add a border
   - Log the total number of customers
========================= */
const allLis = document.getElementsByTagName("li");
for (let i = 0; i < allLis.length; i++) {
  allLis[i].style.border = "1px solid #000";
}
console.log("Total customers (li count):", allLis.length);


/* =========================
   Task 3 – Select by Class Name
   Select all .policy elements and:
   - Add highlight class
   - Change text color to blue
========================= */
const policiesByClass = document.getElementsByClassName("policy");
for (let i = 0; i < policiesByClass.length; i++) {
  policiesByClass[i].classList.add("highlight");
  policiesByClass[i].style.color = "blue";
}


/* =========================
   Task 4 – Select using CSS Selectors
   - Select the first customer only
   - Select all customers
   - Mark the last customer as active
========================= */
const firstCustomer = document.querySelector("#customerList .customer");
console.log("First customer:", firstCustomer?.textContent);

const allCustomersQS = document.querySelectorAll("#customerList .customer");
console.log("All customers (querySelectorAll):", allCustomersQS.length);

const lastCustomer = document.querySelector("#customerList .customer:last-child");
if (lastCustomer) lastCustomer.classList.add("active");


/* =========================
   Task 5 – HTML Object Collections
   Using document collections:
   - Count number of forms
   - Get number of images
   - Change text of all links to “More Info”
========================= */
console.log("Number of forms:", document.forms.length);
console.log("Number of images:", document.images.length);

for (let i = 0; i < document.links.length; i++) {
  document.links[i].textContent = "More Info";
}


/* =========================
   Task 6 – Add a new customer dynamically and observe:
   - Which selections update automatically?
   - Which don’t?
   (We will demonstrate using HTMLCollection vs NodeList)
========================= */
const customerList = document.getElementById("customerList");

// HTMLCollection (LIVE)
const customersLive = document.getElementsByClassName("customer");

// NodeList (STATIC snapshot)
const customersStatic = document.querySelectorAll("#customerList .customer");

const newLi = document.createElement("li");
newLi.className = "customer";
newLi.textContent = "Sita – Travel";
customerList.appendChild(newLi);

console.log("After adding new customer:");
console.log("LIVE HTMLCollection (.customer):", customersLive.length, "(updates automatically)");
console.log("STATIC NodeList (querySelectorAll):", customersStatic.length, "(does NOT update automatically)");

/* If you want updated NodeList, re-query: */
const customersStaticUpdated = document.querySelectorAll("#customerList .customer");
console.log("Updated NodeList after re-query:", customersStaticUpdated.length);


/* =========================
   Task 7 – Attribute-Based Selection
   Select only input fields whose type is "text" using CSS selectors and:
   - Add a yellow background
   - Add placeholder text: "Enter Full Name"
========================= */
const textInputs = document.querySelectorAll('input[type="text"]');
textInputs.forEach((inp) => {
  inp.style.backgroundColor = "yellow";
  inp.placeholder = "Enter Full Name";
});


/* =========================
   Task 8 – Multiple Class Selection
   Select all elements that have both customer and active classes and:
   - Change text color to dark green
   - Add text (Priority Customer) at the end
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
   - Select all <li> elements inside #customerList using a descendant selector
   - Select only direct child <li> using a child selector
   Log the difference in console.
========================= */
const descendantLis = document.querySelectorAll("#customerList li");    // any depth
const childLis = document.querySelectorAll("#customerList > li");       // direct children only

console.log("Descendant selector count (#customerList li):", descendantLis.length);
console.log("Child selector count (#customerList > li):", childLis.length);


/* =========================
   Task 10 – Even / Odd Selection (CSS Pseudo Selectors)
   Using querySelectorAll():
   - Highlight even customers in light gray
   - Highlight odd customers in light blue
   Hint: :nth-child()
========================= */
const evenCustomers = document.querySelectorAll("#customerList > li:nth-child(even)");
evenCustomers.forEach((li) => (li.style.backgroundColor = "lightgray"));

const oddCustomers = document.querySelectorAll("#customerList > li:nth-child(odd)");
oddCustomers.forEach((li) => (li.style.backgroundColor = "lightblue"));


/* =========================
   Task 11 – Form Elements Collection
   Using HTML form object model:
   - Access the enquiry form
   - Log all input field names
   - Disable the submit button
   Hint: document.forms["formId"].elements
========================= */
const enquiryForm = document.forms["enquiryForm"]; // works because id="enquiryForm"
if (enquiryForm) {
  const elems = enquiryForm.elements;

  for (let i = 0; i < elems.length; i++) {
    // log only inputs (optional), but we can log all element names
    console.log("Form element:", elems[i].tagName, "name=", elems[i].name);
  }

  // disable submit button (button[type="submit"])
  const submitBtn = enquiryForm.querySelector('button[type="submit"], input[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;
}


/* =========================
   Task 12 – NodeList vs HTMLCollection
   Select policies using:
   - getElementsByClassName
   - querySelectorAll
   Dynamically add a new policy
   Observe which collection updates automatically
========================= */
const policiesLiveHC = document.getElementsByClassName("policy"); // LIVE HTMLCollection
const policiesStaticNL = document.querySelectorAll(".policy");    // STATIC NodeList

const newPolicy = document.createElement("p");
newPolicy.className = "policy";
newPolicy.textContent = "Travel Insurance";
document.body.appendChild(newPolicy);

console.log("After adding new policy:");
console.log("LIVE HTMLCollection (.policy):", policiesLiveHC.length, "(updates automatically)");
console.log("STATIC NodeList (querySelectorAll .policy):", policiesStaticNL.length, "(does NOT update automatically)");

const policiesStaticNLUpdated = document.querySelectorAll(".policy");
console.log("Updated NodeList after re-query:", policiesStaticNLUpdated.length);


/* =========================
   Task 13 – Text Content Filtering
   Select all customers and:
   - Highlight customers whose policy includes "Life"
   - Hide customers whose policy includes "Vehicle"
   Hint: textContent.includes()
========================= */
const allCustomersNow = document.querySelectorAll("#customerList .customer");
allCustomersNow.forEach((li) => {
  const text = li.textContent;

  if (text.includes("Life")) {
    li.classList.add("highlight");
  }

  if (text.includes("Vehicle")) {
    li.style.display = "none";
  }
});


/* =========================
   Task 14 – Closest & Parent Traversal
   When clicking any customer <li>:
   - Find the nearest <ul>
   - Add a border to it
   Hint: closest()
========================= */
customerList.addEventListener("click", (e) => {
  const clickedLi = e.target.closest("li");
  if (!clickedLi || !customerList.contains(clickedLi)) return;

  const nearestUl = clickedLi.closest("ul");
  if (nearestUl) {
    nearestUl.style.border = "3px solid #000";
  }
});


/* =========================
   Task 15 – Complex Selector Challenge
   Select:
   - All policy <p> elements except the first one
   and:
   - Change font style to italic
   - Prefix text with "✔ "
   Hint: :not() and :first-child
========================= */
// NOTE: Safer to target .policy paragraphs directly.
const policyExceptFirst = document.querySelectorAll('p.policy:not(:first-of-type)');
policyExceptFirst.forEach((p) => {
  p.style.fontStyle = "italic";
  if (!p.textContent.startsWith("✔ ")) {
    p.textContent = "✔ " + p.textContent;
  }
});