/////////////////////////////// JSON: WRITE READ ///////////////////////////////
//const { date } = require('faker/locale/zh_TW')
//const { resolveTypeReferenceDirective } = require('typescript')
////////////// JSON-Server installieren: ///////////////////////////////////////
// Basis zum Speichen, Änderen und Importieren von JSON-Daten ist der JSON-Server
// INSTALLTION: npm install -g json-server
// Mit Terminal in das Verzeichnis 'Server' naviegieren
// Server starten: json-server --watch books.json
// FERTIG, Server übernimmt den Rest

const URLBooks = 'http://localhost:3000/books'
const URLInfos = 'http://localhost:3000/infos'

// GET INFO DATAs 
const ausgTitle = document.querySelector("div#ausgabe > h2.title")
const ausgStandorte = document.querySelector("div#ausgabe > p.standorte")
const ausgMitglieder = document.querySelector("div#ausgabe > p.mitglieder")
const ausgRecords = document.querySelector("div#ausgabe > p.records")
/// Container für alle Datensätze des JSON-Files
const dataSet = document.querySelector("div#jsondata")

const getInfoDATA = (method) => {
    const promise = new Promise((resolve, reject) => {
        const servRequest = new XMLHttpRequest()
        servRequest.open(method, URLInfos, true)
        servRequest.setRequestHeader("Content-type", "json")
        servRequest.responseType = "application/json"
        servRequest.onload = function () {
            if (servRequest.status >= 200 && servRequest.status < 300) {
                resolve(servRequest.response)
            } else {
                servRequest.onerror = () => reject(servRequest.statusText)
            }
        };
        servRequest.send()
    });
    return promise
}

/// Allgemeine Infos im JSON-File
const getProjektInfoData = () => {
    getInfoDATA('GET').then(responseData => {
        const jsonInfos = JSON.parse(responseData)
        //console.log(responseData)

        ausgTitle.innerHTML = jsonInfos[0].Title
        ausgStandorte.innerHTML = "Standorte: " + jsonInfos[0].Standorte;
        ausgMitglieder.innerHTML = "Anzahl Mitglieder: " + jsonInfos[0].Mitglieder;
    });
};

const getBooksDATA = (method) => {
    const promise = new Promise((resolve, reject) => {
        const servRequest = new XMLHttpRequest()
        servRequest.open(method, URLBooks, true)
        servRequest.setRequestHeader("Content-type", "json")
        servRequest.responseType = "application/json"
        servRequest.onload = function () {
            if (servRequest.status >= 200 && servRequest.status < 300) {
                resolve(servRequest.response)
            } else {
                servRequest.onerror = () => reject(servRequest.statusText)
            }
        };
        servRequest.send()
    });
    return promise
}

/// JSON-File laden und Bücher anzeigen
const getProjektBooksData = () => {
    getBooksDATA('GET').then(responseData => {
        const jsonBooks = JSON.parse(responseData)

        //Add-Button sichtbar machen
        addBtn.classList.remove("hidden")
 
        ausgRecords.innerHTML = "Anzahl Bücher: " + jsonBooks.length;
        dataSet.innerHTML = `${jsonBooks.map(json2htmlTemplate).join('')}`

        // Edit- & Delete-Button der eizelnen Books initalisieren
        const editBTNList = document.querySelectorAll("div.editBTN");
        editBTNList.forEach((btn) => {
            console.log(btn);
            btn.addEventListener('click', ($event) => {
                console.log(btn.parentElement.parentElement.id);
            })
        });
        const deleteBTNList = document.querySelectorAll("div.deleteBTN");
        deleteBTNList.forEach((btn) => {
            console.log(btn);
            btn.addEventListener('click', ($event) => {
                //console.log(btn.parentElement.parentElement);
                const id = btn.parentElement.parentElement.id
                deleteBookJSONData(id)
            })
        });
    })
    .catch(err => {
        console.log(err)
    });
};

/// Buch aus der JSON-File-Liste löschen
const deleteProjektBook = (method, id) => {
    const promise = new Promise((resolve, reject) => {
        const servRequest = new XMLHttpRequest()
        servRequest.open(method, URLBooks + '/' + id, true)
        servRequest.onload = function () {
            if (servRequest.status >= 200 && servRequest.status < 300) {
                resolve(servRequest.response)
                getProjektBooksData()
            } else {
                servRequest.onerror = () => reject(servRequest.statusText)
            }
        }
        servRequest.send(null)
    });
    return promise
}

/// Buch aus der JSON-File-Liste löschen
const deleteBookJSONData = (id) => {
    deleteProjektBook('DELETE', Number(id))
        .then(responseData => {
            //const deletRes = JSON.parse(responseData)
            console.log(responseData)
        })
        .catch(err => {
            console.log(err)
        });
};

// JSON-Book-Datensatz hinzuzufügen
const insertProjektBook = (method) => {
    const promise = new Promise((resolve, reject) => {
        let data = JSON.stringify(bookTemplateForData)
        const servRequest = new XMLHttpRequest()
        servRequest.open(method, URLBooks)
        servRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")
        //servRequest.responseType = "application/json"

        servRequest.onload = function () {
            if (servRequest.status >= 200 && servRequest.status < 300) {
                resolve(servRequest.response)
                getProjektBooksData()
            } else {
                servRequest.onerror = () => reject(servRequest.statusText)
            }
        }
        servRequest.send(data)
    });
    return promise
}

