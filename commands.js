const fs = require('fs');
// 1. Ladebalken-Werkzeug aus utils.js importieren
const { zeigeLadebalken } = require('./utils');

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
      console.log(`  Kernel: Node.js ${process.version}`);
      console.log(`  Uptime: ${Math.floor(process.uptime())} Sekunden\n`);
      starteTerminal(username);
      break;

    case 'exit':
      // 3. Hier funktioniert dein Ladebalken jetzt problemlos!
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

