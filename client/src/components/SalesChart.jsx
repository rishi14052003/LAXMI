import { Filter, Download } from 'lucide-react';

const SalesChart = ({ chartData }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="h-64 sm:h-80 flex items-end justify-between space-x-2">
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors relative group" style={{ height: `${(data.sales / 6000) * 100}%` }}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ${data.sales}
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
