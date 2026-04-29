const allergenIcons = {
  "1": "🧂",   // Phosphat
  "2": "🧠",   // Geschmacksverstärker
  "3": "🍋",   // Antioxidationsmittel
  "4": "🫙",   // Konservierungsstoff
  "5": "🥓",   // Nitritpökelsalz
  "6": "🎨",   // Farbstoff
  "7": "🍬",   // Süßstoff
  "8": "🍸",   // Chininhaltig
  "9": "🍇",   // Geschwefelt
  "10": "☕",  // Koffein
  "11": "🍏",  // Gewachst
  "12": "⚫",  // Geschwärzt
  "13": "🐄",  // Milcheiweiß
  "14": "🥚",  // Eiklar
  "15": "🌽",  // Stärke
  "16": "📦",  // Verpackungshinweis
  "17": "🌾",
  "18": "🦐",
  "19": "🥚",
  "20": "🐟",
  "21": "🥜",
  "22": "🫘",
  "23": "🥛",
  "24": "🌰",
  "25": "🥬",
  "26": "🌭",
  "27": "🌱",
  "28": "🍷",
  "29": "🌿",
  "30": "🦪"
};

function replaceAllergens(text) {
  return text.replace(/\(([\d,]+)\)/g, (match, numbers) => {
    const links = numbers
      .split(",")
      .map(num => {
        const icon = allergenIcons[num.trim()];
        if (!icon) return "";
        return `<a href="#allergen-${num.trim()}" class="allergen-link">${icon}</a>`;
      })
      .join(" ");
    return links ? ` ${links}` : "";
  });
}

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

  async function loadMenu() {
    try {
      const response = await fetch("speiseplan.json");
      const data = await response.json();
  
      const tableBody = document.getElementById("menuTableBody");
      tableBody.innerHTML = "";
  
      // Mapping für bessere Anzeige
      const dayMap = {
        "Mo": "Montag",
        "Di": "Dienstag",
        "Mi": "Mittwoch",
        "Do": "Donnerstag",
        "Fr": "Freitag"
      };
  
      for (const [date, menus] of Object.entries(data)) {
        const row = document.createElement("tr");
  
        // Tag extrahieren (Mi. → Mittwoch)
        const shortDay = date.split(".")[0];
        const dayName = dayMap[shortDay] || date;
  
        // Menü 1 und 2 finden
        const menu1 = menus.find(m => m.menu === "Menü 1");
        const menu2 = menus.find(m => m.menu === "Menü 2");
  
        row.innerHTML = `
          <td data-label="Tag">${dayName}</td>
          <td data-label="Menü 1">
          ${menu1 ? replaceAllergens(menu1.title) + "<br><small>" + replaceAllergens(menu1.description) + "</small>" : "-"}
          </td>
          <td data-label="Menü 2">
          ${menu2 ? replaceAllergens(menu2.title) + "<br><small>" + replaceAllergens(menu2.description) + "</small>" : "-"}
          </td>
          <td data-label="Preis">3,00 € / 4,30 €</td>
        `;
  
        tableBody.appendChild(row);
      }
  
    } catch (error) {
      console.error("Fehler beim Laden des Speiseplans:", error);
    }
  }
  
  // Beim Laden der Seite ausführen
  loadMenu();