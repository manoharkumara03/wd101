document.addEventListener("DOMContentLoaded", loadEntriesFromLocalStorage);

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  if (!validateAge(dob)) {
    document.getElementById("error-message").textContent =
      "Please enter a valid date of birth between the ages of 18 and 55.";
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById("error-message").textContent =
      "Please enter a valid email address.";
    return;
  }

  document.getElementById("error-message").textContent = "";

  const userTable = document.getElementById("userTable");
  const userTableBody = userTable.querySelector("tbody");
  const newRow = userTableBody.insertRow();
  const cells = [name, email, password, dob, terms];

  cells.forEach((cellData, index) => {
    const cell = newRow.insertCell(index);
    cell.textContent = cellData;
  });

  saveEntryToLocalStorage(cells);

  document.getElementById("registrationForm").reset();
}

function validateAge(dob) {
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = currentDate.getFullYear() - userDOB.getFullYear();
  return age >= 18 && age <= 55;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function saveEntryToLocalStorage(cells) {
  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  entries.push(cells);
  localStorage.setItem("userEntries", JSON.stringify(entries));
  loadEntriesFromLocalStorage(); // Reload entries after saving
}

function loadEntriesFromLocalStorage() {
  const userTableBody = document
    .getElementById("userTable")
    .querySelector("tbody");
  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];

  userTableBody.innerHTML = "";

  entries.forEach((entry) => {
    const newRow = userTableBody.insertRow();
    entry.forEach((cellData, index) => {
      const cell = newRow.insertCell(index);
      cell.textContent = cellData;
    });
  });
}
