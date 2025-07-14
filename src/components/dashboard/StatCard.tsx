import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';
import { useColor } from '../../contexts/ColorContext';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color 
}) => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  
  const colorClasses = {
    blue: secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-50') + ' dark:bg-opacity-20 ' + secondaryClasses.text,
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
  };

  return (
    <Card hover className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            {change !== undefined && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  'text-sm font-medium',
                  changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  {changeType === 'increase' ? '+' : '-'}{Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs mes anterior</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-lg', colorClasses[color])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};