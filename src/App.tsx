import React, { useState } from 'react';
import { Header } from './components/Header';
import { PhotoUpload } from './components/PhotoUpload';
import { NutritionSummary } from './components/NutritionSummary';
import { GoalSettings } from './components/GoalSettings';
import { ProgressChart } from './components/ProgressChart';
import { FoodAnalysis } from './components/FoodAnalysis';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './hooks/useAuth';
import { useUserGoals } from './hooks/useUserGoals';
import { useFoodLogs } from './hooks/useFoodLogs';
import { Loader } from 'lucide-react';

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
  const { user, loading: authLoading } = useAuth();
  const { goals, loading: goalsLoading, updateGoals } = useUserGoals(user?.id);
  const { foods, loading: foodsLoading, totalNutrition, addFood } = useFoodLogs(user?.id);
  
  const [currentView, setCurrentView] = useState<'upload' | 'summary' | 'goals' | 'progress'>('upload');
  const [analysisResult, setAnalysisResult] = useState<FoodItem | null>(null);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading NutriLens...</p>
        </div>
      </div>
    );
  }

  // Show auth form if user is not logged in
  if (!user) {
    return <AuthForm />;
  }

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

  const addFoodToToday = async (food: FoodItem) => {
    await addFood({
      name: food.name,
      image: food.image,
      nutrition: food.nutrition,
      timestamp: food.timestamp
    });
    setAnalysisResult(null);
  };

  const isLoading = goalsLoading || foodsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header currentView={currentView} onViewChange={setCurrentView} user={user} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
              <p className="text-gray-600">Loading your data...</p>
            </div>
          </div>
        ) : (
          <>
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
                foods={foods}
                totalNutrition={totalNutrition}
                goals={goals}
              />
            )}
            
            {currentView === 'goals' && (
              <GoalSettings 
                goals={goals}
                onGoalsChange={updateGoals}
              />
            )}
            
            {currentView === 'progress' && (
              <ProgressChart 
                totalNutrition={totalNutrition}
                goals={goals}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;