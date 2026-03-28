import { Plus, Users, BarChart3, Settings } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      iconColor: 'text-blue-600',
      title: 'Add Product'
    },
    {
      icon: Users,
      iconColor: 'text-green-600',
      title: 'Add Customer'
    },
    {
      icon: BarChart3,
      iconColor: 'text-purple-600',
      title: 'View Reports'
    },
    {
      icon: Settings,
      iconColor: 'text-orange-600',
      title: 'Settings'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Icon className={`h-5 w-5 ${action.iconColor} mb-2`} />
              <p className="text-sm font-medium text-gray-900">{action.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
