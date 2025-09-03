import React, { useState } from 'react';
import { Save, Target, Calendar, Scale } from 'lucide-react';
import { UserGoals } from '../App';

interface GoalSettingsProps {
  goals: UserGoals;
  onGoalsChange: (goals: UserGoals) => void;
}

export const GoalSettings: React.FC<GoalSettingsProps> = ({ goals, onGoalsChange }) => {
  const [formData, setFormData] = useState(goals);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGoalsChange(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: keyof UserGoals, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDailyCalories = () => {
    const weightDiff = formData.currentWeight - formData.targetWeight;
    const daysToGoal = Math.ceil((new Date(formData.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const weeklyWeightLoss = (weightDiff / daysToGoal) * 7;
    
    // Safe weight loss is 0.5-1kg per week
    if (weeklyWeightLoss > 1) {
      return Math.max(1200, formData.currentWeight * 22 - 500); // More aggressive deficit
    } else if (weeklyWeightLoss > 0.5) {
      return Math.max(1200, formData.currentWeight * 22 - 250); // Moderate deficit
    } else {
      return formData.currentWeight * 22; // Maintenance
    }
  };

  const suggestedCalories = Math.round(calculateDailyCalories());

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Goal Settings</h2>
        <p className="text-gray-600">Customize your nutrition and weight goals</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Weight Goals */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Scale className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Weight Goals</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weight (kg)
              </label>
              <input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => handleInputChange('currentWeight', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                step="0.1"
                min="30"
                max="200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Weight (kg)
              </label>
              <input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => handleInputChange('targetWeight', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                step="0.1"
                min="30"
                max="200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Date
            </label>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => handleInputChange('targetDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Daily Nutrition Goals */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Daily Nutrition Goals</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calories
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={formData.dailyCalories}
                  onChange={(e) => handleInputChange('dailyCalories', parseInt(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1000"
                  max="4000"
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('dailyCalories', suggestedCalories)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm whitespace-nowrap"
                >
                  Use {suggestedCalories}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Suggested: {suggestedCalories} calories</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protein (g)
              </label>
              <input
                type="number"
                value={formData.protein}
                onChange={(e) => handleInputChange('protein', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="50"
                max="300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vegetables (g)
              </label>
              <input
                type="number"
                value={formData.vegetables}
                onChange={(e) => handleInputChange('vegetables', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="200"
                max="800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carbs (g)
              </label>
              <input
                type="number"
                value={formData.carbs}
                onChange={(e) => handleInputChange('carbs', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="50"
                max="400"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
            isSaved
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
          }`}
        >
          {isSaved ? (
            <>
              <Calendar className="w-5 h-5" />
              <span>Goals Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Goals</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};