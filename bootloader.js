const fs = require('fs');
// Hier laden wir die Werkzeuge 
const { sleep, zeigeLadebalken } = require('./utils'); 

async function starteInstallation(configFile) {
  console.clear();
  console.log("==================================================");
  console.log("            TerminalOS<_ Installation             ");
  console.log("==================================================");
  await sleep(1000);

  // Dein Original-Countdown
  console.log("5..."); await sleep(1000);
  console.log("4..."); await sleep(1000);
  console.log("3..."); await sleep(1000);
  console.log("2..."); await sleep(1000);
  console.log("1..."); await sleep(1000);
  console.log("0..."); await sleep(1000);

  // Deine Original-Ladebalken
  await zeigeLadebalken("Installiere Basis-System ", 15);
  await zeigeLadebalken("Kompiliere Kernel-Module ", 20);
  await zeigeLadebalken("Konfiguriere Netzwerke   ", 10);
  await zeigeLadebalken("Erste Verwaltung des Arbeitsspeicher", 12);
  await zeigeLadebalken("Installiere Grafiktreiber", 10);
  await zeigeLadebalken("Überprüfe nach Fehler    ", 20);

  console.log("\n[ OK ] Generiere /etc/fstab...");
  console.log("[ OK ] Schreibe Bootloader GRUB auf /dev/sda...");
  await sleep(2000);

  // Speichert die Systemdaten (Dein Code)
  const systemDaten = {
    isInstalled: true,
    username: "root",
    installedAt: new Date().toISOString()
  };
  fs.writeFileSync(configFile, JSON.stringify(systemDaten, null, 2));

  console.log("\n----------------------------------");
  console.log("Installation erfolgreich abgeschlossen!");
  console.log("Tippe 'reboot' ein, um das System neu zu starten.");
  console.log("----------------------------------\n");
}

async function starteNormalenBoot() {
  console.clear();
  await zeigeLadebalken("Starte TerminalOS<_ v0.01...", 5);

  console.log("[ OK ] Lade Kernel v0.1.0-terminal-os...");
  await sleep(500);
  console.log("[ OK ] Mounte virtuelles Dateisystem...");
  await sleep(500);
  console.log("[ OK ] Starte Systemd-Dienste...");
  await sleep(800);
  console.log("[ OK ] Starte Arbeitsspeicherverwaltung");
  await sleep(1200);
}

// Stellt die Funktionen für die main.js zur Verfügung
module.exports = { starteInstallation, starteNormalenBoot };
