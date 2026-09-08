const fs = require('fs');
const path = require('path'); // Pfad-Modul wird für den Dateimanager benötigt
// 1. Ladebalken-Werkzeug aus utils.js importieren
const { zeigeLadebalken } = require('./utils');

// Variable für das aktuelle Verzeichnis (startet dort, wo das Terminal ausgeführt wird)
let currentDir = process.cwd();

// 2. Funktion als 'async' deklarieren, damit 'await' darin funktioniert
async function verarbeiteBefehl(command, args, username, configFile, rl, starteTerminal) {
  switch (command) {
    case '':
      starteTerminal(username);
      break;

    case 'help':
      console.log("\n--- Verfügbare Befehle ---");
      console.log("  help       - Zeigt diese Hilfe an");
      console.log("  clear      - Leert den Bildschirm");
      console.log("  whoami     - Zeigt den aktuellen Benutzer");
      console.log("  echo       - Gibt Text in der Konsole aus");
      console.log("  date       - Zeigt das aktuelle Datum und die Uhrzeit an");
      console.log("  systeminfo - Zeigt Systeminformationen an");
      console.log("  chuser     - Ändert den Benutzernamen");
      
      // Hilfe-Texte für die neuen Dateimanager-Befehle
      console.log("  ls         - Zeigt den Inhalt des aktuellen Ordners an");
      console.log("  cd [Pfad]  - Wechselt den Ordner (z.B. cd .. oder cd ordnername)");
      console.log("  write [n]  - Erstellt/schreibt eine Textdatei (z.B. write notiz.txt)");
      console.log("  read [n]   - Liest eine Datei aus (z.B. read notiz.txt)");
      
      console.log("  exit       - Fährt das System herunter\n");
      starteTerminal(username);
      break;

    case 'clear':
      console.clear();
      starteTerminal(username);
      break;

    case 'whoami':
      console.log(username);
      starteTerminal(username);
      break;

    case 'echo':
      console.log(args.join(' '));
      starteTerminal(username);
      break;

    case 'date':
      console.log(new Date().toLocaleString('de-DE'));
      starteTerminal(username);
      break;

    case 'systeminfo':
      console.log("\n--- TerminalOS<_ Systeminfo ---");
      console.log("  OS: Terminal OS v0.0.1");
      console.log(`  User: ${username}`);
      console.log(`  Verzeichnis: ${currentDir}`); // Aktuellen Pfad in der Info anzeigen
      console.log(`  Kernel: Node.js ${process.version}`);
      console.log(`  Uptime: ${Math.floor(process.uptime())} Sekunden\n`);
      starteTerminal(username);
      break;


    case 'ls': // Inhalt anzeigen
      try {
        const dateien = fs.readdirSync(currentDir);
        console.log(`\nInhalt von ${currentDir}:`);
        if (dateien.length === 0) {
          console.log("  (Verzeichnis ist leer)");
        } else {
          dateien.forEach(datei => {
            const stats = fs.statSync(path.join(currentDir, dateiautor = datei));
            const typ = stats.isDirectory() ? '[ORDNER]' : '[DATEI] ';
            console.log(`  ${typ} ${datei}`);
          });
        }
        console.log("");
      } catch (error) {
        console.log(`Fehler beim Auflisten: ${error.message}`);
      }
      starteTerminal(username);
      break;

    case 'cd': // Verzeichnis wechseln
      if (args.length === 0) {
        console.log(`Aktuelles Verzeichnis: ${currentDir}`);
      } else {
        try {
          const zielPfad = path.resolve(currentDir, args[0]);
          if (fs.existsSync(zielPfad) && fs.statSync(zielPfad).isDirectory()) {
            currentDir = zielPfad;
          } else {
            console.log("Fehler: Pfad existiert nicht oder ist kein Ordner.");
          }
        } catch (error) {
          console.log(`Fehler beim Ordnerwechsel: ${error.message}`);
        }
      }
      starteTerminal(username);
      break;

    case 'write': // Datei schreiben
      if (args.length === 0) {
        console.log("Fehler: Bitte gib einen Dateinamen an. Beispiel: write test.txt");
        starteTerminal(username);
      } else {
        const dateiname = args[0];
        const dateiPfad = path.join(currentDir, dateiname);
        
        console.log(`Schreibe in '${dateiname}'. Tippe ':save' in eine leere Zeile, um zu speichern.`);
        
        let zeilen = [];
        const leseZeile = () => {
          rl.question('> ', (eingabe) => {
            if (eingabe.trim() === ':save') {
              try {
                fs.writeFileSync(dateiPfad, zeilen.join('\n'), 'utf-8');
                console.log(`Datei erfolgreich unter ${dateiname} gespeichert.`);
              } catch (error) {
                console.log(`Fehler beim Speichern: ${error.message}`);
              }
              starteTerminal(username); // Terminal nach dem Speichern fortsetzen
            } else {
              zeilen.push(eingabe);
              leseZeile(); // Nächste Zeile einlesen
            }
          });
        };
        leseZeile();
      }
      break;

    case 'read': // Datei lesen
      if (args.length === 0) {
        console.log("Fehler: Bitte gib die Datei an, die du lesen willst. Beispiel: read test.txt");
      } else {
        const dateiname = args[0];
        const dateiPfad = path.join(currentDir, dateiname);
        
        if (!fs.existsSync(dateiPfad) || fs.statSync(dateiPfad).isDirectory()) {
          console.log("Fehler: Datei existiert nicht oder ist ein Ordner.");
        } else {
          try {
            const inhalt = fs.readFileSync(dateiPfad, 'utf-8');
            console.log(`\n--- Inhalt von ${dateiname} ---`);
            console.log(inhalt);
            console.log("-----------------------------\n");
          } catch (error) {
            console.log(`Fehler beim Lesen: ${error.message}`);
          }
        }
      }
      starteTerminal(username);
      break;

    case 'exit':
      await zeigeLadebalken("System wird heruntergefahren...", 2);
      rl.close();
      process.exit(0);
      break;

    case 'chuser':
      if (args.length === 0) {
        console.log("Fehler: Bitte gib einen neuen Namen an. Beispiel: chuser max");
        starteTerminal(username);
      } else {
        const neuerUsername = args[0];
        try {
          const dateiInhalt = fs.readFileSync(configFile, 'utf-8');
          const systemDaten = JSON.parse(dateiInhalt);
          systemDaten.username = neuerUsername;

          fs.writeFileSync(configFile, JSON.stringify(systemDaten, null, 2));

          console.log(`Benutzername erfolgreich geändert zu: ${neuerUsername}`);
          starteTerminal(neuerUsername);
        } catch (error) {
          console.log("Fehler beim Speichern des neuen Benutzernamens!");
          starteTerminal(username);
        }
      }
      break;

    default:
      console.log(`Befehl nicht gefunden: '${command}'. Tippe 'help' für eine Liste.`);
      starteTerminal(username);
      break; 
  }
}

module.exports = { verarbeiteBefehl };
