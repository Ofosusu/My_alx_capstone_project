import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';

export default function ExchangeRateDisplay({ 
  fromCurrency, 
  toCurrency, 
  exchangeRate, 
  lastUpdated,
  loading 
}) {
  // Mock historical data - in a real app, you'd fetch this from the API
  const mockTrend = 0.52; // Percentage change (positive = up, negative = down)
  const isPositiveTrend = mockTrend > 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border-2 border-gray-200">
      {/* Main Exchange Rate */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Current Exchange Rate
          </h3>
          {!loading && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              isPositiveTrend 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isPositiveTrend ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(mockTrend)}%
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-800">
            {loading ? '...' : exchangeRate.toFixed(4)}
          </span>
          <span className="text-lg text-gray-600 font-medium">
            {toCurrency}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          per 1 {fromCurrency}
        </p>
      </div>

      {/* Additional Info Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-gray-200">
        {/* Last Updated */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <p className="text-xs font-semibold text-gray-600">Last Updated</p>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {lastUpdated.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className="text-xs text-gray-500">
            {lastUpdated.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Inverse Rate */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <p className="text-xs font-semibold text-gray-600">Inverse Rate</p>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {loading ? '...' : (1 / exchangeRate).toFixed(4)}
          </p>
          <p className="text-xs text-gray-500">
            1 {toCurrency} = {loading ? '...' : (1 / exchangeRate).toFixed(4)} {fromCurrency}
          </p>
        </div>
      </div>

      {/* Trend Information */}
      {!loading && (
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">24h Change:</span> The exchange rate has{' '}
            <span className={isPositiveTrend ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {isPositiveTrend ? 'increased' : 'decreased'}
            </span>{' '}
            by {Math.abs(mockTrend)}% in the last 24 hours.
          </p>
        </div>
      )}
    </div>
  );
}