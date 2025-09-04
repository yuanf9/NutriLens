import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FoodItem, NutritionData } from '../App';

export const useFoodLogs = (userId: string | undefined) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchTodaysFoods();
  }, [userId]);

  const fetchTodaysFoods = async () => {
    if (!userId) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('logged_at', `${today}T00:00:00.000Z`)
        .lt('logged_at', `${today}T23:59:59.999Z`)
        .order('logged_at', { ascending: false });

      if (error) {
        console.error('Error fetching food logs:', error);
        return;
      }

      const foodItems: FoodItem[] = data.map(log => ({
        id: log.id,
        name: log.name,
        image: log.image_url,
        nutrition: {
          calories: log.calories,
          protein: log.protein,
          vegetables: log.vegetables,
          carbs: log.carbs,
          fiber: log.fiber,
          sugar: log.sugar
        },
        timestamp: new Date(log.logged_at)
      }));

      setFoods(foodItems);
    } catch (error) {
      console.error('Error fetching food logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (food: Omit<FoodItem, 'id'>) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('food_logs')
        .insert({
          user_id: userId,
          name: food.name,
          image_url: food.image,
          calories: food.nutrition.calories,
          protein: food.nutrition.protein,
          vegetables: food.nutrition.vegetables,
          carbs: food.nutrition.carbs,
          fiber: food.nutrition.fiber,
          sugar: food.nutrition.sugar,
          logged_at: food.timestamp.toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding food log:', error);
        return;
      }

      const newFoodItem: FoodItem = {
        id: data.id,
        name: data.name,
        image: data.image_url,
        nutrition: {
          calories: data.calories,
          protein: data.protein,
          vegetables: data.vegetables,
          carbs: data.carbs,
          fiber: data.fiber,
          sugar: data.sugar
        },
        timestamp: new Date(data.logged_at)
      };

      setFoods(prev => [newFoodItem, ...prev]);
    } catch (error) {
      console.error('Error adding food log:', error);
    }
  };

  const deleteFood = async (foodId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('food_logs')
        .delete()
        .eq('id', foodId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting food log:', error);
        return;
      }

      setFoods(prev => prev.filter(food => food.id !== foodId));
    } catch (error) {
      console.error('Error deleting food log:', error);
    }
  };

  const totalNutrition = foods.reduce((total, food) => ({
    calories: total.calories + food.nutrition.calories,
    protein: total.protein + food.nutrition.protein,
    vegetables: total.vegetables + food.nutrition.vegetables,
    carbs: total.carbs + food.nutrition.carbs,
    fiber: total.fiber + food.nutrition.fiber,
    sugar: total.sugar + food.nutrition.sugar
  }), { calories: 0, protein: 0, vegetables: 0, carbs: 0, fiber: 0, sugar: 0 });

  return {
    foods,
    loading,
    totalNutrition,
    addFood,
    deleteFood,
    refreshFoods: fetchTodaysFoods
  };
};