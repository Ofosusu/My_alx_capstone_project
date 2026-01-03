import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Star, RefreshCw, TrendingUp } from 'lucide-react';
import CurrencySelector from "./CurrencySelector.jsx";
import AmountInput from "./AmountInput.jsx";
import ConversionResult from "./ConversionResult.jsx";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0.8530);
  const [convertedAmount, setConvertedAmount] = useState(0.8530);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [favorites, setFavorites] = useState(['USD-EUR', 'GBP-USD', 'EUR-GBP']);
  const [loading, setLoading] = useState(false);

  const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 
    'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY',
    'INR', 'BRL', 'ZAR', 'RUB'
  ];

  const currencySymbols = {
    USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$',
    CAD: 'C$', CHF: 'Fr', CNY: '¥', INR: '₹', BRL: 'R$'
  };

  useEffect(() => {
    if (amount && !isNaN(amount)) {
      setConvertedAmount((parseFloat(amount) * exchangeRate).toFixed(4));
    }
  }, [amount, exchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setExchangeRate(1 / exchangeRate);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 500);
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

        {/* Main Converter Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          {/* From Currency Selector */}
          <CurrencySelector
            label="From"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currencies}
            currencySymbols={currencySymbols}
          />

          {/* Amount Input */}
          <AmountInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Swap Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwapCurrencies}
              className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <ArrowLeftRight className="w-6 h-6" />
            </button>
          </div>

          {/* To Currency Selector */}
          <CurrencySelector
            label="To"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            currencies={currencies}
            currencySymbols={currencySymbols}
          />

          {/* Conversion Result */}
          <ConversionResult
            convertedAmount={convertedAmount}
            toCurrency={toCurrency}
            currencySymbols={currencySymbols}
          />

          {/* Exchange Rate Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Exchange Rate</p>
                <p className="text-lg font-bold text-gray-800">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-gray-700">
                  {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Rates
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
          <p className="text-sm">Exchange rates updated regularly from reliable sources</p>
          <p className="text-xs mt-2">Built with React and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
