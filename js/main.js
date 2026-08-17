// ========================================
// HEUTIGES DATUM
// ========================================

const heute = new Date();

const heuteTagMonatJahr = heute.toLocaleDateString("de-DE",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
);


// ========================================
// ÜBERSCHRIFT
// ========================================

document.getElementById("main-headline").innerHTML =
    "Kalenderdatenblatt<br><br>vom<br><br> " + heuteTagMonatJahr;


// ========================================
// MONATSNAMEN
// ========================================

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