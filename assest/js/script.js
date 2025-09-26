/*****************************************************
 *  LOGIN PAGE – redirect only when #loginForm submits
 *****************************************************/
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();   // stop real submit
    alert("Login successful! Redirecting to home page...");
    window.location.href = "home.html";   // ✅ redirect only for login
  });
}

/*****************************************************
 *  NAV TOGGLE (Mobile menu)
 *****************************************************/
 const menuToggle = document.getElementById('menuToggle');
  const navMenu   = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

/*****************************************************
 *  DEFINE SYSTEM – Add Info Popup + Child Table
 *****************************************************/
const modal   = document.getElementById('infoModal');
const closeBtn = modal ? modal.querySelector('.ds-close') : null;
let currentRow = null;

document.addEventListener('click', e => {

  // --- three dots menu open/close ---
  if (e.target.closest('.ds-dots')) {
    const drop = e.target.closest('.ds-menu').querySelector('.ds-dropdown');
    document.querySelectorAll('.ds-dropdown').forEach(d => d.style.display = 'none');
    drop.style.display = 'flex';
    return;
  }

  // close any dropdown if clicked outside
  if (!e.target.closest('.ds-dropdown')) {
    document.querySelectorAll('.ds-dropdown').forEach(d => d.style.display = 'none');
  }

  // --- Add Info (open popup) ---
  if (e.target.closest('.add-info')) {
    e.preventDefault();
    currentRow = e.target.closest('tr');
    if (modal) modal.style.display = 'flex';
    return;
  }

  // --- Expand / Collapse child table ---
  if (e.target.classList.contains('ds-expand')) {
    const tr = e.target.closest('tr');
    if (tr.nextElementSibling && tr.nextElementSibling.classList.contains('child')) {
      tr.nextElementSibling.remove();
      e.target.textContent = '+';
    } else {
      const sub = document.createElement('tr');
      sub.className = 'child';
      sub.innerHTML = `<td colspan="6">
        <table class="child-table">
          <thead><tr>
            <th>STANDARD DOC REF</th>
            <th>DOC TITLE</th>
            <th>DOC NO</th>
            <th>DOC VERSION</th>
            <th>EFFECTIVE DATE</th>
            <th>STATUS</th>
          </tr></thead>
          <tbody></tbody>
        </table>
      </td>`;
      tr.after(sub);
      e.target.textContent = '–';
    }
  }
});

// --- Close popup when X or outside clicked ---
if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

/*****************************************************
 *  SAVE Add Info details
 *****************************************************/
const infoForm = document.getElementById('infoForm');
if (infoForm) {
  infoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());

    // ensure child table exists
    let child = currentRow.nextElementSibling;
    if (!child || !child.classList.contains('child')) {
      currentRow.querySelector('.ds-expand').click();
      child = currentRow.nextElementSibling;
    }

    const tbody = child.querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.docRef}</td>
      <td>${data.docTitle}</td>
      <td>${data.docNo}</td>
      <td>${data.docVer}</td>
      <td>${data.effDate}</td>
      <td>${data.status}</td>`;
    tbody.appendChild(row);

    modal.style.display = 'none';
    this.reset();
  });
}
