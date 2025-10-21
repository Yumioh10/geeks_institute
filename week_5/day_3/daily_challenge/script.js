// ** IMPORTANT: Replace 'YOUR_API_KEY' with your actual API key from ExchangeRate-API **
const API_KEY = '87c7abef82d994f7d59c8b1e'; 
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

// DOM Elements
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultOutput = document.getElementById('result-output');

/**
 * Fetches the list of supported currency codes from the API (Requirement 2).
 * @returns {Promise<Array>} An array of currency codes (e.g., ['USD', 'EUR', ...])
 */
async function fetchSupportedCurrencies() {
    // Styling the loading message with Tailwind classes
    resultOutput.innerHTML = '<p class="text-yellow-600 font-medium">Fetching currencies...</p>';
    const url = `${BASE_URL}${API_KEY}/codes`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.result === 'success') {
            // The structure is [[CODE, Description], [CODE, Description], ...]
            return data.supported_codes.map(codeArray => codeArray[0]);
        } else {
            throw new Error(`API Error: ${data['error-type']}`);
        }
    } catch (error) {
        console.error('Error fetching supported currencies:', error);
        // Styling the error message with Tailwind classes
        resultOutput.innerHTML = `<p class="text-red-600 font-bold">Error loading currencies. Check your API key and connection. (${error.message})</p>`;
        return [];
    }
}

/**
 * Populates the 'From' and 'To' currency select elements.
 * @param {Array<string>} codes - The array of currency codes.
 */
function populateCurrencySelectors(codes) {
    if (codes.length === 0) return;

    // Clear initial message and set placeholder
    resultOutput.innerHTML = '<p class="text-gray-600">Select currencies and amount to convert.</p>';

    codes.forEach(code => {
        // Create an option element for each code
        const option1 = document.createElement('option');
        option1.value = code;
        option1.textContent = code;
        
        const option2 = document.createElement('option');
        option2.value = code;
        option2.textContent = code;

        // Add to both selectors
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
    });

    // Set some defaults for better UX
    fromCurrencySelect.value = 'USD'; 
    toCurrencySelect.value = 'EUR';
}

/**
 * Fetches the conversion rate and calculated amount (Requirement 3).
 */
async function convertCurrency() {
    const fromCode = fromCurrencySelect.value;
    const toCode = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        // Styling the warning message with Tailwind classes
        resultOutput.innerHTML = '<p class="text-orange-600 font-medium">Please enter a valid amount.</p>';
        return;
    }

    // Styling the loading message with Tailwind classes
    resultOutput.innerHTML = '<p class="text-blue-500 font-medium">Converting...</p>';
    
    // API endpoint for Pair Conversion with optional amount (Hint)
    const url = `${BASE_URL}${API_KEY}/pair/${fromCode}/${toCode}/${amount}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rate;
            const convertedAmount = data.conversion_result.toFixed(2); // Output with 2 decimal places

            // Output the result (Requirement 1) using Tailwind classes for styling
            resultOutput.innerHTML = `
                <p><strong>Amount:</strong> ${amount.toFixed(2)} ${fromCode}</p>
                <p class="mt-1"><strong>Rate:</strong> 1 ${fromCode} = ${rate.toFixed(4)} ${toCode}</p>
                <p class="mt-2 text-xl text-green-600 font-bold">
                    <strong>Converted Amount:</strong> ${convertedAmount} ${toCode}
                </p>
            `;
        } else {
            throw new Error(`API Error: ${data['error-type']}`);
        }
    } catch (error) {
        console.error('Error during conversion:', error);
        // Styling the error message with Tailwind classes
        resultOutput.innerHTML = `<p class="text-red-600 font-bold">Conversion failed: ${error.message}</p>`;
    }
}

/**
 * Switches the 'From' and 'To' currencies (Bonus).
 */
function switchCurrencies() {
    const fromValue = fromCurrencySelect.value;
    const toValue = toCurrencySelect.value;
    
    fromCurrencySelect.value = toValue;
    toCurrencySelect.value = fromValue;

    // Immediately trigger the new conversion after switching
    convertCurrency();
}

/**
 * Initialize the application: fetch codes and set up event listeners.
 */
async function init() {
    // 1. Fetch and populate currencies
    const currencyCodes = await fetchSupportedCurrencies();
    populateCurrencySelectors(currencyCodes);

    // 2. Set up event listeners
    convertBtn.addEventListener('click', convertCurrency);
    switchBtn.addEventListener('click', switchCurrencies);
    
    // Optional: Convert on Enter key press in the amount input
    amountInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            convertCurrency();
        }
    });

    // Run an initial conversion after selectors are populated
    if (currencyCodes.length > 0) {
        convertCurrency();
    }
}

// Start the application
init();