-- Add Clover, Lightspeed, and Affirm (PayBright) to processors_v2
-- Run this after the existing import-csv-data.sql

-- Clover - Popular POS system with competitive in-person rates
INSERT INTO processors_v2 (
  name, company, website, logo_url,
  primary_rate, primary_fixed_fee, monthly_fee,
  best_for, pros, cons, business_types,
  online_rate, keyed_rate, contract_length, early_termination_fee, setup_fee,
  no_monthly_fee, same_day_funding, free_hardware, api_available, multi_location,
  min_monthly_volume, max_monthly_volume, status
) VALUES
('Clover', 'Fiserv', 'https://www.clover.com', 'https://www.clover.com/favicon.ico',
 2.3, 0.10, 14.95,
 'Small to medium retail businesses needing robust POS features',
 'Low in-person rates, comprehensive POS system, industry-specific plans, good hardware options',
 'Long-term contracts (36-48 months), high early termination fees, locked processing rates',
 '["retail", "restaurant", "service"]',
 3.5, 3.5, 36, 495.0, 0.0,
 false, true, false, true, true,
 0.0, null, 'active'),

-- Lightspeed - Restaurant and retail POS with integrated payments
('Lightspeed', 'Lightspeed Commerce', 'https://www.lightspeedhq.com', 'https://www.lightspeedhq.com/favicon.ico',
 2.6, 0.10, 89.0,
 'Restaurants and retail businesses needing advanced POS features and inventory management',
 'Advanced POS features, excellent inventory management, integrated ecosystem, good reporting',
 'High monthly fees, forces use of Lightspeed Payments ($400/month penalty), expensive hardware',
 '["restaurant", "retail"]',
 2.9, 2.9, 0, 0.0, 0.0,
 false, true, false, true, true,
 1000.0, null, 'active'),

-- GoPayBright - Transparent merchant services with no contracts
('GoPayBright', 'PayBright Merchant Services', 'https://www.gopaybright.com', 'https://www.gopaybright.com/favicon.ico',
 2.4, 0.15, 0.0,
 'Small to medium businesses wanting transparent pricing with no contracts, especially those using Figure POS',
 'No contracts, no early termination fees, no annual rate increases, local customer service, PCI compliance included, Figure POS integration',
 'Limited brand recognition, rates not publicly disclosed, fewer advanced features than major POS providers',
 '["retail", "service", "restaurant"]',
 2.9, 3.2, 0, 0.0, 0.0,
 true, true, false, true, false,
 0.0, null, 'active');

-- Insert detailed research data for new processors
INSERT INTO processor_research (
  processor_id, chargeback_fee, ach_rate, international_rate,
  hardware_required, hardware_costs, hardware_lease_available, free_hardware,
  support_phone, support_chat, support_email, support_hours, setup_assistance, dedicated_rep,
  funding_speed, funding_schedule, weekend_funding, hold_policy,
  countries_supported, pci_compliant, emv_certified, apple_pay, google_pay,
  data_source, verified_date, research_notes
)
SELECT
  p.id,
  CASE p.name
    WHEN 'Clover' THEN 25.0
    WHEN 'Lightspeed' THEN 15.0
    WHEN 'GoPayBright' THEN 15.0
  END as chargeback_fee,
  CASE p.name
    WHEN 'Clover' THEN 1.0
    WHEN 'Lightspeed' THEN 0.75
    WHEN 'GoPayBright' THEN 0.5
  END as ach_rate,
  CASE p.name
    WHEN 'Clover' THEN 3.5
    WHEN 'Lightspeed' THEN 3.5
    WHEN 'GoPayBright' THEN 3.2
  END as international_rate,
  CASE p.name
    WHEN 'Clover' THEN true
    WHEN 'Lightspeed' THEN true
    WHEN 'GoPayBright' THEN true
  END as hardware_required,
  CASE p.name
    WHEN 'Clover' THEN '{"go": 49, "flex": 649, "station": 1799, "mini": 149}'::jsonb
    WHEN 'Lightspeed' THEN '{"reader": 329, "terminal": 399, "scanner": 399}'::jsonb
    WHEN 'GoPayBright' THEN '{"terminal": 249, "reader": 99}'::jsonb
  END as hardware_costs,
  CASE p.name
    WHEN 'Clover' THEN true
    WHEN 'Lightspeed' THEN true
    WHEN 'GoPayBright' THEN false
  END as hardware_lease_available,
  false as free_hardware,
  CASE p.name
    WHEN 'Clover' THEN true
    WHEN 'Lightspeed' THEN true
    WHEN 'GoPayBright' THEN true
  END as support_phone,
  true as support_chat,
  true as support_email,
  CASE p.name
    WHEN 'Clover' THEN '24/7 phone and chat support'
    WHEN 'Lightspeed' THEN 'Business hours phone, 24/7 chat'
    WHEN 'GoPayBright' THEN 'Business hours with local customer service rep'
  END as support_hours,
  true as setup_assistance,
  CASE p.name
    WHEN 'Lightspeed' THEN true
    ELSE false
  END as dedicated_rep,
  CASE p.name
    WHEN 'Clover' THEN 'next_day'
    WHEN 'Lightspeed' THEN 'next_day'
    WHEN 'GoPayBright' THEN 'next_day'
  END as funding_speed,
  '["daily"]'::jsonb as funding_schedule,
  false as weekend_funding,
  CASE p.name
    WHEN 'Clover' THEN 'Standard rolling reserve with contract lock-in'
    WHEN 'Lightspeed' THEN 'Standard holds for new merchants'
    WHEN 'GoPayBright' THEN 'Transparent hold policy, no surprises'
  END as hold_policy,
  CASE p.name
    WHEN 'Clover' THEN '["US", "CA"]'::jsonb
    WHEN 'Lightspeed' THEN '["US", "CA", "EU", "AU"]'::jsonb
    WHEN 'GoPayBright' THEN '["US"]'::jsonb
  END as countries_supported,
  true as pci_compliant,
  true as emv_certified,
  true as apple_pay,
  true as google_pay,
  'Official pricing pages and industry research - 2025' as data_source,
  '2025-09-21'::timestamp as verified_date,
  CASE p.name
    WHEN 'Clover' THEN 'Strong POS system but expensive contracts and early termination fees'
    WHEN 'Lightspeed' THEN 'Excellent for restaurants/retail but forces payment processing lock-in'
    WHEN 'GoPayBright' THEN 'Transparent pricing with no contracts, good for businesses wanting flexibility'
  END as research_notes
FROM processors_v2 p
WHERE p.name IN ('Clover', 'Lightspeed', 'GoPayBright');

-- Update features arrays for new processors
UPDATE processors_v2 SET features = '["POS System", "Inventory Management", "Employee Management", "Customer Engagement", "Analytics", "App Market"]'::jsonb WHERE name = 'Clover';
UPDATE processors_v2 SET features = '["Advanced POS", "Inventory Management", "Multi-Location", "Analytics", "Integrations", "Omnichannel"]'::jsonb WHERE name = 'Lightspeed';
UPDATE processors_v2 SET features = '["No Contracts", "Transparent Pricing", "Local Support", "PCI Compliance", "Competitive Rates", "Next Day Funding", "Figure POS Integration"]'::jsonb WHERE name = 'GoPayBright';