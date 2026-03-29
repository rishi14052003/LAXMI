import { Users, ShoppingCart, Package } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      icon: Users,
      iconColor: 'bg-blue-100',
      iconBgColor: 'text-blue-600',
      title: 'New customer registered',
      time: '2 minutes ago'
    },
    {
      icon: ShoppingCart,
      iconColor: 'bg-green-100',
      iconBgColor: 'text-green-600',
      title: 'New order #3210 received',
      time: '5 minutes ago'
    },
    {
      icon: Package,
      iconColor: 'bg-amber-100',
      iconBgColor: 'text-amber-600',
      title: 'Product updated successfully',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`h-8 w-8 ${activity.iconColor} rounded-full flex items-center justify-center`}>
                <Icon className={`h-4 w-4 ${activity.iconBgColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
