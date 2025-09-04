export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_goals: {
        Row: {
          id: string;
          user_id: string;
          current_weight: number;
          target_weight: number;
          target_date: string;
          daily_calories: number;
          protein: number;
          vegetables: number;
          carbs: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_weight: number;
          target_weight: number;
          target_date: string;
          daily_calories: number;
          protein: number;
          vegetables: number;
          carbs: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_weight?: number;
          target_weight?: number;
          target_date?: string;
          daily_calories?: number;
          protein?: number;
          vegetables?: number;
          carbs?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      food_logs: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          image_url: string;
          calories: number;
          protein: number;
          vegetables: number;
          carbs: number;
          fiber: number;
          sugar: number;
          logged_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          image_url: string;
          calories: number;
          protein: number;
          vegetables: number;
          carbs: number;
          fiber: number;
          sugar: number;
          logged_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          image_url?: string;
          calories?: number;
          protein?: number;
          vegetables?: number;
          carbs?: number;
          fiber?: number;
          sugar?: number;
          logged_at?: string;
          created_at?: string;
        };
      };
    };
  };
}