const data = {

    "5":[
    "5a Mathe (Mendel) entfällt (3-4. Stunde)",
    "Englisch Vertretung – Raum 204"
    ],
    
    "6":[
    "Sport entfällt",
    "Deutsch Vertretung – Herr Müller"
    ],
    
    "7":[
    "Keine Vertretungen"
    ],
    
    "8":[
    "Biologie Vertretung – Raum 105"
    ],
    
    "9":[
    "Geschichte entfällt"
    ],
    
    "10":[
    "Chemie Vertretung – Frau Schmidt"
    ],
    
    "11":[
    "Physik Vertretung – Raum 301"
    ],
    
    "KS1":[
    "Mathe Kurs Vertretung"
    ],
    
    "KS2":[
    "Deutsch Kurs entfällt"
    ]
    
    };
    
    
    const select = document.getElementById("classSelect");
    const output = document.getElementById("vertretungsOutput");
    
    select.addEventListener("change", function(){
    
    const value = select.value;
    
    output.innerHTML = "";
    
    if(!value){
    output.innerHTML = "Bitte Klasse auswählen.";
    return;
    }
    
    const list = data[value];
    
    if(list.length === 1 && list[0] === "Keine Vertretungen"){
    output.innerHTML = "<p>Keine Vertretungen.</p>";
    return;
    }
    
    let html = "<ul>";
    
    list.forEach(item=>{
    html += "<li>"+item+"</li>";
    });
    
    html += "</ul>";
    
    output.innerHTML = html;
    
    });