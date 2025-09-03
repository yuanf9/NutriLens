import React, { useState } from 'react';
import { Header } from './components/Header';
import { PhotoUpload } from './components/PhotoUpload';
import { NutritionSummary } from './components/NutritionSummary';
import { GoalSettings } from './components/GoalSettings';
import { ProgressChart } from './components/ProgressChart';
import { FoodAnalysis } from './components/FoodAnalysis';

export interface UserGoals {
  currentWeight: number;
  targetWeight: number;
  targetDate: string;
  dailyCalories: number;
  protein: number;
  vegetables: number;
  carbs: number;
}

export interface NutritionData {
  calories: number;
  protein: number;
  vegetables: number;
  carbs: number;
  fiber: number;
  sugar: number;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  nutrition: NutritionData;
  timestamp: Date;
}

function App() {
  const [currentView, setCurrentView] = useState<'upload' | 'summary' | 'goals' | 'progress'>('upload');
  const [userGoals, setUserGoals] = useState<UserGoals>({
    currentWeight: 70,
    targetWeight: 65,
    targetDate: '2025-02-28',
    dailyCalories: 1800,
    protein: 120,
    vegetables: 400,
    carbs: 200
  });

  const [todaysFoods, setTodaysFoods] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Grilled Chicken Salad',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      nutrition: {
        calories: 350,
        protein: 35,
        vegetables: 150,
        carbs: 15,
        fiber: 8,
        sugar: 5
      },
      timestamp: new Date()
    },
    {
      id: '2',
      name: 'Oatmeal with Berries',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400',
      nutrition: {
        calories: 280,
        protein: 12,
        vegetables: 0,
        carbs: 45,
        fiber: 6,
        sugar: 12
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const [analysisResult, setAnalysisResult] = useState<FoodItem | null>(null);

  const handlePhotoAnalysis = (imageUrl: string) => {
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResult: FoodItem = {
        id: Date.now().toString(),
        name: 'Analyzed Meal',
        image: imageUrl,
        nutrition: {
          calories: Math.floor(Math.random() * 400) + 200,
          protein: Math.floor(Math.random() * 30) + 15,
          vegetables: Math.floor(Math.random() * 100) + 50,
          carbs: Math.floor(Math.random() * 50) + 20,
          fiber: Math.floor(Math.random() * 10) + 3,
          sugar: Math.floor(Math.random() * 15) + 5
        },
        timestamp: new Date()
      };
      setAnalysisResult(mockResult);
    }, 2000);
  };

  const addFoodToToday = (food: FoodItem) => {
    setTodaysFoods(prev => [food, ...prev]);
    setAnalysisResult(null);
  };

  const totalNutrition = todaysFoods.reduce((total, food) => ({
    calories: total.calories + food.nutrition.calories,
    protein: total.protein + food.nutrition.protein,
    vegetables: total.vegetables + food.nutrition.vegetables,
    carbs: total.carbs + food.nutrition.carbs,
    fiber: total.fiber + food.nutrition.fiber,
    sugar: total.sugar + food.nutrition.sugar
  }), { calories: 0, protein: 0, vegetables: 0, carbs: 0, fiber: 0, sugar: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {currentView === 'upload' && (
          <div className="space-y-6">
            <PhotoUpload onPhotoAnalysis={handlePhotoAnalysis} />
            {analysisResult && (
              <FoodAnalysis 
                result={analysisResult} 
                onAddFood={addFoodToToday}
                onDiscard={() => setAnalysisResult(null)}
              />
            )}
          </div>
        )}
        
        {currentView === 'summary' && (
          <NutritionSummary 
            foods={todaysFoods}
            totalNutrition={totalNutrition}
            goals={userGoals}
          />
        )}
        
        {currentView === 'goals' && (
          <GoalSettings 
            goals={userGoals}
            onGoalsChange={setUserGoals}
          />
        )}
        
        {currentView === 'progress' && (
          <ProgressChart 
            totalNutrition={totalNutrition}
            goals={userGoals}
          />
        )}
      </main>
    </div>
  );
}

export default App;