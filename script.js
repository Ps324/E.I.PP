const data = {

    "5":[
    "5a Mathe (Me) 3-4 entfällt",
    "5d Englisch (Meu -> And) 5-6 Vertretung"
    ],
    
    "6":[
    "6c Sport (Ft) 1-2 entfällt",
    "Deutsch (Sor -> Wek) 5-6 Vertretung"
    ],
    
    "7":[
    "Keine Vertretungen"
    ],
    
    "8":[
    "Biologie (Seg -> Ve) 3-4 Vertretung"
    ],
    
    "9":[
    "Geschichte (Ruh) 8-9 entfällt"
    ],
    
    "10":[
    "Chemie (Ga -> Enr) 3-4 Vertretung"
    ],
    
    "11":[
    "Physik (Len) 1-2 Raumwechsel 301 -> 306"
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