import React from 'react';

export default function AmountInput({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-4 text-lg font-semibold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        placeholder="Enter amount"
        min="0"
        step="0.01"
      />
    </div>
  );
}