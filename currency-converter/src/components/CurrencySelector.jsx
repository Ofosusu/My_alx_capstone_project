import React from 'react';

export default function CurrencySelector({ label, value, onChange, currencies, currencySymbols }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-4 pr-10 text-lg font-semibold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none cursor-pointer"
        >
          {currencies.map(curr => (
            <option key={curr} value={curr}>
              {curr} {currencySymbols[curr] ? `(${currencySymbols[curr]})` : ''}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}