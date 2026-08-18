// ========================================
// DYNAMISCHER KALENDER
// ========================================


// HTML-Elemente holen
const kalenderMonat =
    document.getElementById("kalenderMonat");

const KalenderTage =
    document.getElementById("kalenderTage");

const monatZurueck =
    document.getElementById("monatZurueck");

const monatVor =
    document.getElementById("monatVor");

const handyBild =
    document.getElementById("handyBild");

const kalenderSeite =
    document.querySelector(".kalender-seite");


// ========================================
// AKTUELL ANGEZEIGTER MONAT
// ========================================

let angezeigterMonat =
    heute.getMonth();

let angezeigtesJahr =
    heute.getFullYear();


// ========================================
// KALENDER ANZEIGEN
// ========================================

function kalenderAnzeigen() {

    // Alten Kalender löschen
    KalenderTage.innerHTML = "";


    // Feiertage für das angezeigte Jahr
    const feiertage =
        feiertageHessen(angezeigtesJahr);


    // ========================================
    // MONATSÜBERSCHRIFT
    // ========================================

    kalenderMonat.textContent =
        monate[angezeigterMonat] +
        " " +
        angezeigtesJahr;


    // ========================================
    // HANDYBILD WECHSELN
    // ========================================

    handyBild.src =
        "images/phones/" +
        monate[angezeigterMonat] +
        ".png";


    // ========================================
    // GROSSES HINTERGRUNDBILD WECHSELN
    // ========================================

    kalenderSeite.style.backgroundImage =
        'url("images/mainbackgrounds/' +
        monate[angezeigterMonat] +
        '.png")';


    // ========================================
    // ANZAHL DER TAGE
    // ========================================

    const tageImMonat =
        new Date(
            angezeigtesJahr,
            angezeigterMonat + 1,
            0
        ).getDate();


    // ========================================
    // ERSTER WOCHENTAG
    // ========================================

    let ersterWochentag =
        new Date(
            angezeigtesJahr,
            angezeigterMonat,
            1
        ).getDay();


    // Montag = 0
    ersterWochentag =
        (ersterWochentag + 6) % 7;


    // ========================================
    // LEERE FELDER VOR DEM 1.
    // ========================================

    for (
        let i = 0;
        i < ersterWochentag;
        i++
    ) {

        const leer =
            document.createElement("div");


        KalenderTage.appendChild(leer);
    }


    // ========================================
    // TAGE ERZEUGEN
    // ========================================

    for (
        let tag = 1;
        tag <= tageImMonat;
        tag++
    ) {

        const tagElement =
            document.createElement("div");


        tagElement.textContent = tag;


        tagElement.classList.add(
            "kalenderTag"
        );

        // ========================================
        // KLICK AUF EINEN KALENDERTAG
        // ========================================

        tagElement.addEventListener(
            "click",
            function () {

                wochentagImJahrBerechnen(
                    tag,
                    angezeigterMonat,
                    angezeigtesJahr
                );
            }
        );


        // ====================================
        // KLICK AUF EINEN TAG
        // ====================================

        tagElement.addEventListener(
            "click",
            function () {

                historischeEreignisseLaden(
                    tag,
                    angezeigterMonat + 1
                );
            }
        );


        // ====================================
        // FEIERTAG PRÜFEN
        // ====================================

        const schluessel =
            String(tag).padStart(2, "0") +
            "-" +
            String(
                angezeigterMonat + 1
            ).padStart(2, "0");


        if (feiertage[schluessel]) {

            tagElement.classList.add(
                "feiertag"
            );


            tagElement.title =
                feiertage[schluessel];
        }


        // ====================================
        // WOCHENTAG
        // ====================================

        const wochentag =
            new Date(
                angezeigtesJahr,
                angezeigterMonat,
                tag
            ).getDay();


        // Samstag
        if (wochentag === 6) {

            tagElement.classList.add(
                "samstag"
            );
        }


        // Sonntag
        if (wochentag === 0) {

            tagElement.classList.add(
                "sonntag"
            );
        }


        // ====================================
        // HEUTE MARKIEREN
        // ====================================

        if (
            tag === heute.getDate() &&
            angezeigterMonat === heute.getMonth() &&
            angezeigtesJahr === heute.getFullYear()
        ) {

            const fadenkreuz =
                document.createElement("img");


            fadenkreuz.src =
                "images/icons/Fadenkreuz.png";


            fadenkreuz.classList.add(
                "fadenkreuz"
            );


            tagElement.appendChild(
                fadenkreuz
            );
        }


        // Tag in Kalender einsetzen
        KalenderTage.appendChild(
            tagElement
        );
    }
}


// ========================================
// MONAT ZURÜCK
// ========================================

monatZurueck.addEventListener(
    "click",
    function () {

        angezeigterMonat--;


        // Von Januar auf Dezember
        if (angezeigterMonat < 0) {

            angezeigterMonat = 11;

            angezeigtesJahr--;
        }


        kalenderAnzeigen();
    }
);


// ========================================
// MONAT VOR
// ========================================

monatVor.addEventListener(
    "click",
    function () {

        angezeigterMonat++;


        // Von Dezember auf Januar
        if (angezeigterMonat > 11) {

            angezeigterMonat = 0;

            angezeigtesJahr++;
        }


        kalenderAnzeigen();
    }
);


// ========================================
// SEITE STARTEN
// ========================================

// Kalender anzeigen
kalenderAnzeigen();


// Historische Ereignisse von heute anzeigen
historischeEreignisseLaden(
    heute.getDate(),
    heute.getMonth() + 1
);

// ========================================
// WIEVIELTER WOCHENTAG IM JAHR?
// ========================================

function wochentagImJahrBerechnen(tag, monat, jahr) {

    const datum =
        new Date(jahr, monat, tag);


    // Wochentagsnamen
    const wochentage = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ];


    // Wochentag des ausgewählten Datums
    const wochentagNummer =
        datum.getDay();


    const wochentagName =
        wochentage[wochentagNummer];


    // Zähler
    let anzahl = 0;


    // Beim 1. Januar anfangen
    const pruefDatum =
        new Date(jahr, 0, 1);


    // Jeden Tag bis zum ausgewählten Datum durchgehen
    while (pruefDatum <= datum) {

        // Hat dieser Tag den gleichen Wochentag?
        if (
            pruefDatum.getDay() ===
            wochentagNummer
        ) {

            anzahl++;
        }


        // Einen Tag weiter
        pruefDatum.setDate(
            pruefDatum.getDate() + 1
        );
    }


    // Ergebnis anzeigen
    document.getElementById(
        "wochentagInfo"
    ).textContent =
        anzahl +
        ". " +
        wochentagName +
        " im Jahr";
}