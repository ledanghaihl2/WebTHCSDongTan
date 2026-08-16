import { createClient } from '@supabase/supabase-js';

// Official Supabase Credentials for THCS Đồng Tân Portal
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rbpdzupknddwshktqqez.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGR6dXBrbmRkd3Noa3RxcWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMzU5MzUsImV4cCI6MjEwMTgxMTkzNX0.UZH5igaDmzyt--vioCvlAbBxW79p7TbDTsKwLOIDpDI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

