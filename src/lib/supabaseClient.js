import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://rbpdzupknddwshktqqez.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGR6dXBrbmRkd3Noa3RxcWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Nzk2MTQsImV4cCI6MjEwMjM1NTYxNH0.b5CFRI7-TKFkpGv2gJ6A_nHKQ_XUwIVzHQ7Et6yL3bQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);
