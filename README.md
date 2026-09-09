# TerminalOS

Eine modular aufgebaute, terminalbasierte Betriebssystem-Simulation, entwickelt in Node.js. 

Das Projekt verfolgt das Ziel, eine strukturierte und erweiterbare CLI-Umgebung (Command Line Interface) zu bieten. Es simuliert den vollständigen Ablauf eines modernen Betriebssystems – von der Erstinstallation über den Bootloader bis hin zu einer interaktiven Befehlszeile.


<img width="1919" height="1198" alt="Bildschirmfoto_20260909_190038" src="https://github.com/user-attachments/assets/2be01c25-c12d-427c-b638-5f71f6099537" />

---

## 🏗️ Systemarchitektur & Modularität

Der Quellcode ist nach modernen Prinzipien der Softwareentwicklung in eigenständige Module unterteilt:

 **`main.js`**: Der zentrale Einstiegspunkt des Sys
tems. Initialisiert die Umgebung, prüft Konfigurationsdateien und steuert den Haupt-Ablauf.
**`bootloader.js`**: Verwaltet den Startvorgang sowie die Erstinstallations-Routine inklusive visuellem Feedback (Ladebalken, System-Checks).
**`commands.js`**: Enthält die gesamte Befehlsverarbeitung und die Logik für alle integrierten Systembefehle.
**`utils.js`**: Bereitstellung wiederverwendbarer Hilfsfunktionen (z. B. asynchrone Delays, Konsolen-Ladebalken).
 **`system_config.json`**: Speichert nutzerspezifische Einstellungen und den Systemstatus im JSON-Format.

---

## 🛠️ Funktionen & Befehle

Das System bringt bereits eine Reihe integrierter Werkzeuge und Befehle mit:

* `help` – Übersicht aller verfügbaren Befehle
* `clear` – Bereinigt die Konsolenausgabe
* `whoami` – Zeigt den aktuell angemeldeten Benutzer an
* `echo <text>` – Gibt den übergebenen Text in der Konsole aus
* `date` – Zeigt das aktuelle Datum und die Uhrzeit an
* `systeminfo` – Stellt Systeminformationen und Laufzeitdaten bereit
* `chuser <name>` – Ändert den Benutzernamen und speichert ihn dauerhaft in der Konfiguratio
* `ls` - Zeigt den Inhalt de aktuellen Ordners an
* `cd [Pfad]` - Wechselt den Ordner (z.B. cd..oder cd ordnername)
* `write [n]`- Erstellt/schreibt eine Textdatei [z.B. write notiz.txt
* `read [n]`- Liest eine Datei aus (z.B. read notiz.txt
* `exit` – Fährt das System mit einer Herunterfahren-Animation sauber herunter
  
  <img width="1920" height="1200" alt="Bildschirmfoto_20260909_190156" src="https://github.com/user-attachments/assets/c08c6e02-d150-4a1b-a071-f532bf204031" />

---

## 🚀 Installation & Start

### Voraussetzungen
* **Node.js** (Empfohlen: aktuelle LTS Version)

### Ausführung
1. Repository klonen oder als ZIP herunterladen.
2. Im Projektverzeichnis ein Terminal öffnen.
3. Das System starten mit:
   ```bash
   node main.js
## ✨ Features 
Der neue effiziente Dateimanager(**`FileManager`**) kann den Inhalt des Aktuellen Orders anzeigen oder zu einem anderen wechseln.Außerdem kann der neue Dateimanager Dateien effizient erstellen und auslesen.

<img width="1920" height="1200" alt="Bildschirmfoto_20260909_190314" src="https://github.com/user-attachments/assets/dad1e992-d1d7-4bda-9892-dd44da31680e" />
