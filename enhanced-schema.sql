-- Enhanced Processor Schema - UX-First Design
-- Separates user-facing data from research data

-- Main processors table (user-facing data)
CREATE TABLE IF NOT EXISTS processors_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- TIER 1: Core Display Data (always shown)
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255), -- parent company if different
  website VARCHAR(500) NOT NULL,
  logo_url VARCHAR(500),

  -- Primary rates (what users see first)
  primary_rate DECIMAL(5,3) NOT NULL, -- main advertised rate
  primary_fixed_fee DECIMAL(5,2) NOT NULL,
  monthly_fee DECIMAL(8,2) NOT NULL DEFAULT 0,

  -- User-facing content
  best_for TEXT NOT NULL,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  business_types JSONB NOT NULL DEFAULT '[]',

  -- TIER 2: Detail Data (show on expand/click)
  features JSONB NOT NULL DEFAULT '[]',

  -- Additional rates (for detailed view)
  online_rate DECIMAL(5,3), -- if different from primary
  keyed_rate DECIMAL(5,3),
  international_rate DECIMAL(5,3),

  -- Contract basics
  contract_length INTEGER, -- months
  early_termination_fee DECIMAL(8,2),
  setup_fee DECIMAL(8,2) DEFAULT 0,

  -- Key features (booleans for easy filtering)
  no_monthly_fee BOOLEAN DEFAULT false,
  same_day_funding BOOLEAN DEFAULT false,
  free_hardware BOOLEAN DEFAULT false,
  api_available BOOLEAN DEFAULT false,
  multi_location BOOLEAN DEFAULT false,

  -- Business compatibility
  min_monthly_volume DECIMAL(10,2),
  max_monthly_volume DECIMAL(10,2),

  -- Status
  status VARCHAR(50) DEFAULT 'active', -- active, discontinued, regional

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Separate research/admin table (comprehensive data)
CREATE TABLE IF NOT EXISTS processor_research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  processor_id UUID REFERENCES processors_v2(id) ON DELETE CASCADE,

  -- Detailed fee structure
  chargeback_fee DECIMAL(8,2),
  statement_fee DECIMAL(8,2),
  gateway_fee DECIMAL(8,2),
  ach_rate DECIMAL(5,3),

  -- Hardware details
  hardware_required BOOLEAN DEFAULT false,
  hardware_costs JSONB, -- {terminal: 299, reader: 49}
  hardware_lease_available BOOLEAN DEFAULT false,

  -- Support details
  support_phone BOOLEAN DEFAULT false,
  support_chat BOOLEAN DEFAULT false,
  support_email BOOLEAN DEFAULT false,
  support_hours VARCHAR(255),
  setup_assistance BOOLEAN DEFAULT false,
  dedicated_rep BOOLEAN DEFAULT false,

  -- Funding details
  funding_speed VARCHAR(50), -- same_day, next_day, 2_days
  funding_schedule JSONB, -- {daily: true, weekly: true}
  weekend_funding BOOLEAN DEFAULT false,
  hold_policy TEXT,

  -- Technical capabilities
  pos_systems JSONB DEFAULT '[]',
  integrations JSONB DEFAULT '[]',
  mobile_app BOOLEAN DEFAULT false,
  reporting_tools BOOLEAN DEFAULT false,
  inventory_management BOOLEAN DEFAULT false,

  -- Compliance & payments
  countries_supported JSONB DEFAULT '["US"]',
  states_restricted JSONB DEFAULT '[]',
  pci_compliant BOOLEAN DEFAULT true,
  emv_certified BOOLEAN DEFAULT true,
  apple_pay BOOLEAN DEFAULT false,
  google_pay BOOLEAN DEFAULT false,

  -- Research metadata
  data_source VARCHAR(255),
  verified_date TIMESTAMP WITH TIME ZONE,
  research_notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User behavior tracking (optional - for analytics)
CREATE TABLE IF NOT EXISTS user_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_type VARCHAR(100),
  monthly_volume DECIMAL(10,2),
  payment_environment VARCHAR(100),
  budget_priority VARCHAR(100),
  results_shown JSONB, -- array of processor IDs shown
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_processors_v2_business_types ON processors_v2 USING GIN (business_types);
CREATE INDEX idx_processors_v2_status ON processors_v2 (status);
CREATE INDEX idx_processors_v2_monthly_fee ON processors_v2 (monthly_fee);
CREATE INDEX idx_processors_v2_primary_rate ON processors_v2 (primary_rate);
CREATE INDEX idx_processors_v2_features ON processors_v2 USING GIN (features);

-- RLS policies
ALTER TABLE processors_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE processor_research ENABLE ROW LEVEL SECURITY;

-- Public read access to main processor data
CREATE POLICY "Allow read access to processors_v2" ON processors_v2
  FOR SELECT USING (true);

-- Admin access to research data
CREATE POLICY "Allow read access to processor_research" ON processor_research
  FOR SELECT USING (true);

-- Authenticated users can modify (for admin interface)
CREATE POLICY "Allow authenticated users to modify processors_v2" ON processors_v2
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to modify processor_research" ON processor_research
  FOR ALL USING (auth.role() = 'authenticated');

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_processors_v2_updated_at BEFORE UPDATE ON processors_v2
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_processor_research_updated_at BEFORE UPDATE ON processor_research
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();