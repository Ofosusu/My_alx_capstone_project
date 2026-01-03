const API_KEY = "R7EG83dcdbjW5767mETt62akUEXNQa";
const BASE_URL = "https://www.amdoren.com/api/currency.php";

// CORS proxy
const PROXY = "https://api.allorigins.win/raw?url=";

export async function convertCurrency(from, to, amount) {
  const url = `${BASE_URL}?api_key=${API_KEY}&from=${from}&to=${to}`;
  const response = await fetch(PROXY + encodeURIComponent(url));

  const data = await response.json();

  if (data.error !== 0) {
    throw new Error(data.error_message || "Conversion failed");
  }

  return {
    rate: data.value,
    result: (amount * data.value).toFixed(2),
  };
}
