import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://rbpdzupknddwshktqqez.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGR6dXBrbmRkd3Noa3RxcWV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc3OTYxNCwiZXhwIjoyMTAyMzU1NjE0fQ.4EPs0zx_pudwFAK7Q4LmO7VzoE0JGAJhTUpgIg-2Fws';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseReady = () => Boolean(supabaseUrl && supabaseKey);

