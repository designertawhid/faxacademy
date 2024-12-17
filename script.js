document.getElementById("calculateBtn").addEventListener("click", function () {
  // Input values
  const lotSize = parseFloat(document.getElementById("lotSize").value); // Lot size input
  const entryPrice = parseFloat(document.getElementById("entryPrice").value); // Entry price
  const slPrice = parseFloat(document.getElementById("slPrice").value); // Stop Loss price
  const tpPrice = parseFloat(document.getElementById("tpPrice").value); // Take Profit price
  const action = document.querySelector('input[name="action"]:checked').value; // Buy or Sell
  const pair = document.getElementById("pair").value; // Selected forex pair

  // Validation
  if (!lotSize || !entryPrice || !tpPrice || !slPrice) {
    alert("Please fill all fields!");
    return;
  }

  // Define pip size and pip value for XAUUSD
  let pipSize, pipValue;

  if (pair === "XAUUSD") {
    pipSize = 0.1;           // 1 pip = 0.1 price movement
    pipValue = 10 * lotSize; // 1 pip = $1 per lot, so for 0.01 lot, 1 pip = $0.10
  } else {
    pipSize = 0.0001;        // Default pip size for Forex pairs
    pipValue = 10 * lotSize; // 1 pip = $10 per lot for Forex pairs
  }

  // Calculate Pips for TP and SL based on Buy/Sell
  let pipsTP, pipsSL;

  if (action === "Buy") {
    pipsTP = (tpPrice - entryPrice) / pipSize; // Pips for Take Profit in Buy
    pipsSL = (entryPrice - slPrice) / pipSize; // Pips for Stop Loss in Buy
  } else if (action === "Sell") {
    pipsTP = (entryPrice - tpPrice) / pipSize; // Pips for Take Profit in Sell
    pipsSL = (slPrice - entryPrice) / pipSize; // Pips for Stop Loss in Sell
  }

  // Ensure no negative pip values
  pipsTP = Math.max(0, pipsTP);
  pipsSL = Math.max(0, pipsSL);

  // Calculate USD Profit or Loss
  const profitTP = (pipsTP * pipValue).toFixed(2); // USD for Take Profit
  const lossSL = (pipsSL * pipValue).toFixed(2);   // USD for Stop Loss

  // Display Results
  document.getElementById("actionResult").textContent = action; // Buy/Sell result
  document.getElementById("tpResult").textContent = `${pipsTP.toFixed(1)} Pips, +$${profitTP} USD`;

  const slResultElement = document.getElementById("slResult");
  slResultElement.textContent = `${pipsSL.toFixed(1)} Pips, -$${lossSL} USD`;
  slResultElement.style.color = "red"; // Apply red color to Stop Loss
});
