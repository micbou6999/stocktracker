// Fetch stock data from Yahoo Finance (no API key required)
function getStockData() {
    const ticker = document.getElementById('stock-ticker').value.toUpperCase();
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const stock = data.quoteResponse.result[0]; // Extract stock data from response
            const stockInfo = `
                <h3>${stock.longName || stock.symbol}</h3>
                <p><strong>Price:</strong> $${stock.regularMarketPrice}</p>
                <p><strong>Change:</strong> $${stock.regularMarketChange} (${stock.regularMarketChangePercent}%)</p>
                <p><strong>Latest Time:</strong> ${stock.regularMarketTime}</p>
            `;
            document.getElementById('stock-info').innerHTML = stockInfo;
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            document.getElementById('stock-info').innerHTML = "<p>Error fetching data. Please try again.</p>";
        });
}

// Simulate Dollar-Cost Averaging Strategy
function simulateDCA() {
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    const investmentMonths = parseInt(document.getElementById('investment-months').value);
    const ticker = document.getElementById('stock-ticker').value.toUpperCase();
    
    // Simulate a basic DCA strategy by assuming monthly price data (we'll use a simple fixed price for now for the example)
    const simulatedPrices = Array(investmentMonths).fill(100).map((price, index) => price * (1 + (Math.random() - 0.5) * 0.1));  // Simulate fluctuating prices
    
    let totalInvestment = 0;
    let totalSharesBought = 0;

    for (let month = 0; month < investmentMonths; month++) {
        const price = simulatedPrices[month];
        const sharesBought = investmentAmount / price;
        totalSharesBought += sharesBought;
        totalInvestment += investmentAmount;
    }

    // Calculate final value based on the last price
    const finalValue = totalSharesBought * simulatedPrices[simulatedPrices.length - 1];
    const profit = finalValue - totalInvestment;

    // Display the result
    document.getElementById('simulation-result').innerHTML = `
        <p><strong>Total Investment:</strong> $${totalInvestment.toFixed(2)}</p>
        <p><strong>Final Portfolio Value:</strong> $${finalValue.toFixed(2)}</p>
        <p><strong>Profit:</strong> $${profit.toFixed(2)}</p>
        <p><strong>Average Cost per Share:</strong> $${(totalInvestment / totalSharesBought).toFixed(2)}</p>
    `;
}
