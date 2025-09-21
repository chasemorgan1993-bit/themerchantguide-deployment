import { createClient } from '@supabase/supabase-js';

// Reliable configuration to avoid Turbopack env variable issues
const SUPABASE_URL = 'https://iqrijidhhaspkbpatzuo.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcmlqaWRoaGFzcGticGF0enVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MjY1MDMsImV4cCI6MjA3NDAwMjUwM30.OcMbsVWVbH63F-OtwUP47668ip7VcICXO_6G7Jtm_wo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Types for our enhanced database
export interface ProcessorV2 {
  id: string;
  name: string;
  company?: string;
  website: string;
  logo_url?: string;
  primary_rate: number;
  primary_fixed_fee: number;
  monthly_fee: number;
  best_for: string;
  pros: string;
  cons: string;
  business_types: string[];
  features: string[];
  online_rate?: number;
  keyed_rate?: number;
  international_rate?: number;
  contract_length?: number;
  early_termination_fee?: number;
  setup_fee?: number;
  no_monthly_fee: boolean;
  same_day_funding: boolean;
  free_hardware: boolean;
  api_available: boolean;
  multi_location: boolean;
  min_monthly_volume?: number;
  max_monthly_volume?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProcessorWithCost extends ProcessorV2 {
  totalCost: number;
  effectiveRate: number;
  priorityScore: number;
}

// Legacy interface for backward compatibility
export interface Processor {
  id: string;
  name: string;
  rate: number;
  fixed_fee: number;
  monthly_fee: number;
  features: string[];
  best_for: string;
  pros: string;
  cons: string;
  website: string;
  business_types: string[];
  created_at: string;
  updated_at: string;
}
