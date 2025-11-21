-- ============================================================================
-- Add Featured Processors - Created 2025-11-21
-- ============================================================================
-- Adds 5 main processors: Dejavoo, Figure POS, PayBrite, NMI, and EFC
-- Keeps existing processors (Square, Stripe, etc.) for credibility
-- Marks EFC as "coming_soon" to buy time for rates
-- ============================================================================


-- ============================================================================
-- STEP 1: Add "featured" column (OPTIONAL)
-- ============================================================================
-- This allows you to highlight your main 5 processors on the website
-- Run this ONLY if you want to mark certain processors as featured

-- For basic schema:
-- ALTER TABLE processors ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
-- ALTER TABLE processors ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';

-- For enhanced schema:
-- ALTER TABLE processors_v2 ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Mark your 5 main processors as featured (run AFTER adding them below):
-- UPDATE processors SET featured = true WHERE name IN ('Dejavoo Terminal', 'Figure POS System', 'PayBrite Dual Pricing', 'NMI Gateway', 'EFC Martial Arts Billing');


-- ============================================================================
-- STEP 2: Check which schema you have
-- ============================================================================
-- Run this in Supabase SQL Editor to see which table you have:
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public' AND table_name LIKE 'processor%';

-- Then use the correct INSERT statements below:


-- ============================================================================
-- OPTION A: For BASIC SCHEMA (processors table)
-- ============================================================================

-- First, add the status column if it doesn't exist:
ALTER TABLE processors ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
ALTER TABLE processors ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add the 5 featured processors:
INSERT INTO processors (
  name,
  rate,
  fixed_fee,
  monthly_fee,
  features,
  best_for,
  pros,
  cons,
  website,
  business_types,
  status,
  featured
) VALUES
  -- 1. Dejavoo Terminal
  (
    'Dejavoo Terminal',
    2.5,
    0.10,
    15.00,
    '["Reliable hardware", "Easy setup", "EMV certified", "NFC/contactless payments", "Cloud-based reporting"]',
    'Retail stores and face-to-face transactions',
    'Reliable hardware, easy setup, perfect for traditional retail, proven technology',
    'Monthly fee required, primarily for in-person transactions',
    'https://www.dejavoo.io',
    '["retail", "service"]',
    'active',
    true
  ),

  -- 2. Figure POS System
  (
    'Figure POS System',
    2.4,
    0.10,
    49.00,
    '["All-in-one POS", "Inventory management", "Employee scheduling", "Sales reporting", "Customer CRM", "Multi-location support"]',
    'Growing businesses needing comprehensive management',
    'Complete business management suite, scales with growth, excellent inventory tracking, great for multi-location',
    'Higher monthly fee, may be complex for very small businesses',
    'https://www.figurepos.com',
    '["retail", "multi_location", "service"]',
    'active',
    true
  ),

  -- 3. PayBrite Dual Pricing
  (
    'PayBrite Dual Pricing',
    0.0,
    0.0,
    25.00,
    '["Dual pricing program", "Cash discount compliance", "Offset processing fees", "Compliant pricing display", "Customer choice pricing"]',
    'Service businesses and hospitality wanting to offset fees',
    'Helps offset processing costs, compliant dual pricing program, great for service and hospitality businesses',
    'Requires customer education about pricing, monthly fee applies, works best for higher-volume merchants',
    'https://www.paybrite.com',
    '["service", "restaurant", "hospitality"]',
    'active',
    true
  ),

  -- 4. NMI Gateway
  (
    'NMI Gateway',
    2.9,
    0.30,
    25.00,
    '["Payment gateway", "Virtual terminal", "Recurring billing", "Mobile payments", "API integration", "Multi-processor support"]',
    'E-commerce and online businesses',
    'Excellent for online payments, flexible integrations, supports multiple processors, robust API',
    'Gateway fee is additional to processor fees, requires technical setup',
    'https://www.nmi.com',
    '["online"]',
    'active',
    true
  ),

  -- 5. EFC Martial Arts Billing (COMING SOON)
  (
    'EFC Martial Arts Billing',
    0.0,
    0.0,
    0.0,
    '["Specialized for martial arts", "Membership management", "Recurring billing", "Student tracking"]',
    'Martial arts schools and fitness studios',
    'Purpose-built for martial arts and fitness businesses, comprehensive student management',
    'Coming soon - contact for early access pricing',
    'https://www.efcmartialartsbilling.com',
    '["service", "fitness"]',
    'coming_soon',
    true
  );


-- ============================================================================
-- OPTION B: For ENHANCED SCHEMA (processors_v2 table)
-- ============================================================================

