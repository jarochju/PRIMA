# PRIMA

Fertige Anwendung: https://jarochju.github.io/PRIMA/dist/tetris/index.html

Quellcode: https://github.com/jarochju/PRIMA/tree/master/src/tetris

Designdokument: https://github.com/jarochju/PRIMA/blob/master/concept/Designdokument.pdf

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr	| Bezeichnung	| Inhalt |
|-------|---------------|--------|
|       | Titel         | Tetris |
|       | Name          | Julia Jaroch |
|       | Matrikelnummer| 257914 |
|1|Nutzerinteraktion|Der Nutzer kann mit der Applikation interagieren. Mit welchen Mitteln und welchen Aktionen werden welche Reaktionen ausgelöst? Die Steuerung der Formen, Einstellungen|
|2|Objektinteraktion|Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Wann passiert dabei wie was? Formen kollidieren miteinander, um zu stoppen.|
|3|Objektanzahl variabel|Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Welche sind dies und wann und wie geschieht die Erzeugung? Formen werden zufällig generiert so lange das Spiel noch weitergeht.|
|4|Szenenhierarchie|Die Szenenhierarchie ist sinnvoll aufgebaut. Wer ist wessen Parent, wie sind Elemente in anderen gruppiert und warum?|
|5|Sound|Sounds sind eingebunden und unterstützen oder ermöglichen die Wahrnehmung der Aktionen. Welche Ereignisse werden durch Geräusche akustisch unterstützt, und durch welche Geräuschkulisse oder Musik die Atmosphäre? Hintergrundmusik|
|6|GUI|Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun? Musik ein- und ausschalten, Spiel starten, Spiel pausieren, Schwierigkeit|
|7|Externe Daten|Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Welche Parameter sind dies und was sind die Auswirkungen? Lautstärke der Musik, Geschwindigkeit |
|8|Verhaltensklassen|Das Verhalten von Objekten ist in den Methoden von Klassen definiert, die in externen Dateien abgelegt sind. Welche Klassen sind dies und welches Verhalten wird dort beschrieben? Shapes, Main, Storage, UI |
|9|Subklassen|Es existiert eine Klassenhierarchie, einige Objekte sind Instanzen von einer oder mehreren abgeleiteten Subklassen mit gegenüber den anderen Objekten speziellem Verhalten und besonderen Eigenschaften. Welche Klassen sind dies und welches Verhalten wird dort beschrieben?|
|10|Maße & Positionen|Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert?|
|11|Event-System|Das Event-System wird verwendet. Wer sendet wem Informationen oder Methodenaufrufe und wofür?|
