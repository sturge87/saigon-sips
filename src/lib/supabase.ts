import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type CoffeeShop = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  image_url?: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export type List = {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  rating: number;
  comment?: string;
  user_id: string;
  coffee_shop_id: string;
  created_at: string;
  updated_at: string;
};

export type Visited = {
  id: string;
  user_id: string;
  coffee_shop_id: string;
  visited_at: string;
}; 