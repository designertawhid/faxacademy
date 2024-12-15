document.getElementById("calculateBtn").addEventListener("click", function () {
  const lotSize = parseFloat(document.getElementById("lotSize").value); // Lot size input
  const entryPrice = parseFloat(document.getElementById("entryPrice").value); // Entry price
  const slPrice = parseFloat(document.getElementById("slPrice").value); // Stop Loss price
  const tpPrice = parseFloat(document.getElementById("tpPrice").value); // Take Profit price
  const action = document.querySelector('input[name="action"]:checked').value; // Buy or Sell

  if (!lotSize || !entryPrice || !tpPrice || !slPrice) {
    alert("Please fill all fields!");
    return;
  }

  // Calculate pips for TP and SL
  let pipsTP, pipsSL;

  if (action === "Buy") {
    pipsTP = (tpPrice - entryPrice) / 0.1; // TP pips for Buy
    pipsSL = (entryPrice - slPrice) / 0.1; // SL pips for Buy
  } else if (action === "Sell") {
    pipsTP = (entryPrice - tpPrice) / 0.1; // TP pips for Sell
    pipsSL = (slPrice - entryPrice) / 0.1; // SL pips for Sell
  }

  // Ensure no negative pip values
  pipsTP = Math.max(0, pipsTP);
  pipsSL = Math.max(0, pipsSL);

  // Calculate profit or loss in USD
  const profitTP = (pipsTP * lotSize * 10).toFixed(2); // Profit for TP
  const lossSL = (pipsSL * lotSize * 10).toFixed(2); // Loss for SL

  // Display results
  document.getElementById("actionResult").textContent = action;
  document.getElementById("tpResult").textContent = `${pipsTP.toFixed(1)} Pips, $${profitTP}`;
  
  const slResultElement = document.getElementById("slResult");
  slResultElement.textContent = `${pipsSL.toFixed(1)} Pips, -$${lossSL}`;
  
  // Apply red color to Stop Loss result
  slResultElement.style.color = "red";
});
