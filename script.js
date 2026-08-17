// Überschrift
const heute = new Date();
const datum = heute.toLocaleDateString("de-DE",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
);
const heuteTagMonatJahr = heute.toLocaleDateString("de-DE",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
);
document.getElementById("main-headline").innerHTML =
    "Kalenderdatenblatt<br><br>vom<br><br> " + heuteTagMonatJahr;

// Dynamischer Kalender 
const kalenderMonat = document.getElementById("kalenderMonat")
const KalenderTage = document.getElementById("kalenderTage")
// Monatsnamen
const monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];
// Aktueller Monat und aktuelles Jahr
const aktuellerMonat = heute.getMonth();
const aktuellesJahr = heute.getFullYear();
// Monatsüberschrift anzeigen 
kalenderMonat.textContent = monate[aktuellerMonat] + " " + aktuellesJahr;
//Anzahl der Tage im aktuellen Monat
const tageImMonat = new Date(aktuellesJahr, aktuellerMonat + 1, 0).getDate();
//Wochentag des ersten Tages
let ersterWochentag = new Date(aktuellesJahr, aktuellerMonat, 1).getDay();
ersterWochentag = (ersterWochentag + 6) % 7;
//leere Felder vor dem ersten Tag erzeugen 
for(let i = 0; i < ersterWochentag; i++) {
    const leer = document.createElement("div");
    KalenderTage.appendChild(leer);
}
//Tageszahlen erzeugen
for(let tag = 1; tag <= tageImMonat; tag++) {
    const tagElement = document.createElement("div");
    tagElement.textContent = tag;
    tagElement.classList.add("kalenderTag")
        //Prüfen ob dieser Tag heute ist
        if(tag === heute.getDate()) {
            tagElement.classList.add("heute");
            //Fadenkreuz erstellen.
            const fadenkreuz = document.createElement("img");
            fadenkreuz.src = "images/icons/Fadenkreuz.png";
            fadenkreuz.classList.add("fadenkreuz");
            tagElement.appendChild(fadenkreuz);
        }
    KalenderTage.appendChild(tagElement);

}

