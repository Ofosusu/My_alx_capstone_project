const API_KEY = 'dd4299f3edc993768a74b508';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    if (data.result === 'success') {
      return {
        rates: data.conversion_rates,
        lastUpdated: new Date(data.time_last_update_unix * 1000),
        baseCurrency: data.base_code
      };
    } else {
      throw new Error('API returned an error');
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = (amount, rate) => {
  return (parseFloat(amount) * rate).toFixed(4);
};