const insertNewBookData = () => {
    insertProjektBook('POST')
        .then(responseData => {
            console.log(responseData)
        })
        .catch(err => {
            console.log(err)
        });
}
// JSON Data Book-Template um einen Datensatz hinzuzufügen
const bookTemplateForData = {
    "isbn": "978-3-8362-8765-4",
    "title": "Node.js",
    "subtitle": "Das umfassende Handbuch",
    "author": "Sebastian Springer",
    "published": "2021-08-04T00:00:00.000Z",
    "publisher": "Rheinwerk Computing",
    "pages": 822,
    "description": "Bühne frei für Node.js! Dieses Buch ist Ihr umfassender Begleiter für die Arbeit mit der am weitesten verbreiteten und von zahlreichen großen Unternehmen eingesetzten serverseitigen JavaScript-Plattform.",
    "website": "https://www.rheinwerk-verlag.de/nodejs_5441/"
}
// JSON Data für einen Datensatz-Update mit der ID 4 mit Edit-Button (Rechts im Data-Cheet)
const updateBookID4 = {
    "isbn": "9781449365035",
    "title": "Speaking JavaScript in XXXXL-Format",
    "subtitle": "An In-Depth Guide for Programmers",
    "author": "Axel Rauschmayer",
    "published": "2014-04-08T00:00:00.000Z",
    "publisher": "O'Reilly Media",
    "pages": 460,
    "description": "Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    "website": "http://speakingjs.com"
}

const getDateTime = pDate => {
    let dt = Date.parse(pDate)
    let datum = new Date(dt) // (January = 0, deshalb um 1 erhöhen)
    return `<p>${"Erscheinungsdatum".toUpperCase()}: ${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()} - `
}

const getAlter = pDate => {
    let dt = Date.parse(pDate)
    let datum = new Date(dt)
    let heute = new Date().getFullYear()
    return `(${heute - datum.getFullYear()} Jahre alt)</p>`
}

const json2htmlTemplate = (b, index) => {
    return `
    <div id="${b.id}" class="book-container">
        <h3 class="book-title">${Number(index) + 1}. ${b.title}</h3>
        <h5 class="book-subtitle">${b.subtitle}</h5>
        <p contenteditable="true" class="book-isbn">ISBN: ${b.isbn}</p>
        <p class="book-author">AUTOR: ${b.author}</p>
        <p class="book-publisher">VERLAG: ${b.publisher}</p>
        <p class="book-description">BESCHREIBUNG: ${b.description}</p>
        <p>WEBSEITE: <a class="book-website" href="${b.website}">${b.website}</a></p>
        ${b.published ? getDateTime(b.published) : 'Kein Datum bekannt.'} ${b.published ? getAlter(b.published) : ''}
        <p class="book-id">Datensatz-ID: ${b.id}</p>
        <div class="bookBTNs">
            <div class="deleteBTN">Löschen</div>
            <div class="editBTN">Bearbeiten</div>
        </div>
    </div>
    `
}

/// Daten aller Bücher als JSON-File exportieren
const exportProjektBooksData = () => {
    console.log("Datenexport")
    getBooksDATA('GET').then(responseData => {
        //const JSONBooksData = JSON.parse(responseData)
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(responseData));
        element.setAttribute('download', 'dbexport.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
}

/// Die Daten eines spzifischen Buches als anzeigen
const getBookPartDATA = (method, id) => {
    const promise = new Promise((resolve, reject) => {
        const servRequest = new XMLHttpRequest()
        servRequest.open(method, URLBooks + '/' + id, true)
        servRequest.setRequestHeader("Content-type", "json")
        servRequest.responseType = "application/json"
        servRequest.onload = function () {
            if (servRequest.status >= 200 && servRequest.status < 300) {
                resolve(servRequest.response)
            } else {
                console.log("ID nicht vorhanden!")
                servRequest.onerror = () => {
                    reject(servRequest.statusText + "\nID nicht vorhanden!")
            }};
        };
        servRequest.send()
    });
    return promise
}

const getAPartOfBooksData = (id) => {
    getBookPartDATA('GET', id).then(responseData => {
        const jsonBooks = []
        jsonBooks.push(JSON.parse(responseData))

        ausgRecords.innerHTML = "Anzahl Bücher: " + jsonBooks.length;
        dataSet.innerHTML = `${jsonBooks.map(json2htmlTemplate).join('')}`

        // Edit- & Delete-Button der eizelnen Books initalisieren
        const editBTNList = document.querySelectorAll("div.editBTN");
        editBTNList.forEach((btn) => {
            console.log(btn);
            btn.addEventListener('click', ($event) => {
                console.log(btn.parentElement.parentElement.id);
            })
        });
        const deleteBTNList = document.querySelectorAll("div.deleteBTN");
        deleteBTNList.forEach((btn) => {
            console.log(btn);
            btn.addEventListener('click', ($event) => {
                //console.log(btn.parentElement.parentElement);
                const id = btn.parentElement.parentElement.id
                deleteBookJSONData(id)
            })
        });
    })
    .catch(err => {
        console.log("ERROR: ID nicht vorhanden! "+err)
    });
};

// inputFID
const showAPartBookData = () => {
    const inputField = document.querySelector(".inputFID")
    const bookID = Number(inputField.value)
    getAPartOfBooksData(bookID)
}

const startBtn = document.querySelector('#startBtn')
startBtn.addEventListener('click', getProjektInfoData)

const importBtn = document.querySelector('#importBtn')
importBtn.addEventListener('click', getProjektBooksData)

const exportBtn = document.querySelector('#exportBtn')
exportBtn.addEventListener('click', exportProjektBooksData)

const addBtn = document.getElementById("addBTN-ID")
addBtn.addEventListener('click', ($event) => {
    insertNewBookData()
})

const showPartBtn = document.getElementById("partBtn")
showPartBtn.addEventListener('click', ($event) => {
    showAPartBookData()
})

getProjektInfoData()