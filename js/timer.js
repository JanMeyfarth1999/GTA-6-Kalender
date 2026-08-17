// ========================================
// GTA 6 RELEASE COUNTDOWN
// ========================================


// Offizielles Release-Datum von GTA VI
const gta6Release =
    new Date(2026, 10, 19, 0, 0, 0);


// HTML-Elemente holen
const countdownTage =
    document.getElementById("countdownTage");

const countdownStunden =
    document.getElementById("countdownStunden");

const countdownMinuten =
    document.getElementById("countdownMinuten");

const countdownSekunden =
    document.getElementById("countdownSekunden");


// ========================================
// COUNTDOWN BERECHNEN
// ========================================

function countdownAktualisieren() {

    // Aktuelle Zeit
    const jetzt = new Date();


    // Unterschied zwischen Release und jetzt
    const unterschied =
        gta6Release - jetzt;


    // ========================================
    // RELEASE ERREICHT
    // ========================================

    if (unterschied <= 0) {

        countdownTage.textContent = "0";
        countdownStunden.textContent = "0";
        countdownMinuten.textContent = "0";
        countdownSekunden.textContent = "0";

        return;
    }


    // ========================================
    // ZEIT BERECHNEN
    // ========================================

    // Tage
    const tage =
        Math.floor(
            unterschied /
            (1000 * 60 * 60 * 24)
        );


    // Stunden
    const stunden =
        Math.floor(
            (unterschied /
            (1000 * 60 * 60)) % 24
        );


    // Minuten
    const minuten =
        Math.floor(
            (unterschied /
            (1000 * 60)) % 60
        );


    // Sekunden
    const sekunden =
        Math.floor(
            (unterschied / 1000) % 60
        );


    // ========================================
    // IM HTML ANZEIGEN
    // ========================================

    countdownTage.textContent =
        tage;

    countdownStunden.textContent =
        String(stunden).padStart(2, "0");

    countdownMinuten.textContent =
        String(minuten).padStart(2, "0");

    countdownSekunden.textContent =
        String(sekunden).padStart(2, "0");
}


// Beim Start sofort berechnen
countdownAktualisieren();


// Danach jede Sekunde aktualisieren
setInterval(
    countdownAktualisieren,
    1000
);