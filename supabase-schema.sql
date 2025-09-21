-- Create processors table
CREATE TABLE IF NOT EXISTS processors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rate DECIMAL(5,3) NOT NULL,
  fixed_fee DECIMAL(5,2) NOT NULL,
  monthly_fee DECIMAL(8,2) NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]',
  best_for TEXT NOT NULL,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  website VARCHAR(500) NOT NULL,
  business_types JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE processors ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated and anonymous users
CREATE POLICY "Allow read access to processors" ON processors
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete (for admin interface)
CREATE POLICY "Allow authenticated users to modify processors" ON processors
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_processors_business_types ON processors USING GIN (business_types);
CREATE INDEX idx_processors_rate ON processors (rate);
CREATE INDEX idx_processors_monthly_fee ON processors (monthly_fee);

-- Insert initial processor data
INSERT INTO processors (name, rate, fixed_fee, monthly_fee, features, best_for, pros, cons, website, business_types) VALUES
  (
    'Square',
    2.6,
    0.10,
    0,
    '["Free POS hardware", "Inventory management", "Quick setup", "Same-day deposits"]',
    'Small to medium retail stores',
    'No monthly fees, excellent POS system, easy setup',
    'Higher rates for online transactions',
    'https://squareup.com',
    '["retail", "service"]'
  ),
  (
    'Clover',
    2.3,
    0.10,
    14.95,
    '["Advanced POS", "Employee management", "Loyalty programs", "Advanced reporting"]',
    'Growing retail businesses',
    'Powerful POS features, good for scaling',
    'Monthly fee, more complex setup',
    'https://www.clover.com',
    '["retail", "multi_location"]'
  ),
  (
    'Stripe',
    2.9,
    0.30,
    0,
    '["Developer-friendly API", "Global payments", "Fraud protection", "Subscription billing"]',
    'E-commerce and tech-savvy businesses',
    'Excellent developer tools, global reach',
    'Requires technical knowledge for setup',
    'https://stripe.com',
    '["online"]'
  ),
  (
    'Toast',
    2.49,
    0.15,
    75,
    '["Restaurant-specific POS", "Kitchen display", "Table management", "Staff scheduling"]',
    'Full-service restaurants',
    'Built for restaurants, comprehensive features',
    'Higher monthly cost, complex for simple needs',
    'https://pos.toasttab.com',
    '["restaurant"]'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_processors_updated_at BEFORE UPDATE ON processors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();