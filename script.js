//  // ✅ Load contacts from localStorage OR start empty
// let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// // ✅ In-memory JSON mirror
// let contactsJSON = { contacts: contacts };

// // ✅ Get edit index (if editing)
// let editIndex = localStorage.getItem("editIndex");

// // ✅ Display contacts (as cards)
// function displayContacts(list = contacts) {
//   const container = document.getElementById("contactList");
//   if (!container) return;

//   container.innerHTML = "";

//   if (list.length === 0) {
//     container.innerHTML = "<p style='text-align:center;color:#777;'>No contacts found.</p>";
//     return;
//   }

//   list.forEach((c, index) => {
//     const card = document.createElement("div");
//     card.className = "contact-card";
//     card.innerHTML = `
//       <h2>${c.firstName} ${c.lastName}</h2>
//       <p>📞 ${c.phone}</p>
//       <p>📧 ${c.email}</p>
//       <div class="card-buttons">
//         <button class="edit" onclick="editContact(${index})">✏️ Edit</button>
//         <button class="delete" onclick="deleteContact(${index})">🗑️ Delete</button>
//       </div>
//     `;
//     container.appendChild(card);
//   });
// }

// // ✅ Display on load (for index.html)
// displayContacts();

// // ✅ Save (Add/Edit) Contact
// function saveContact(e) {
//   e.preventDefault();

//   const contact = {
//     firstName: document.getElementById("firstName").value.trim(),
//     lastName: document.getElementById("lastName").value.trim(),
//     phone: document.getElementById("phone").value.trim(),
//     email: document.getElementById("email").value.trim()
//   };

//   if (editIndex !== null && editIndex !== "null") {
//     contacts[editIndex] = contact;
//     localStorage.removeItem("editIndex");
//   } else {
//     contacts.push(contact);
//   }

//   localStorage.setItem("contacts", JSON.stringify(contacts));
//   contactsJSON.contacts = contacts;

//   console.log("✅ Saved JSON Object (in-memory):", contactsJSON);
//   window.location.href = "index.html";
// }

// // ✅ Edit Contact
// function editContact(index) {
//   localStorage.setItem("editIndex", index);
//   window.location.href = "form.html";
// }

// // ✅ Pre-fill form for editing
// if (document.getElementById("contactForm") && editIndex !== null && editIndex !== "null") {
//   const c = contacts[editIndex];
//   document.getElementById("firstName").value = c.firstName;
//   document.getElementById("lastName").value = c.lastName;
//   document.getElementById("phone").value = c.phone;
//   document.getElementById("email").value = c.email;
//   document.getElementById("formTitle").textContent = "✏️ EDIT CONTACT";
// }

// // ✅ Delete Contact
// function deleteContact(index) {
//   if (confirm("Are you sure you want to delete this contact?")) {
//     contacts.splice(index, 1);
//     localStorage.setItem("contacts", JSON.stringify(contacts));
//     contactsJSON.contacts = contacts;

//     console.log("🗑️ Updated JSON Object:", contactsJSON);
//     displayContacts();
//   }
// }

// // ✅ Search Contacts
// function searchContacts() {
//   const value = document.getElementById("search").value.toLowerCase();
//   const filtered = contacts.filter(c =>
//     c.firstName.toLowerCase().includes(value) ||
//     c.lastName.toLowerCase().includes(value)
//   );
//   displayContacts(filtered);
// }

// // ✅ Sort Contacts
// function sortContacts() {
//   const order = document.getElementById("sort").value;
//   contacts.sort((a, b) => {
//     const nameA = a.firstName.toLowerCase();
//     const nameB = b.firstName.toLowerCase();
//     return order === "asc"
//       ? nameA.localeCompare(nameB)
//       : nameB.localeCompare(nameA);
//   });

//   contactsJSON.contacts = contacts;
//   displayContacts();
// }

// // ✅ Cancel
// function cancel() {
//   localStorage.removeItem("editIndex");
//   window.location.href = "index.html";
// }


















// ✅ Load contacts from localStorage OR start empty
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// ✅ In-memory JSON mirror
let contactsJSON = { contacts: contacts };

// ✅ Get edit index (if editing)
let editIndex = localStorage.getItem("editIndex");

// ✅ Display contacts (only names initially)
function displayContacts(list = contacts) {
  const container = document.getElementById("contactList");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#777;'>No contacts found.</p>";
    return;
  }

  list.forEach((c, index) => {
    const card = document.createElement("div");
    card.className = "contact-card";

    // Contact name clickable header
    card.innerHTML = `
      <h2 class="contact-name" onclick="toggleDetails(${index})">${c.firstName} ${c.lastName}</h2>
      <div class="contact-details" id="details-${index}" style="display:none;">
        <p>📞 ${c.phone}</p>
        <p>📧 ${c.email}</p>
        <div class="card-buttons">
          <button class="edit" onclick="editContact(${index})">✏️ Edit</button>
          <button class="delete" onclick="deleteContact(${index})">🗑️ Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ✅ Toggle details visibility when a name is clicked
function toggleDetails(index) {
  const detailsDiv = document.getElementById(`details-${index}`);
  const isVisible = detailsDiv.style.display === "block";
  detailsDiv.style.display = isVisible ? "none" : "block";
}

// ✅ Display on load (for index.html)
displayContacts();

// ✅ Save (Add/Edit) Contact
function saveContact(e) {
  e.preventDefault();

  const contact = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim()
  };

  if (editIndex !== null && editIndex !== "null") {
    contacts[editIndex] = contact;
    localStorage.removeItem("editIndex");
  } else {
    contacts.push(contact);
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  contactsJSON.contacts = contacts;
  window.location.href = "index.html";
}

// ✅ Edit Contact
function editContact(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "form.html";
}

// ✅ Pre-fill form for editing
if (document.getElementById("contactForm") && editIndex !== null && editIndex !== "null") {
  const c = contacts[editIndex];
  document.getElementById("firstName").value = c.firstName;
  document.getElementById("lastName").value = c.lastName;
  document.getElementById("phone").value = c.phone;
  document.getElementById("email").value = c.email;
  document.getElementById("formTitle").textContent = "✏️ EDIT CONTACT";
}

// ✅ Delete Contact
function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    contactsJSON.contacts = contacts;
    displayContacts();
  }
}

// ✅ Search Contacts
function searchContacts() {
  const value = document.getElementById("search").value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.firstName.toLowerCase().includes(value) ||
    c.lastName.toLowerCase().includes(value)
  );
  displayContacts(filtered);
}

// ✅ Sort Contacts
function sortContacts() {
  const order = document.getElementById("sort").value;
  contacts.sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    return order === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  contactsJSON.contacts = contacts;
  displayContacts();
}

// ✅ Cancel
function cancel() {
  localStorage.removeItem("editIndex");
  window.location.href = "index.html";
}

