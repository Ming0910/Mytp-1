
function getCP(card) {
  const map = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 3, '8': 4, '9': 5, '10': 0, 'J': 0, 'Q': 0, 'K': 0 };
  return map[card.toUpperCase()] || 0;
}

function getAP(card) {
  const map = { 'A': 0.9, '2': 0.8, '3': 0.7, '4': 0.6, '5': 0.5, '6': 0.4, '7': 0.3, '8': 0.2, '9': 0.1, '10': 0.05, 'J': 0.05, 'Q': 0.05, 'K': 0.05 };
  return map[card.toUpperCase()] || 0;
}

function calculate() {
  const player = document.getElementById("player").value.split(',').map(c => c.trim());
  const banker = document.getElementById("banker").value.split(',').map(c => c.trim());

  let cpPlayer = player.reduce((sum, card) => sum + getCP(card), 0);
  let cpBanker = banker.reduce((sum, card) => sum + getCP(card), 0);
  let apPlayer = player.reduce((sum, card) => sum + getAP(card), 0);
  let apBanker = banker.reduce((sum, card) => sum + getAP(card), 0);

  let valuePlayer = cpPlayer * (apPlayer / player.length);
  let valueBanker = cpBanker * (apBanker / banker.length);

  let result = "";
  if (valuePlayer > valueBanker) result = "建議下注：閒家";
  else if (valuePlayer < valueBanker) result = "建議下注：莊家";
  else result = "建議：視局勢斟酌，雙方機會接近";

  const tie = Math.random() < 0.08 ? "可能和局 " : "";
  const pp = Math.random() < 0.10 ? "閒對 " : "";
  const bp = Math.random() < 0.10 ? "莊對 " : "";
  const lucky6 = Math.random() < 0.05 ? "幸運6 " : "";

  const prediction = `${result} ${tie}${pp}${bp}${lucky6}`;
  document.getElementById("result").textContent = `閒家分數：${valuePlayer.toFixed(2)}，莊家分數：${valueBanker.toFixed(2)} ➤ ${prediction}`;

  const historyDiv = document.getElementById("history");
  const entry = document.createElement("div");
  entry.className = "history-entry";
  entry.textContent = `閒: ${player.join(',')} | 莊: ${banker.join(',')} ➤ ${prediction}`;
  historyDiv.prepend(entry);
}

function clearHistory() {
  document.getElementById("history").innerHTML = "";
}
