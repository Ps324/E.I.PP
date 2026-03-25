const data = {

    "5":[
    "5a Mathe (Me) 3-4 entfällt",
    "5d Englisch (Meu -> And) 5-6 Vertretung"
    ],
    
    "6":[
    "6c Sport (Ft) 1-2 entfällt",
    "6c Deutsch (Sor -> Wek) 5-6 Vertretung"
    ],
    "7": [
      "Keine Vertretungen"
    ],
    
    "8":[
    "8d Biologie (Seg -> Ve) 3-4 Vertretung"
    ],
    
    "9":[
    "9d Geschichte (Ruh) 8-9 entfällt"
    ],
    
    "10":[
    "10c Chemie (Ga -> Enr) 3-4 Vertretung"
    ],
    
    "11":[
    "11a Physik (Len) 1-2 Raumwechsel 301 -> 306"
    ],
    
    "KS1":[
    "Mathe Leistungskurs (Men) 8-9 Entfällt"
    ],
    
    "KS2":[
    "Deutsch Basiskurs (Sor) 1-2 Entfällt"
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