import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { FoodItem } from '../App';

interface FoodAnalysisProps {
  result: FoodItem;
  onAddFood: (food: FoodItem) => void;
  onDiscard: () => void;
}

export const FoodAnalysis: React.FC<FoodAnalysisProps> = ({ result, onAddFood, onDiscard }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        <img
          src={result.image}
          alt={result.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{result.name}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{result.nutrition.calories}</p>
              <p className="text-sm text-gray-600">Calories</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{result.nutrition.protein}g</p>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{result.nutrition.vegetables}g</p>
              <p className="text-sm text-gray-600">Vegetables</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{result.nutrition.carbs}g</p>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Clock className="w-4 h-4" />
            <span>Analyzed just now</span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => onAddFood(result)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Add to Today</span>
            </button>
            
            <button
              onClick={onDiscard}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <XCircle className="w-4 h-4" />
              <span>Discard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};