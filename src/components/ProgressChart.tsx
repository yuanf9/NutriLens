import React from 'react';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';
import { NutritionData, UserGoals } from '../App';

interface ProgressChartProps {
  totalNutrition: NutritionData;
  goals: UserGoals;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ totalNutrition, goals }) => {
  // Mock data for weekly progress
  const weeklyData = [
    { day: 'Mon', calories: 1650, protein: 95, vegetables: 320, carbs: 180 },
    { day: 'Tue', calories: 1720, protein: 105, vegetables: 380, carbs: 195 },
    { day: 'Wed', calories: 1590, protein: 88, vegetables: 290, carbs: 170 },
    { day: 'Thu', calories: 1680, protein: 98, vegetables: 350, carbs: 185 },
    { day: 'Fri', calories: 1750, protein: 110, vegetables: 420, carbs: 205 },
    { day: 'Sat', calories: 1800, protein: 115, vegetables: 450, carbs: 220 },
    { day: 'Today', calories: totalNutrition.calories, protein: totalNutrition.protein, vegetables: totalNutrition.vegetables, carbs: totalNutrition.carbs },
  ];

  const getWeeklyAverage = (metric: keyof Omit<NutritionData, 'fiber' | 'sugar'>) => {
    const total = weeklyData.reduce((sum, day) => sum + day[metric], 0);
    return Math.round(total / weeklyData.length);
  };

  const achievements = [
    { title: 'Protein Goal Streak', days: 5, icon: '💪', color: 'bg-blue-100 text-blue-800' },
    { title: 'Veggie Champion', days: 3, icon: '🥬', color: 'bg-green-100 text-green-800' },
    { title: 'Calorie Consistency', days: 7, icon: '🎯', color: 'bg-purple-100 text-purple-800' },
  ];

  const daysToGoal = Math.ceil((new Date(goals.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const weightProgress = ((goals.currentWeight - goals.targetWeight) / (goals.currentWeight - goals.targetWeight)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Progress Tracking</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{daysToGoal} days to goal</span>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Weekly Nutrition Overview</h3>
        
        <div className="space-y-6">
          {/* Calories Chart */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Daily Calories</h4>
              <span className="text-sm text-gray-500">Target: {goals.dailyCalories}</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => {
                const percentage = (day.calories / goals.dailyCalories) * 100;
                const height = Math.min(percentage, 100);
                
                return (
                  <div key={day.day} className="text-center">
                    <div className="relative h-32 bg-gray-100 rounded-lg mb-2 flex items-end justify-center">
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          index === weeklyData.length - 1
                            ? 'bg-gradient-to-t from-orange-500 to-orange-400'
                            : 'bg-gradient-to-t from-orange-300 to-orange-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="absolute bottom-2 text-xs font-semibold text-white">
                        {day.calories}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Macro nutrients summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-blue-800">Protein</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{getWeeklyAverage('protein')}g</span>
                <span className="text-sm text-blue-600">avg/day</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Vegetables</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">{getWeeklyAverage('vegetables')}g</span>
                <span className="text-sm text-green-600">avg/day</span>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-purple-800">Carbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-600">{getWeeklyAverage('carbs')}g</span>
                <span className="text-sm text-purple-600">avg/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">Achievements</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg ${achievement.color}`}>
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-sm opacity-80">{achievement.days} day streak</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight Goal Progress */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Weight Goal Progress</h3>
          </div>
          <TrendingUp className="w-6 h-6" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{goals.currentWeight}kg</p>
            <p className="text-sm opacity-90">Current</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{goals.targetWeight}kg</p>
            <p className="text-sm opacity-90">Target</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{Math.abs(goals.currentWeight - goals.targetWeight)}kg</p>
            <p className="text-sm opacity-90">To Go</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{daysToGoal}</p>
            <p className="text-sm opacity-90">Days Left</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${Math.min(weightProgress, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm opacity-90">
          <span>Started</span>
          <span>{new Date(goals.targetDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};