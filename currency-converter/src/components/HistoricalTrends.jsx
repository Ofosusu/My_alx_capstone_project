import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function HistoricalTrends({ fromCurrency, toCurrency, currentRate }) {
  // Mock historical data for the last 7 days
  const historicalData = [
    { date: 'Jan 27', rate: currentRate * 0.995 },
    { date: 'Jan 28', rate: currentRate * 0.998 },
    { date: 'Jan 29', rate: currentRate * 1.002 },
    { date: 'Jan 30', rate: currentRate * 0.997 },
    { date: 'Jan 31', rate: currentRate * 1.001 },
    { date: 'Feb 01', rate: currentRate * 0.999 },
    { date: 'Today', rate: currentRate },
  ];

  const maxRate = Math.max(...historicalData.map(d => d.rate));
  const minRate = Math.min(...historicalData.map(d => d.rate));

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          7-Day Exchange Rate Trend
        </h2>
        <div className="text-sm text-gray-600">
          {fromCurrency} → {toCurrency}
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-3">
        {historicalData.map((data, index) => {
          const percentage = ((data.rate - minRate) / (maxRate - minRate)) * 100;
          const isToday = data.date === 'Today';
          
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-xs font-semibold text-gray-600">
                {data.date}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                      : 'bg-gradient-to-r from-blue-300 to-indigo-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <span className={`text-xs font-bold ${
                    isToday ? 'text-white' : 'text-gray-700'
                  }`}>
                    {data.rate.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Highest</p>
          <p className="text-lg font-bold text-green-600">{maxRate.toFixed(4)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Average</p>
          <p className="text-lg font-bold text-gray-800">
            {(historicalData.reduce((sum, d) => sum + d.rate, 0) / historicalData.length).toFixed(4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Lowest</p>
          <p className="text-lg font-bold text-red-600">{minRate.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}