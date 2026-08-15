import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://rbpdzupknddwshktqqez.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGR6dXBrbmRkd3Noa3RxcWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Nzk2MTQsImV4cCI6MjEwMjM1NTYxNH0.b5CFRI7-TKFkpGv2gJ6A_nHKQ_XUwIVzHQ7Et6yL3bQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

export const uploadFileToSupabase = async (file, folder = 'uploads') => {
  if (!file) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanName}`;
    
    // Thử tải tệp lên Supabase Storage Bucket 'school-files'
    const { data, error } = await supabase.storage
      .from('school-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (data && data.path) {
      const { data: publicUrlData } = supabase.storage
        .from('school-files')
        .getPublicUrl(data.path);
      
      if (publicUrlData && publicUrlData.publicUrl) {
        return publicUrlData.publicUrl;
      }
    }
  } catch (err) {
    console.warn('Storage bucket upload fallback:', err);
  }

  // Fallback sang FileReader mã hóa Base64 an toàn
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => resolve('#');
    reader.readAsDataURL(file);
  });
};
