const data = {
    "5": [
      "5a Mathe (Mendel) entfällt (3.–4. Stunde)",
      "Englisch Vertretung – Raum 204"
    ],
    "6": [
      "Sport entfällt",
      "Deutsch Vertretung – Herr Schork"
    ],
    "7": [
      "Keine Vertretungen"
    ],
    "8": [
      "Biologie Vertretung – Raum 105"
    ],
    "9": [
      "Geschichte entfällt"
    ],
    "10": [
      "Chemie Vertretung – Frau Gade"
    ],
    "11": [
      "Physik Vertretung – Raum 301"
    ],
    "KS1": [
      "Mathe Kurs Vertretung"
    ],
    "KS2": [
      "Deutsch Kurs entfällt"
    ]
  };
  
  const select = document.getElementById("classSelect");
  const output = document.getElementById("vertretungsOutput");
  
  function renderOutput(value) {
    output.innerHTML = "";
  
    if (!value) {
      output.innerHTML = '<p class="output-empty">Bitte Klasse auswählen.</p>';
      return;
    }
  
    const list = data[value] || [];
  
    if (list.length === 1 && list[0] === "Keine Vertretungen") {
      output.innerHTML = `
        <div class="status-card success">
          <p><strong>Gute Nachricht:</strong> Für diese Klassenstufe gibt es aktuell keine Vertretungen.</p>
        </div>
      `;
      return;
    }
  
    let html = '<ul class="output-list">';
    list.forEach((item) => {
      html += `<li>${item}</li>`;
    });
    html += '</ul>';
  
    output.innerHTML = html;
  }
  
  select.addEventListener("change", () => {
    renderOutput(select.value);
  });
  
  renderOutput("");