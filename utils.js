// Hilfsfunktion: Wartet X Millisekunden
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Hilfsfunktion: Zeichnet einen Ladebalken in der Konsole
async function zeigeLadebalken(titel, dauerInSekunden) {
  const breite = 30;
  const schritte = 100;
  const wartezeitProSchritt = (dauerInSekunden * 1000) / schritte;

  for (let i = 0; i <= schritte; i++) {
    const gefuellt = Math.round((breite * i) / 100);
    const leer = breite - gefuellt;
    const balken = '█'.repeat(gefuellt) + '░'.repeat(leer);
    process.stdout.write(`\r${titel} [${balken}] ${i}%`);
    await sleep(wartezeitProSchritt);
  }
  console.log('');
}

// Stellt die Funktionen für andere Dateien zur Verfügung
module.exports = { sleep, zeigeLadebalken };
