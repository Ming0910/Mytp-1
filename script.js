const correctPassword = "091006";

function unlock() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("lockScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").innerText = "密碼錯誤，請重試。";
  }
}

let historyData = [];

function recordResult(result) {
  historyData.push(result);
  updateHistory();
  predictNext();
}

function updateHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = historyData.map(r => `<span class="record">${r}</span>`).join(" ");
}

function clearHistory() {
  historyData = [];
  updateHistory();
  document.getElementById("predictionResult").innerText = "";
}

function predictNext() {
  const count = historyData.reduce((acc, r) => {
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});
  const prediction = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("predictionResult").innerText = "預測下一局可能為：「" + prediction[0] + "」";
}