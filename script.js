document.getElementById("calculateBtn").addEventListener("click", function () {
  const lotSize = parseFloat(document.getElementById("lotSize").value); // Lot size input
  const entryPrice = parseFloat(document.getElementById("entryPrice").value); // Entry price
  const slPrice = parseFloat(document.getElementById("slPrice").value); // Stop Loss price
  const tpPrice = parseFloat(document.getElementById("tpPrice").value); // Take Profit price
  const action = document.querySelector('input[name="action"]:checked').value; // Buy or Sell
  const pair = document.getElementById("pair").value; // Selected forex pair

  if (!lotSize || !entryPrice || !tpPrice || !slPrice) {
    alert("Please fill all fields!");
    return;
  }

  // Define pip size based on pair
  let pipSize = 0.0001; // Default pip size for most currency pairs
  let pipValue = 0.1;   // Default pip value for 0.01 lot size

  // Special case for XAUUSD (gold), which has a different pip size and value
  if (pair === "XAUUSD") {
    pipSize = 0.01;  // XAUUSD pip size
    pipValue = 1;    // XAUUSD pip value (1 pip = 1 USD for 1 lot)
  }

  // Calculate pips for TP and SL based on the action
  let pipsTP, pipsSL;

  if (action === "Buy") {
    pipsTP = (tpPrice - entryPrice) / pipSize; // TP pips for Buy
    pipsSL = (entryPrice - slPrice) / pipSize; // SL pips for Buy
  } else if (action === "Sell") {
    pipsTP = (entryPrice - tpPrice) / pipSize; // TP pips for Sell
    pipsSL = (slPrice - entryPrice) / pipSize; // SL pips for Sell
  }

  // Ensure no negative pip values
  pipsTP = Math.max(0, pipsTP);
  pipsSL = Math.max(0, pipsSL);

  // Calculate profit or loss in USD
  const profitTP = (pipsTP * pipValue).toFixed(2); // Profit for TP
  const lossSL = (pipsSL * pipValue).toFixed(2); // Loss for SL

  // Display results
  document.getElementById("actionResult").textContent = action;
  document.getElementById("tpResult").textContent = `${pipsTP.toFixed(1)} Pips, +$${profitTP}`;
  const slResultElement = document.getElementById("slResult");
  slResultElement.textContent = `${pipsSL.toFixed(1)} Pips, -$${lossSL}`;

  // Apply red color to Stop Loss result
  slResultElement.style.color = "red";
});
