import React from 'react';

export default function ConversionResult({ convertedAmount, toCurrency, currencySymbols }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-6">
      <label className="block text-sm font-semibold text-blue-100 mb-2">Converted Amount</label>
      <div className="text-3xl font-bold text-white">
        {currencySymbols[toCurrency] || ''} {convertedAmount} {toCurrency}
      </div>
    </div>
  );
}