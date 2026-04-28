import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('[supabase] missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in env');
}

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export const CATEGORY_LABELS = {
  info: 'お知らせ',
  recruit: '採用情報',
  press: 'プレスリリース',
};
