// ========================================
// HISTORISCHE EREIGNISSE
// ========================================

async function historischeEreignisseLaden(tag, monat) {

    // Die fünf Felder aus dem HTML holen
    const ereignisFelder = [
        document.getElementById("ereignis1"),
        document.getElementById("ereignis2"),
        document.getElementById("ereignis3"),
        document.getElementById("ereignis4"),
        document.getElementById("ereignis5")
    ];


    // ========================================
    // LADEANZEIGE
    // ========================================

    ereignisFelder[0].textContent =
        "Ereignisse werden geladen...";

    for (let i = 1; i < 5; i++) {

        ereignisFelder[i].textContent = "";
    }


    try {

        // Beispiel:
        // 17 + ". " + August
        // ergibt "17. August"

        const seitenName =
            tag + ". " + monate[monat - 1];


        // ========================================
        // WIKIPEDIA API
        // ========================================

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


        // Daten abrufen
        const response =
            await fetch(apiUrl);

        const data =
            await response.json();


        // Prüfen, ob Daten vorhanden sind
        if (!data.parse || !data.parse.text) {

            ereignisFelder[0].textContent =
                "Keine historischen Ereignisse gefunden.";

            return;
        }


        // ========================================
        // WIKIPEDIA HTML EINLESEN
        // ========================================

        const wikipediaHTML =
            data.parse.text;


        // HTML als Text parsen
        const parser =
            new DOMParser();

        const wikipediaDokument =
            parser.parseFromString(
                wikipediaHTML,
                "text/html"
            );


        // ========================================
        // BILDER ENTFERNEN
        // ========================================

        const bilder =
            wikipediaDokument.querySelectorAll("img");

        bilder.forEach(function (bild) {

            bild.remove();
        });


        // ========================================
        // ABSCHNITT "EREIGNISSE" FINDEN
        // ========================================

        const ereignisseUeberschrift =
            wikipediaDokument.querySelector("#Ereignisse");


        if (!ereignisseUeberschrift) {

            ereignisFelder[0].textContent =
                "Keine historischen Ereignisse gefunden.";

            return;
        }


        // Überschriften-Container
        const ereignisseContainer =
            ereignisseUeberschrift.parentElement;


        let element =
            ereignisseContainer.nextElementSibling;


        const ereignisse = [];


        // ========================================
        // EREIGNISSE SAMMELN
        // ========================================

        while (element) {

            // Nächste große Überschrift erreicht
            if (
                element.classList.contains("mw-heading2")
            ) {

                break;
            }


            // Alle Listeneinträge suchen
            const listenEintraege =
                element.querySelectorAll("li");


            for (const eintrag of listenEintraege) {

                const text =
                    eintrag.textContent.trim();


                if (text !== "") {

                    ereignisse.push(text);
                }


                // Maximal fünf Ereignisse
                if (ereignisse.length === 5) {

                    break;
                }
            }


            if (ereignisse.length === 5) {

                break;
            }


            element =
                element.nextElementSibling;
        }


        // ========================================
        // EREIGNISSE ANZEIGEN
        // ========================================

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