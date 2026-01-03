import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Star, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';
import ExchangeRateDisplay from './ExchangeRateDisplay';
import HistoricalTrends from './HistoricalTrends';
import { fetchExchangeRates, convertCurrency } from '../services/exchangeRateService';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [favorites, setFavorites] = useState(['USD-EUR', 'GBP-USD', 'EUR-GBP']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
   'GHS', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 
    'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY',
    'INR', 'BRL', 'ZAR', 'RUB'
  ];

  const currencySymbols = {
   GHS: '₵', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$',
    CAD: 'C$', CHF: 'Fr', CNY: '¥', INR: '₹', BRL: 'R$'
  };

  useEffect(() => {
    loadExchangeRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRates[toCurrency] && amount) {
      const rate = exchangeRates[toCurrency];
      setExchangeRate(rate);
      setConvertedAmount(convertCurrency(amount, rate));
    }
  }, [amount, exchangeRates, toCurrency]);

  const loadExchangeRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchExchangeRates(fromCurrency);
      setExchangeRates(data.rates);
      setLastUpdated(data.lastUpdated);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefresh = () => {
    loadExchangeRates();
  };

  const toggleFavorite = (pair) => {
    if (favorites.includes(pair)) {
      setFavorites(favorites.filter(f => f !== pair));
    } else {
      setFavorites([...favorites, pair]);
    }
  };

  const currentPair = `${fromCurrency}-${toCurrency}`;
  const isFavorite = favorites.includes(currentPair);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Currency Converter</h1>
          <p className="text-gray-600">Real-time exchange rates for 166+ currencies</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Main Converter Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <CurrencySelector
            label="From"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currencies}
            currencySymbols={currencySymbols}
          />

          <AmountInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwapCurrencies}
              disabled={loading}
              className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeftRight className="w-6 h-6" />
            </button>
          </div>

          <CurrencySelector
            label="To"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            currencies={currencies}
            currencySymbols={currencySymbols}
          />

          <ConversionResult
            convertedAmount={convertedAmount}
            toCurrency={toCurrency}
            currencySymbols={currencySymbols}
          />

          {/* NEW: Detailed Exchange Rate Display */}
          <ExchangeRateDisplay
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRate={exchangeRate}
            lastUpdated={lastUpdated}
            loading={loading}
          />

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh Rates'}
            </button>
            <button
              onClick={() => toggleFavorite(currentPair)}
              className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
                isFavorite
                  ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* NEW: Historical Trends */}
        <HistoricalTrends
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          currentRate={exchangeRate}
        />

        {/* Favorite Pairs */}
        {favorites.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              Favorite Currency Pairs
            </h2>
            <div className="flex flex-wrap gap-3">
              {favorites.map(pair => (
                <button
                  key={pair}
                  onClick={() => {
                    const [from, to] = pair.split('-');
                    setFromCurrency(from);
                    setToCurrency(to);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 text-blue-700 font-semibold rounded-lg transition-all"
                >
                  {pair}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Powered by ExchangeRate-API</p>
          <p className="text-xs mt-2">By David Ofosu Amoah @2026</p>
        </div>
      </div>
    </div>
  );
}
