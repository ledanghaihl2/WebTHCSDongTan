import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://forlinccjrammjpacpxg.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcmxpbmNjanJhbW1qcGFjcHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzAzNzA0MSwiZXhwIjoyMTAyNjEzMDQxfQ.0s3GBx0_39WMj1VvgmukgwqJBjbfG_FRikowqxCOTsI';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseReady = () => Boolean(supabaseUrl && supabaseKey);

