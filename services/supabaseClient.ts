import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase
const SUPABASE_URL = 'https://apflqpvknkzjsygjbodc.supabase.co';

// CRITICAL: The Anon Key must start with "ey..." (It is a JWT token).
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZmxxcHZrbmt6anN5Z2pib2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTYzNzgsImV4cCI6MjA4MjA3MjM3OH0.WD1M3D5F10Grug2P1sc9Jfi4X7Wlhg1Ykptl8ZJqocM'; 

// Export the initialized client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Flag to indicate the app is in Live/Cloud mode
export const isSupabaseLive = true;