import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserGoals } from '../App';

export const useUserGoals = (userId: string | undefined) => {
  const [goals, setGoals] = useState<UserGoals>({
    currentWeight: 70,
    targetWeight: 65,
    targetDate: '2025-02-28',
    dailyCalories: 1800,
    protein: 120,
    vegetables: 400,
    carbs: 200
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchGoals();
  }, [userId]);

  const fetchGoals = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching goals:', error);
        return;
      }

      if (data) {
        setGoals({
          currentWeight: data.current_weight,
          targetWeight: data.target_weight,
          targetDate: data.target_date,
          dailyCalories: data.daily_calories,
          protein: data.protein,
          vegetables: data.vegetables,
          carbs: data.carbs
        });
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateGoals = async (newGoals: UserGoals) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: userId,
          current_weight: newGoals.currentWeight,
          target_weight: newGoals.targetWeight,
          target_date: newGoals.targetDate,
          daily_calories: newGoals.dailyCalories,
          protein: newGoals.protein,
          vegetables: newGoals.vegetables,
          carbs: newGoals.carbs,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating goals:', error);
        return;
      }

      setGoals(newGoals);
    } catch (error) {
      console.error('Error updating goals:', error);
    }
  };

  return {
    goals,
    loading,
    updateGoals
  };
};