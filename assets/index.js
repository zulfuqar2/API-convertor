const API_URL = "https://api.exchangerate.host/latest";

// Form element references
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultDiv = document.getElementById("result");
const convertButton = document.getElementById("convert-btn");

// Load currency options on page load
window.addEventListener("load", async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        for (const currency in data.rates) {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency;
            fromSelect.add(option1);
            const option2 = document.createElement("option");
            option2.value = currency;
            option2.text = currency;
            toSelect.add(option2);
        }
    } catch (error) {
        console.error(error);
    }
});

// Convert currency on button click
convertButton.addEventListener("click", async () => {
    try {
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        const amount = amountInput.value;

        const response = await fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
        const data = await response.json();

        const rate = data.rates[toCurrency];
        const result = amount * rate;

        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error(error);
    }
});
