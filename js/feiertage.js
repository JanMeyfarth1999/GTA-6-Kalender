// ========================================
// FEIERTAGE IN HESSEN
// ========================================

function feiertageHessen(jahr) {

    const feiertage = {};


    // ========================================
    // FESTE FEIERTAGE
    // ========================================

    feiertage["01-01"] = "Neujahr";

    feiertage["01-05"] = "Tag der Arbeit";

    feiertage["03-10"] = "Tag der Deutschen Einheit";

    feiertage["25-12"] = "1. Weihnachtstag";

    feiertage["26-12"] = "2. Weihnachtstag";


    // ========================================
    // OSTERSONNTAG BERECHNEN
    // ========================================

    const a = jahr % 19;

    const b = Math.floor(jahr / 100);

    const c = jahr % 100;

    const d = Math.floor(b / 4);

    const e = b % 4;

    const f = Math.floor((b + 8) / 25);

    const g = Math.floor((b - f + 1) / 3);

    const h =
        (19 * a + b - d - g + 15) % 30;

    const i =
        Math.floor(c / 4);

    const k =
        c % 4;

    const l =
        (32 + 2 * e + 2 * i - h - k) % 7;

    const m =
        Math.floor(
            (a + 11 * h + 22 * l) / 451
        );


    // Monat von Ostern berechnen
    const monat =
        Math.floor(
            (h + l - 7 * m + 114) / 31
        );


    // Tag von Ostern berechnen
    const tag =
        (
            (h + l - 7 * m + 114) % 31
        ) + 1;


    // JavaScript-Datum für Ostersonntag
    const ostersonntag =
        new Date(
            jahr,
            monat - 1,
            tag
        );


    // ========================================
    // BEWEGLICHE FEIERTAGE
    // ========================================

    function feiertagVonOstern(tageAbstand, name) {

        const datum =
            new Date(ostersonntag);


        datum.setDate(
            datum.getDate() + tageAbstand
        );


        const schluessel =
            String(datum.getDate()).padStart(2, "0") +
            "-" +
            String(datum.getMonth() + 1).padStart(2, "0");


        feiertage[schluessel] = name;
    }


    // Karfreitag
    feiertagVonOstern(
        -2,
        "Karfreitag"
    );


    // Ostermontag
    feiertagVonOstern(
        1,
        "Ostermontag"
    );


    // Christi Himmelfahrt
    feiertagVonOstern(
        39,
        "Christi Himmelfahrt"
    );


    // Pfingstmontag
    feiertagVonOstern(
        50,
        "Pfingstmontag"
    );


    // Fronleichnam
    feiertagVonOstern(
        60,
        "Fronleichnam"
    );


    return feiertage;
}