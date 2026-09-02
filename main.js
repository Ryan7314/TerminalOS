const fs = require('fs');
const readline = require('readline');

// Importiere deine eigenen Module
const { starteInstallation, starteNormalenBoot } = require('./bootloader');
const { verarbeiteBefehl } = require('./commands');

const configFile = './system_config.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function warteAufReboot() {
  rl.question('installer@terminal-os:~# ', (input) => {
    if (input.trim().toLowerCase() === 'reboot') {
      console.log('\nSystem wird neu gestartet...\n');
      setTimeout(() => {
        main(); // Startet die Main-Funktion neu -> erkennt jetzt die Config-Datei!
      }, 1500);
    } else {
      console.log("Unbekannter Befehl. Bitte tippe 'reboot' ein.");
      warteAufReboot();
    }
  });
}

function startTerminal(username) {
  rl.question(`${username}@terminalOS:~:# `, (input) => {
    const eingabe = input.trim();

    // Trennt den Befehl von den Parametern
    const teile = eingabe.split(' ');
    const command = teile[0].toLowerCase();
    const args = teile.slice(1);

    // Übergibt die Eingabe an die commands.js
    verarbeiteBefehl(command, args, username, configFile, rl, startTerminal);
  });
}

async function main() {
  if (!fs.existsSync(configFile)) {
    // 1. Erstinstallation durchführen
    await starteInstallation(configFile);
    warteAufReboot();
  } else {
    // 2. Normaler Bootvorgang
    await starteNormalenBoot();

    const dateiInhalt = fs.readFileSync(configFile, 'utf-8');
    const systemDaten = JSON.parse(dateiInhalt);

    console.log(`\nWillkommen zurück, ${systemDaten.username}!\n`);
    
    // Starte das normale Terminal
    startTerminal(systemDaten.username);
  }
}

// Programm starten
main();
