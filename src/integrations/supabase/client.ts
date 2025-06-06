
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jbkhojrdrdfjjengpoeg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impia2hvanJkcmRmamplbmdwb2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTUwOTcsImV4cCI6MjA2MjI5MTA5N30.SZZjwYulo3FfaKfXe5dyJHN4b8XA17P0I36QAI4EoNA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
