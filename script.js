// ===========
// ÜBERSCHRIFT
// ===========

const heute = new Date();

const heuteTagMonatJahr = heute.toLocaleDateString("de-DE",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
);

document.getElementById("main-headline").innerHTML =
    "Kalenderdatenblatt<br><br>vom<br><br> " + heuteTagMonatJahr;


// ====================
// DYNAMISCHER KALENDER
// ====================

// HTML-Elemente holen
const kalenderMonat = document.getElementById("kalenderMonat");
const KalenderTage = document.getElementById("kalenderTage");

const monatZurueck = document.getElementById("monatZurueck");
const monatVor = document.getElementById("monatVor");

const handyBild = document.getElementById("handyBild");
const kalenderSeite = document.querySelector(".kalender-seite");


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


// Welcher Monat wird gerade angezeigt?
// Beim Start ist es der aktuelle Monat.
let angezeigterMonat = heute.getMonth();
let angezeigtesJahr = heute.getFullYear();

// ========================================
// FEIERTAGE IN HESSEN
// ========================================

function feiertageHessen(jahr) {

    const feiertage = {};


    // Feste Feiertage
    feiertage["01-01"] = "Neujahr";
    feiertage["01-05"] = "Tag der Arbeit";
    feiertage["03-10"] = "Tag der Deutschen Einheit";
    feiertage["25-12"] = "1. Weihnachtstag";
    feiertage["26-12"] = "2. Weihnachtstag";


    // Ostersonntag berechnen
    const a = jahr % 19;
    const b = Math.floor(jahr / 100);
    const c = jahr % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);

    const monat = Math.floor((h + l - 7 * m + 114) / 31);
    const tag = ((h + l - 7 * m + 114) % 31) + 1;

    const ostersonntag = new Date(jahr, monat - 1, tag);


    // Hilfsfunktion für bewegliche Feiertage
    function feiertagVonOstern(tageAbstand, name) {

        const datum = new Date(ostersonntag);

        datum.setDate(datum.getDate() + tageAbstand);

        const schluessel =
            String(datum.getDate()).padStart(2, "0") +
            "-" +
            String(datum.getMonth() + 1).padStart(2, "0");

        feiertage[schluessel] = name;
    }


    // Bewegliche Feiertage in Hessen
    feiertagVonOstern(-2, "Karfreitag");
    feiertagVonOstern(1, "Ostermontag");
    feiertagVonOstern(39, "Christi Himmelfahrt");
    feiertagVonOstern(50, "Pfingstmontag");
    feiertagVonOstern(60, "Fronleichnam");


    return feiertage;
}
// ========================================
// HISTORISCHE EREIGNISSE
// ========================================

async function historischeEreignisseLaden(tag, monat) {

    const ereignisFelder = [
        document.getElementById("ereignis1"),
        document.getElementById("ereignis2"),
        document.getElementById("ereignis3"),
        document.getElementById("ereignis4"),
        document.getElementById("ereignis5")
    ];


    // Ladeanzeige
    ereignisFelder[0].textContent =
        "Ereignisse werden geladen...";

    for (let i = 1; i < 5; i++) {
        ereignisFelder[i].textContent = "";
    }


    try {

        // Beispiel: "17. August"
        const seitenName =
            tag + ". " + monate[monat - 1];


        // Deutsche Wikipedia API
        const apiUrl =
            "https://de.wikipedia.org/w/api.php?" +
            new URLSearchParams({
                origin: "*",
                action: "parse",
                page: seitenName,
                prop: "text",
                format: "json",
                formatversion: "2"
            });


        const response = await fetch(apiUrl);

        const data = await response.json();


        // Prüfen, ob Wikipedia die Seite gefunden hat
        if (!data.parse || !data.parse.text) {

            ereignisFelder[0].textContent =
                "Keine historischen Ereignisse gefunden.";

            return;
        }


        // Wikipedia HTML holen
        const wikipediaHTML = data.parse.text;


        // Temporäres HTML-Element
        const temp = document.createElement("div");

        temp.innerHTML = wikipediaHTML;


        // Ereignisse-Überschrift direkt über ID suchen
        const ereignisseUeberschrift =
            temp.querySelector("#Ereignisse");


        if (!ereignisseUeberschrift) {

            ereignisFelder[0].textContent =
                "Keine historischen Ereignisse gefunden.";

            return;
        }


        // Der Container, in dem die H2-Überschrift steckt
        const ereignisseContainer =
            ereignisseUeberschrift.parentElement;


        // Ab diesem Container weitergehen
        let element =
            ereignisseContainer.nextElementSibling;


        const ereignisse = [];


        // Bis zur nächsten H2-Überschrift suchen
        while (element) {

            // Nächste Hauptüberschrift erreicht?
            if (
                element.classList.contains("mw-heading2")
            ) {
                break;
            }


            // Alle Listenpunkte dieses Elements suchen
            const listenEintraege =
                element.querySelectorAll("li");


            for (const eintrag of listenEintraege) {

                const text =
                    eintrag.textContent.trim();


                if (text !== "") {

                    ereignisse.push(text);
                }


                // Wir brauchen nur 5
                if (ereignisse.length === 5) {
                    break;
                }
            }


            // Wenn wir 5 haben, Suche beenden
            if (ereignisse.length === 5) {
                break;
            }


            element =
                element.nextElementSibling;
        }


        // Die 5 Ereignisse anzeigen
        for (let i = 0; i < 5; i++) {

            if (ereignisse[i]) {

                ereignisFelder[i].textContent =
                    ereignisse[i];

            } else {

                ereignisFelder[i].textContent = "";
            }
        }


    } catch (fehler) {

        console.error(
            "Fehler beim Laden der historischen Ereignisse:",
            fehler
        );


        ereignisFelder[0].textContent =
            "Historische Ereignisse konnten nicht geladen werden.";
    }
}

