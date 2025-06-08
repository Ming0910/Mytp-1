function getCP(card) {
  const map = { 'A': 9, '2': 8, '3': 7, '4': 6, '5': 5, '6': 1, '7': 3, '8': 2, '9': 2, '10': 0, 'J': 0, 'Q': 0, 'K': 0 };
  return map[card.toUpperCase()] || 0;
}

function getAP(diff) {
  const map = { 0: -4, 1: -5, 2: -5, 3: -2, 4: -1, 5: -1, 6: 3, 7: 4, 8: 5, 9: 6 };
  return map[diff] ?? 0;
}

function calculate() {
  const playerCards = document.getElementById("player").value.split(',').map(s => s.trim().toUpperCase());
  const bankerCards = document.getElementById("banker").value.split(',').map(s => s.trim().toUpperCase());

  let playerPoints = (getCP(playerCards[0]) + getCP(playerCards[1])) % 10;
  let bankerPoints = (getCP(bankerCards[0]) + getCP(bankerCards[1])) % 10;
  let playerHV = Math.max(...playerCards.map(getCP));
  let bankerHV = Math.max(...bankerCards.map(getCP));

  let agPlayer = getAP(Math.abs(playerPoints - bankerPoints));
  let agBanker = getAP(Math.abs(bankerPoints - playerPoints));
  let tpPlayer = playerHV * agPlayer / 10;
  let tpBanker = bankerHV * agBanker / 10;

  let resultText = `閒TP=${tpPlayer.toFixed(2)}，莊TP=${tpBanker.toFixed(2)} → `;
  if (tpPlayer > tpBanker) resultText += "建議下注：閒家";
  else if (tpPlayer < tpBanker) resultText += "建議下注：莊家";
  else resultText += "機會接近";

  document.getElementById("result").innerText = resultText;
}

function addEntry(entry) {
  const log = document.getElementById("historyLog");
  const div = document.createElement("div");
  div.className = "log-item";
  div.innerText = entry;
  log.appendChild(div);
}

function clearHistory() {
  document.getElementById("historyLog").innerHTML = '';
}