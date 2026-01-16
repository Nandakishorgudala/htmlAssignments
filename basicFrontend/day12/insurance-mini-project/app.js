/***********************
 * Day 12 Assignment - Insurance Mini Project
 * Implements:
 * 1) Fetch + async/await + try/catch
 * 2) Display policies (arrays/objects)
 * 3) Filter (filter)
 * 4) Total premium of Active (reduce)
 * 5) 10% discount above ₹10,000 (map)
 * 6) Approval simulation (callback + setTimeout)
 * 7) Promise-based purchase
 * 8) Error handling (invalid id, API failure, premium calc error)
 ***********************/

// Local data (from PDF)
const policiesData = [
  { id: 1, name: "Health Plus", type: "Health", premium: 12000, duration: 1, status: "Active" },
  { id: 2, name: "Life Secure", type: "Life", premium: 9000, duration: 10, status: "Inactive" },
  { id: 3, name: "Car Protect", type: "Vehicle", premium: 7000, duration: 1, status: "Active" },
  { id: 4, name: "Family Health", type: "Health", premium: 15000, duration: 2, status: "Active" }
];

let policies = [];         // fetched policies
let visiblePolicies = [];  // currently displayed (after filter)

const ui = {
  grid: document.getElementById("policiesGrid"),
  totalPremium: document.getElementById("totalPremium"),
  statusBox: document.getElementById("statusBox"),
  btnFetch: document.getElementById("btnFetch"),
  btnDiscount: document.getElementById("btnDiscount"),
  filterButtons: document.querySelectorAll("[data-filter]"),
  policyIdInput: document.getElementById("policyIdInput"),
  btnApproveCb: document.getElementById("btnApproveCb"),
  btnPurchasePromise: document.getElementById("btnPurchasePromise"),
};

function setStatus(message, isError = false) {
  ui.statusBox.textContent = message;
  ui.statusBox.style.borderColor = isError ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.08)";
}

/** Utility: money format */
function formatINR(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "₹0";
  return "₹" + n.toLocaleString("en-IN");
}

/** Task 1: Fetch Insurance Policies (simulate API) */
function mockFetchPolicies({ shouldFail = false, delayMs = 600 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("API Failure: Unable to fetch policies"));
      else resolve(structuredClone(policiesData)); // clone so we don't mutate original
    }, delayMs);
  });
}

async function fetchPolicies() {
  try {
    setStatus("Fetching policies...");
    // flip to true to test API failure:
    const shouldFail = false;

    const data = await mockFetchPolicies({ shouldFail, delayMs: 700 });
    policies = data;
    visiblePolicies = [...policies];

    renderPolicies(visiblePolicies);
    updateTotalPremium(); // Task 4
    setStatus(`Fetched ${policies.length} policies successfully.`);
  } catch (err) {
    setStatus(err.message, true);
    policies = [];
    visiblePolicies = [];
    renderPolicies([]);
    updateTotalPremium();
  }
}

/** Task 2: Display Policies (dynamic UI render) */
function renderPolicies(list) {
  ui.grid.innerHTML = "";

  if (!list || list.length === 0) {
    ui.grid.innerHTML = `<div class="muted">No policies to display.</div>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "policy";

    const isActive = String(p.status).toLowerCase() === "active";
    const badgeClass = isActive ? "badge active" : "badge inactive";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="${badgeClass}">${p.status}</div>

      <div class="meta">
        <div><span>ID</span><strong>${p.id}</strong></div>
        <div><span>Type</span><strong>${p.type}</strong></div>
        <div><span>Premium</span><strong>${formatINR(p.premium)}</strong></div>
        <div><span>Duration</span><strong>${p.duration} year(s)</strong></div>
      </div>
    `;

    fragment.appendChild(card);
  });

  ui.grid.appendChild(fragment);
}

/** Task 3: Filter Policies (filter) */
function applyFilter(type) {
  if (!policies || policies.length === 0) {
    setStatus("No policies loaded. Click 'Fetch Policies' first.", true);
    return;
  }

  if (type === "All") visiblePolicies = [...policies];
  else visiblePolicies = policies.filter((p) => p.type === type);

  renderPolicies(visiblePolicies);
  updateTotalPremium();
  setStatus(`Filter applied: ${type}`);
}

/** Task 4: Calculate Total Premium (reduce) of Active policies */
function updateTotalPremium() {
  try {
    // Simulate a "premium calculation error" if data is corrupted
    const total = (visiblePolicies || [])
      .filter((p) => String(p.status).toLowerCase() === "active")
      .reduce((sum, p) => {
        if (!Number.isFinite(Number(p.premium))) {
          throw new Error(`Premium calculation error: invalid premium for policy ID ${p.id}`);
        }
        return sum + Number(p.premium);
      }, 0);

    ui.totalPremium.textContent = formatINR(total);
  } catch (err) {
    ui.totalPremium.textContent = "₹0";
    setStatus(err.message, true);
  }
}

