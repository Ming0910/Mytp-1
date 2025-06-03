
function getCP(card) {
    const map = {'A': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 1,'7': 3,'8': 2,'9': 2,'10': 0,'J': 0,'Q': 0,'K': 0};
    return map[card.toUpperCase()] || 0;
}
function getAP(card) {
    const map = {'A': 0.9,'2': 0.8,'3': 0.7,'4': 0.6,'5': 0.5,'6': 0.4,'7': 0.3,'8': 0.2,'9': 0.1,'10': 0.05,'J': 0.05,'Q': 0.05,'K': 0.05};
    return map[card.toUpperCase()] || 0;
}
function calculateRT() {
    const player = document.getElementById("playerInput").value.split(',').map(c => c.trim());
    const banker = document.getElementById("bankerInput").value.split(',').map(c => c.trim());
    let cpPlayer = player.reduce((sum, card) => sum + getCP(card), 0);
    let cpBanker = banker.reduce((sum, card) => sum + getCP(card), 0);
    let apPlayer = player.reduce((sum, card) => sum + getAP(card), 0);
    let apBanker = banker.reduce((sum, card) => sum + getAP(card), 0);
    let valuePlayer = cpPlayer * (apPlayer / player.length);
    let valueBanker = cpBanker * (apBanker / banker.length);
    let result = "";
    if (valuePlayer > valueBanker) {
        result = "建議下注：閒家";
    } else if (valuePlayer < valueBanker) {
        result = "建議下注：莊家";
    } else {
        result = "建議：雙方機會接近";
    }
    document.getElementById("resultBox").innerText = `閒家分數：${valuePlayer.toFixed(2)}，莊家分數：${valueBanker.toFixed(2)} ➤ ${result}`;
    saveHistory(`閒: ${valuePlayer.toFixed(2)} | 莊: ${valueBanker.toFixed(2)} ➤ ${result}`);
}
function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem("rtHistory") || "[]");
    history.unshift(entry);
    if (history.length > 10) history.pop();
    localStorage.setItem("rtHistory", JSON.stringify(history));
    renderHistory();
}
function renderHistory() {
    const history = JSON.parse(localStorage.getItem("rtHistory") || "[]");
    document.getElementById("historyArea").innerHTML = history.map(h => `<div>${h}</div>`).join("");
}
function clearHistory() {
    localStorage.removeItem("rtHistory");
    renderHistory();
}
window.onload = renderHistory;
