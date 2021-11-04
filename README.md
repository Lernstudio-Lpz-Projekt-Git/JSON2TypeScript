# IDE 2020 - JavaScript2TypeScript

TypeScript hat sich über die letzten Jahre zu einer echten Alternative für JavaScript entwickelt. Das JavaScript für Backend-Entwickler punktet mit optionaler statischer Typisierung und einem schnellen intelligenten Compiler. Zusätzlich ist mit Interfaces und Modifiern echte objekt­orientierte Entwicklung möglich. Das alles prädestiniert es für den Einsatz in großen Projekten. Abgerundet wird es durch die Bereitstellung von Features aus zukünftigen JavaScript-Versionen, die größtenteils zu ECMAScript 3/5 transpiliert werden können und damit voll abwärtskompatibel zum JavaScript-Sprachstandard sind.

Bei dem verwendeten Repository handelt es sich um meine "Test-/Entwicklungsumgebung für JavaScript und TypeScript". Sie basiert auf Gulp, TypeScript/JS, ES6+ und Sass. Folgend die verwendeten NODE und NPM Versionen unter MacOS X 10.15.7 und Windows 10:

## MAC X 10.15.7:
NODE 14.18.1
NPM 6.14.15

## WINDOWS 10:
NODE 12.22.7
NPM 6.14.15

## Befehle
`npm install` ist der Befehl, der alle Packages installiert und alle Abhänigkeiten auflöst.

`npm run dev` ist der Befehl, der für das Starten der Umgebung erforderlich ist, alles auf einmal baut und auf Änderungen wartet. Hierbei wird ein Liveserver inkl. Browser-Refresh gestartet.

`npm run build` ist der Build-Befehl, hierbei wird alles gebaut und im `dist/` Verzeichnis hinterlegt. Es wird nicht auf Änderungen an Dateien gewartet.

Mit `npm run build:prod` kann ein Produktion Build erzeugt werden das keine Sourcemaps besitzt.

## JSON-SERVER
`npm install -g json-server` ist der Befehl, der den Json Sever systemweit installiert. Json-Server bietet die Funktionalität zum Einrichten eines REST-API-Servers mit minimalem Aufwand.

Wechseln Sie in das verzeichnis, dass ihre .json-Datei enthält und geben Sie folgenden Befeht ein: `json-server --watch dateiname.json`. Mehr Informationen finden Sie hier [https://www.npmjs.com/package/json-server]

## Typescript

Zur Verwendung von Typescript muss eine in der Gulpfile die Variable `useTypeScript` auf `true` gesetzt werden. Anschließend werden die `.ts` Files in der `src/script` Directory genutzt und nicht mehr die `.js` Files. Es können jedoch beide Arten von Files in der Directory liegen.

## AUFGABE: Die Migration von JavaScript auf TypeScript
Aufgabe ist es, den gesamten JavaScript-Code in TypeScript zu transkribieren. Das bedeutet:

(1) Sinnvolle Aufteilung in Module und Services mit dem Ziel redundanten Code zu vermeiden. D.h. Module und Services als Abstraktionsschicht für Business-Logik und der Daten-Handling.
(2) Ertellen Sie ein Module-System durch Deklarationen mit export / import
(3) Statische Typisierung der Codebasis (Basistypen, Funktionstypen und Objekttypen) - verwenden Sie optionale Properties
(4) Sinnvolle Erzeugung und Implementierung von Klasse und Interface, wichtiges Merkmal: Datenkapselung
(5) Das Abfangen von Fehlern sollte möglichst einfach und kontinuierlich funktionieren. Der Nutzer sollte auf Fehler aufmerksam gemacht werden können, sei es durch Benachrichtigungen und/oder Messageboxen, und möglichst ohne dass das Programm abbricht. (ErrorServices)

## ACHTUNG: Die Optik des Projekts kann auch vollkommen anders aussehen, die jetzige ist keine Vorgabe