/** Task 5: Premium Discount Logic (map) => 10% off above ₹10,000 */
function applyDiscount() {
  if (!policies || policies.length === 0) {
    setStatus("No policies loaded. Fetch policies first.", true);
    return;
  }

  policies = policies.map((p) => {
    const premiumNum = Number(p.premium);
    if (!Number.isFinite(premiumNum)) return p;

    if (premiumNum > 10000) {
      const discounted = Math.round(premiumNum * 0.9); // 10% discount
      return { ...p, premium: discounted };
    }
    return p;
  });

  // re-apply current filter to keep UI consistent
  const currentFilter = getActiveFilter();
  applyFilter(currentFilter);

  setStatus("Discount applied: 10% off for premiums above ₹10,000.");
}

function getActiveFilter() {
  // Simple way: read last selected filter from UI state
  // If none, default All
  const activeBtn = document.querySelector(".btn[data-filter].active");
  return activeBtn ? activeBtn.getAttribute("data-filter") : "All";
}

/** Task 6: Policy Approval Simulation (Callback + setTimeout) */
function approvePolicyCallback(policyId, callback) {
  setTimeout(() => {
    try {
      const policy = policies.find((p) => p.id === policyId);
      if (!policy) throw new Error("Invalid policy ID. Cannot approve.");

      // simulate approval: mark status Active
      policy.status = "Active";
      callback(null, policy);
    } catch (err) {
      callback(err);
    }
  }, 2000);
}

/** Task 7: Promise-based Policy Purchase (convert callback to Promise) */
function purchasePolicyPromise(policyId) {
  return new Promise((resolve, reject) => {
    // simulate success/failure rules:
    // - invalid ID => reject
    // - inactive policy => approve first (simulate approval) then resolve
    // - also simulate random failure (small chance)
    const failChance = Math.random();

    if (!Number.isInteger(policyId)) {
      reject(new Error("Invalid policy ID (not an integer)."));
      return;
    }

    const policy = policies.find((p) => p.id === policyId);
    if (!policy) {
      reject(new Error("Invalid policy ID. Purchase failed."));
      return;
    }

    // Simulate random failure (10%)
    if (failChance < 0.10) {
      reject(new Error("Purchase failed due to payment gateway error (simulated)."));
      return;
    }

    // If inactive, approve with delay then resolve
    if (String(policy.status).toLowerCase() !== "active") {
      approvePolicyCallback(policyId, (err, approvedPolicy) => {
        if (err) reject(err);
        else resolve({ message: "Purchase successful after approval!", policy: approvedPolicy });
      });
      return;
    }

    // already active: resolve immediately
    resolve({ message: "Purchase successful!", policy });
  });
}

/** Task 8: Error Handling is integrated throughout:
 * - API failure (fetchPolicies try/catch)
 * - invalid policy ID (approvePolicyCallback / purchasePolicyPromise)
 * - premium calculation error (updateTotalPremium try/catch)
 */

/** UI Wiring */
ui.btnFetch.addEventListener("click", fetchPolicies);

ui.filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // UI active state
    ui.filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.getAttribute("data-filter");
    applyFilter(type);
  });
});

ui.btnDiscount.addEventListener("click", applyDiscount);

ui.btnApproveCb.addEventListener("click", () => {
  const id = Number(ui.policyIdInput.value);

  if (!Number.isInteger(id)) {
    setStatus("Please enter a valid Policy ID (integer).", true);
    return;
  }

  if (!policies || policies.length === 0) {
    setStatus("Fetch policies first.", true);
    return;
  }

  setStatus("Approving policy... (2 seconds)");
  approvePolicyCallback(id, (err, approvedPolicy) => {
    if (err) {
      setStatus(err.message, true);
      return;
    }
    renderPolicies(visiblePolicies);
    updateTotalPremium();
    setStatus(`Approved: ${approvedPolicy.name} (ID ${approvedPolicy.id})`);
  });
});

ui.btnPurchasePromise.addEventListener("click", async () => {
  const id = Number(ui.policyIdInput.value);

  if (!Number.isInteger(id)) {
    setStatus("Please enter a valid Policy ID (integer).", true);
    return;
  }

  if (!policies || policies.length === 0) {
    setStatus("Fetch policies first.", true);
    return;
  }

  try {
    setStatus("Purchasing policy...");

    const result = await purchasePolicyPromise(id);

    // refresh current view
    const currentFilter = getActiveFilter();
    applyFilter(currentFilter);

    setStatus(`${result.message} (${result.policy.name})`);
  } catch (err) {
    setStatus(err.message, true);
  }
});

// Initial state
setStatus("Ready. Click 'Fetch Policies' to begin.");
