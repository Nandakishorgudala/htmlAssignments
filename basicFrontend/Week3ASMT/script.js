const API_URL = "https://jsonplaceholder.typicode.com/users";
let accounts = [];

// ✅ ADDED (ONLY CHANGE)
let originalAccounts = [];
let isSorted = false;

const loader = document.getElementById("loader");
const table = document.getElementById("accountTable");
const totalBalanceEl = document.getElementById("totalBalance");

function randomBalance() {
  return Math.floor(Math.random() * 40000) + 10000;
}

/* ================= INITIAL LOAD ================= */
async function loadAccounts() {
  loader.style.display = "block";

  try {
    const stored = localStorage.getItem("accounts");

    if (stored) {
      accounts = JSON.parse(stored);

      if (!Array.isArray(accounts)) {
        throw new Error("Invalid local storage data");
      }

    } else {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("API fetch failed");
      }

      const data = await res.json();

      accounts = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        branch: user.address?.city || "Unknown",
        balance: randomBalance(),
        transactions: []
      }));

      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    populateBranches();

    // ✅ STORE ORIGINAL ORDER (ONLY CHANGE)
    originalAccounts = [...accounts];

    render();

  } catch (err) {
    console.error(err);
    alert("Error loading bank data. Resetting application.");
    localStorage.removeItem("accounts");
    location.reload();
  } finally {
    loader.style.display = "none";
  }
}

/* ================= SEARCH & FILTER ================= */
document.getElementById("searchInput").addEventListener("input", render);
document.getElementById("branchFilter").addEventListener("change", render);

function populateBranches() {
  const select = document.getElementById("branchFilter");
  select.innerHTML = `<option value="">🏙 All Branches</option>`;

  const branches = [...new Set(accounts.map(a => a.branch))];
  branches.forEach(branch => {
    const option = document.createElement("option");
    option.value = branch;
    option.textContent = branch;
    select.appendChild(option);
  });
}

/* ================= TRANSACTIONS ================= */
function deposit(id) {
  const amt = +prompt("Enter deposit amount");
  if (amt <= 0) return;

  const acc = accounts.find(a => a.id === id);
  acc.balance += amt;
  acc.transactions.push({ type: "Deposit", amt, time: new Date() });

  saveAndRender();
}

function withdraw(id) {
  const amt = +prompt("Enter withdrawal amount");
  const acc = accounts.find(a => a.id === id);

  if (amt > acc.balance) {
    alert("Insufficient balance");
    return;
  }

  acc.balance -= amt;
  acc.transactions.push({ type: "Withdraw", amt, time: new Date() });

  if (acc.balance < 5000) {
    acc.balance -= 200;
    alert("₹200 penalty applied (Minimum balance rule)");
  }

  saveAndRender();
}

/* ================= CREATE ACCOUNT ================= */
document.getElementById("accountForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const branchInput = document.getElementById("branch").value.trim();

  if (!nameInput || !emailInput || !branchInput) {
    alert("Please fill all fields");
    return;
  }

  const newAccount = {
    id: Date.now(),
    name: nameInput,
    email: emailInput,
    branch: branchInput,
    balance: 10000,
    transactions: []
  };

  accounts.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  // keep original order updated
  originalAccounts = [...accounts];

  render();
  e.target.reset();
});

/* ================= DELETE ACCOUNT ================= */
function deleteAccount(id) {
  if (!confirm("Delete this account?")) return;

  accounts = accounts.filter(acc => acc.id !== id);
  originalAccounts = [...accounts];
  saveAndRender();
}

/* ================= SORT (TOGGLE) ================= */
function sortByBalance() {
  if (!isSorted) {
    accounts = [...accounts].sort((a, b) => b.balance - a.balance);
    isSorted = true;
  } else {
    accounts = [...originalAccounts];
    isSorted = false;
  }

  render();
}

/* ================= RENDER ================= */
function render() {
  table.innerHTML = "";

  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  totalBalanceEl.textContent = total;

  const search = searchInput.value.toLowerCase();
  const branch = branchFilter.value;

  accounts
    .filter(acc =>
      acc.name.toLowerCase().includes(search) &&
      (!branch || acc.branch === branch)
    )
    .forEach(acc => {
      const row = document.createElement("tr");

      if (acc.balance < 5000) {
        row.classList.add("low-balance");
      }

      row.innerHTML = `
        <td>${acc.id}</td>
        <td>${acc.name}</td>
        <td>${acc.email}</td>
        <td>${acc.branch}</td>
        <td>₹${acc.balance}</td>
        <td>
          <button onclick="deposit(${acc.id})">Deposit</button>
          <button onclick="withdraw(${acc.id})">Withdraw</button>
          <button onclick="deleteAccount(${acc.id})">Delete</button>
        </td>
        <td class="history">
          ${acc.transactions.map(t =>
            `${t.type}: ₹${t.amt}<br>${new Date(t.time).toLocaleString()}`
          ).join("<hr>")}
        </td>
      `;

      table.appendChild(row);
    });
}

function saveAndRender() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
  render();
}

loadAccounts();
