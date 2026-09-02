# TerminalOS

Eine modular aufgebaute, terminalbasierte Betriebssystem-Simulation, entwickelt in Node.js. 

Das Projekt verfolgt das Ziel, eine strukturierte und erweiterbare CLI-Umgebung (Command Line Interface) zu bieten. Es simuliert den vollständigen Ablauf eines modernen Betriebssystems – von der Erstinstallation über den Bootloader bis hin zu einer interaktiven Befehlszeile.

---

## 🏗️ Systemarchitektur & Modularität

Der Quellcode ist nach modernen Prinzipien der Softwareentwicklung in eigenständige Module unterteilt:

 **`main.js`**: Der zentrale Einstiegspunkt des Systems. Initialisiert die Umgebung, prüft Konfigurationsdateien und steuert den Haupt-Ablauf.
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
* `chuser <name>` – Ändert den Benutzernamen und speichert ihn dauerhaft in der Konfiguration
* `exit` – Fährt das System mit einer Herunterfahren-Animation sauber herunter

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
