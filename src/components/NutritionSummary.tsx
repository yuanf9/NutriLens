import React from 'react';
import { Calendar, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { FoodItem, NutritionData, UserGoals } from '../App';

interface NutritionSummaryProps {
  foods: FoodItem[];
  totalNutrition: NutritionData;
  goals: UserGoals;
}

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({ foods, totalNutrition, goals }) => {
  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const nutritionTargets = [
    { name: 'Calories', current: totalNutrition.calories, target: goals.dailyCalories, unit: '' },
    { name: 'Protein', current: totalNutrition.protein, target: goals.protein, unit: 'g' },
    { name: 'Vegetables', current: totalNutrition.vegetables, target: goals.vegetables, unit: 'g' },
    { name: 'Carbs', current: totalNutrition.carbs, target: goals.carbs, unit: 'g' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Today's Summary</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nutritionTargets.map(({ name, current, target, unit }) => {
          const percentage = getProgressPercentage(current, target);
          const colorClass = getProgressColor(current, target);
          
          return (
            <div key={name} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">{name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                  {Math.round((current / target) * 100)}%
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-800">{current}</span>
                  <span className="text-sm text-gray-500">/ {target}{unit}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage >= 90 ? 'bg-green-500' :
                    percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal History */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Today's Meals</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {foods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No meals logged today. Start by uploading a photo!</p>
            </div>
          ) : (
            foods.map((food) => (
              <div key={food.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{food.name}</h4>
                  <p className="text-sm text-gray-500">
                    {food.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-orange-600">{food.nutrition.calories}</p>
                    <p className="text-gray-500 text-xs">cal</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-600">{food.nutrition.protein}g</p>
                    <p className="text-gray-500 text-xs">protein</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Goal Status */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Weight Goal Progress</h3>
            <p className="opacity-90">
              Target: {goals.targetWeight}kg by {new Date(goals.targetDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {goals.currentWeight > goals.targetWeight ? (
                <TrendingDown className="w-6 h-6" />
              ) : (
                <TrendingUp className="w-6 h-6" />
              )}
              <span className="text-2xl font-bold">
                {Math.abs(goals.currentWeight - goals.targetWeight)}kg
              </span>
            </div>
            <p className="text-sm opacity-90">to go</p>
          </div>
        </div>
      </div>
    </div>
  );
};