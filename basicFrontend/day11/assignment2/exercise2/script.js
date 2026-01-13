const policyContainer = document.getElementById("policyContainer");
const viewPolicyBtn = document.getElementById("viewPolicyBtn");
const logBox = document.getElementById("log");

function log(msg) {
  console.log(msg);
  logBox.innerHTML += msg + "<br>";
}

/*
  Capturing phase = true (or { capture: true })
  This makes the event flow top -> down (parent -> child)
*/

// 1) Parent listener in CAPTURING phase
policyContainer.addEventListener(
  "click",
  () => {
    log("Parent (Container): Validating user before showing policy...");
  },
  true // capture = true
);

// 2) Child listener in CAPTURING phase
viewPolicyBtn.addEventListener(
  "click",
  () => {
    log("Child (Button): Showing policy details.");
  },
  true // capture = true
);
