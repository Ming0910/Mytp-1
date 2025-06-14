
function calculateRT() {
  const p1 = parseInt(document.getElementById('player1').value);
  const p2 = parseInt(document.getElementById('player2').value);
  const b1 = parseInt(document.getElementById('banker1').value);
  const b2 = parseInt(document.getElementById('banker2').value);

  if (isNaN(p1) || isNaN(p2) || isNaN(b1) || isNaN(b2)) {
    document.getElementById('rtResult').innerText = "請輸入完整的牌面點數";
    return;
  }

  const playerTotal = (p1 + p2) % 10;
  const bankerTotal = (b1 + b2) % 10;

  let cp = playerTotal - bankerTotal;
  let ap = (cp > 0) ? 1 : cp < 0 ? -1 : 0;
  let rt = cp + ap;

  let suggestion = "";
  if (rt > 0) {
    suggestion = "建議下注：閒";
  } else if (rt < 0) {
    suggestion = "建議下注：莊";
  } else {
    suggestion = "建議觀望";
  }

  document.getElementById('rtResult').innerText = `RT 值：${rt}，${suggestion}`;
}