// =================
// KALENDER ANZEIGEN
// =================

function kalenderAnzeigen() {


    // Alten Kalender löschen
    KalenderTage.innerHTML = "";

    // Feiertage für das aktuell angezeigte Jahr holen
    const feiertage = feiertageHessen(angezeigtesJahr);


    // -----------------
    // MONATSÜBERSCHRIFT
    // -----------------

    kalenderMonat.textContent =
        monate[angezeigterMonat] + " " + angezeigtesJahr;


    // ------------------
    // HANDYBILD WECHSELN
    // ------------------

    handyBild.src =
        "images/phones/" +
        monate[angezeigterMonat] +
        ".png";


    // --------------------------------
    // GROSSES HINTERGRUNDBILD WECHSELN
    // --------------------------------

    kalenderSeite.style.backgroundImage =
        'url("images/mainbackgrounds/' +
        monate[angezeigterMonat] +
        '.png")';


    // ------------------------
    // ANZAHL DER TAGE IM MONAT
    // ------------------------
    const tageImMonat =
        new Date(
            angezeigtesJahr,
            angezeigterMonat + 1,
            0
        ).getDate();


    // --------------------------
    // WOCHENTAG DES ERSTEN TAGES
    // --------------------------

    let ersterWochentag =
        new Date(
            angezeigtesJahr,
            angezeigterMonat,
            1
        ).getDay();


    // JavaScript:
    // Sonntag = 0
    // Montag  = 1
    //
    // Unser Kalender:
    // Montag  = 0
    // Dienstag = 1
    // ...
    // Sonntag = 6

    ersterWochentag =
        (ersterWochentag + 6) % 7;


    // ---------------------------
    // LEERE FELDER VOR DEM 1. TAG
    // ---------------------------

    for (let i = 0; i < ersterWochentag; i++) {

        const leer = document.createElement("div");

        KalenderTage.appendChild(leer);
    }


    // -------------
    // TAGE ERZEUGEN
    // -------------

    for (let tag = 1; tag <= tageImMonat; tag++) {

        const tagElement =
            document.createElement("div");

        tagElement.textContent = tag;

        tagElement.classList.add("kalenderTag");

        // Historische Ereignisse dieses Tages laden
        tagElement.addEventListener("click", function () {

            historischeEreignisseLaden(
                tag,
                angezeigterMonat + 1
            );

        });

        // Prüfen, ob dieser Tag ein Feiertag ist
        const schluessel =
            String(tag).padStart(2, "0") +
            "-" +
            String(angezeigterMonat + 1).padStart(2, "0");


        if (feiertage[schluessel]) {

            tagElement.classList.add("feiertag");

            tagElement.title = feiertage[schluessel];
        }


        // ------------------------------
        // WOCHENTAG DES JEWEILIGEN TAGES
        // ------------------------------

        const wochentag =
            new Date(
                angezeigtesJahr,
                angezeigterMonat,
                tag
            ).getDay();


        // Samstag
        if (wochentag === 6) {

            tagElement.classList.add("samstag");
        }


        // Sonntag
        if (wochentag === 0) {

            tagElement.classList.add("sonntag");
        }


        // ----------------------
        // HEUTIGEN TAG MARKIEREN
        // ----------------------

        if (
            tag === heute.getDate() &&
            angezeigterMonat === heute.getMonth() &&
            angezeigtesJahr === heute.getFullYear()
        ) {

            const fadenkreuz =
                document.createElement("img");

            fadenkreuz.src =
                "images/icons/Fadenkreuz.png";

            fadenkreuz.classList.add("fadenkreuz");

            tagElement.appendChild(fadenkreuz);
        }


        // Tag in Kalender einsetzen
        KalenderTage.appendChild(tagElement);
    }
}


// ==================
// EINEN MONAT ZURÜCK
// ==================

monatZurueck.addEventListener("click", function () {

    angezeigterMonat--;


    // Wenn wir vor Januar gehen
    if (angezeigterMonat < 0) {

        angezeigterMonat = 11;

        angezeigtesJahr--;
    }


    kalenderAnzeigen();
});


// ===============
// EINEN MONAT VOR
// ===============

monatVor.addEventListener("click", function () {

    angezeigterMonat++;


    // Wenn wir nach Dezember gehen
    if (angezeigterMonat > 11) {

        angezeigterMonat = 0;

        angezeigtesJahr++;
    }


    kalenderAnzeigen();
});


// ============================
// KALENDER BEIM START ANZEIGEN
// =============================

kalenderAnzeigen();

// Historische Ereignisse vom heutigen Tag laden
historischeEreignisseLaden(
    heute.getDate(),
    heute.getMonth() + 1
);