-- First, add the featured column if it doesn't exist:
-- ALTER TABLE processors_v2 ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add the 5 featured processors:
INSERT INTO processors_v2 (
  name,
  website,
  primary_rate,
  primary_fixed_fee,
  monthly_fee,
  best_for,
  pros,
  cons,
  business_types,
  features,
  no_monthly_fee,
  free_hardware,
  api_available,
  status,
  featured
) VALUES
  -- 1. Dejavoo Terminal
  (
    'Dejavoo Terminal',
    'https://www.dejavoo.io',
    2.5,
    0.10,
    15.00,
    'Retail stores and face-to-face transactions',
    'Reliable hardware, easy setup, perfect for traditional retail, proven technology',
    'Monthly fee required, primarily for in-person transactions',
    '["retail", "service"]',
    '["Reliable hardware", "Easy setup", "EMV certified", "NFC/contactless payments", "Cloud-based reporting"]',
    false,
    false,
    false,
    'active',
    true
  ),

  -- 2. Figure POS System
  (
    'Figure POS System',
    'https://www.figurepos.com',
    2.4,
    0.10,
    49.00,
    'Growing businesses needing comprehensive management',
    'Complete business management suite, scales with growth, excellent inventory tracking, great for multi-location',
    'Higher monthly fee, may be complex for very small businesses',
    '["retail", "multi_location", "service"]',
    '["All-in-one POS", "Inventory management", "Employee scheduling", "Sales reporting", "Customer CRM", "Multi-location support"]',
    false,
    false,
    true,
    'active',
    true
  ),

  -- 3. PayBrite Dual Pricing
  (
    'PayBrite Dual Pricing',
    'https://www.paybrite.com',
    0.0,
    0.0,
    25.00,
    'Service businesses and hospitality wanting to offset fees',
    'Helps offset processing costs, compliant dual pricing program, great for service and hospitality businesses',
    'Requires customer education about pricing, monthly fee applies, works best for higher-volume merchants',
    '["service", "restaurant", "hospitality"]',
    '["Dual pricing program", "Cash discount compliance", "Offset processing fees", "Compliant pricing display", "Customer choice pricing"]',
    false,
    false,
    false,
    'active',
    true
  ),

  -- 4. NMI Gateway
  (
    'NMI Gateway',
    'https://www.nmi.com',
    2.9,
    0.30,
    25.00,
    'E-commerce and online businesses',
    'Excellent for online payments, flexible integrations, supports multiple processors, robust API',
    'Gateway fee is additional to processor fees, requires technical setup',
    '["online"]',
    '["Payment gateway", "Virtual terminal", "Recurring billing", "Mobile payments", "API integration", "Multi-processor support"]',
    false,
    false,
    true,
    'active',
    true
  ),

  -- 5. EFC Martial Arts Billing (COMING SOON)
  (
    'EFC Martial Arts Billing',
    'https://www.efcmartialartsbilling.com',
    0.0,
    0.0,
    0.0,
    'Martial arts schools and fitness studios',
    'Purpose-built for martial arts and fitness businesses, comprehensive student management',
    'Coming soon - contact for early access pricing',
    '["service", "fitness"]',
    '["Specialized for martial arts", "Membership management", "Recurring billing", "Student tracking"]',
    false,
    false,
    true,
    'coming_soon',
    true
  );


-- ============================================================================
-- STEP 3: Verify the data was added
-- ============================================================================

-- Check the new processors were added (basic schema):
-- SELECT name, status, featured, rate, monthly_fee
-- FROM processors
-- WHERE featured = true
-- ORDER BY status, name;

-- Check the new processors were added (enhanced schema):
-- SELECT name, status, featured, primary_rate, monthly_fee
-- FROM processors_v2
-- WHERE featured = true
-- ORDER BY status, name;


-- ============================================================================
-- STEP 4: Update EFC when rates are ready
-- ============================================================================

-- When you have EFC's actual rates, update with this template:

-- For basic schema:
-- UPDATE processors
-- SET
--   rate = 2.5,
--   fixed_fee = 0.15,
--   monthly_fee = 39.00,
--   features = '["Actual features here"]',
--   pros = 'Updated pros',
--   cons = 'Updated cons',
--   status = 'active'
-- WHERE name = 'EFC Martial Arts Billing';

-- For enhanced schema:
-- UPDATE processors_v2
-- SET
--   primary_rate = 2.5,
--   primary_fixed_fee = 0.15,
--   monthly_fee = 39.00,
--   features = '["Actual features here"]',
--   pros = 'Updated pros',
--   cons = 'Updated cons',
--   status = 'active'
-- WHERE name = 'EFC Martial Arts Billing';


-- ============================================================================
-- NOTES
-- ============================================================================

-- Featured Processors Strategy:
-- - Keeps existing processors (Square, Stripe, etc.) for industry credibility
-- - Adds your 5 main processors marked as "featured"
-- - EFC marked as "coming_soon" - buys time for actual rates
-- - Website can display featured processors prominently
-- - Can filter by status to hide/show coming soon items

-- Rate Estimates (for the 4 active processors):
-- - Dejavoo: Typical terminal provider rates
-- - Figure POS: Mid-range POS system pricing
-- - PayBrite: 0% rate (fees offset to customer via dual pricing)
-- - NMI: Standard gateway rates (note: gateway + processor fees)

-- EFC Placeholder:
-- - All rates set to 0.00
-- - Status: 'coming_soon'
-- - Cons mention "contact for early access pricing"
-- - Update with real data when available

-- Display Strategy for Website:
-- - Show featured processors first/prominently
-- - Add "Featured" or "Recommended" badge
-- - For coming_soon status: Show "Coming Soon" badge
-- - Can filter: active vs coming_soon
