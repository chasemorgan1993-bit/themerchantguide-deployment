-- Import your CSV data into the enhanced schema
-- This maps your research to the UX-optimized structure

-- First, create the new tables (run enhanced-schema.sql first if you haven't)

-- Import data from your CSV into processors_v2 (user-facing)
INSERT INTO processors_v2 (
  name, company, website, logo_url,
  primary_rate, primary_fixed_fee, monthly_fee,
  best_for, pros, cons, business_types,
  online_rate, keyed_rate, contract_length, early_termination_fee, setup_fee,
  no_monthly_fee, same_day_funding, free_hardware, api_available, multi_location,
  min_monthly_volume, max_monthly_volume, status
) VALUES

-- Stripe
('Stripe', 'Stripe, Inc.', 'https://stripe.com', 'https://stripe.com/img/v3/home/twitter.png',
 2.7, 0.30, 0.0,
 'Online businesses, SaaS companies, developer-focused startups',
 'Developer-friendly, global reach, extensive APIs, no monthly fees',
 'No phone support, limited hardware options, high international fees',
 '["online", "retail", "service", "restaurant"]',
 2.9, 3.4, 0, 0.0, 0.0,
 true, false, false, true, true,
 0.0, null, 'active'),

-- Square
('Square', 'Block, Inc.', 'https://squareup.com', 'https://squareup.com/us/en/press/images/logos/square-logo-download',
 2.6, 0.15, 0.0,
 'Small retail businesses, restaurants, service providers',
 'Free hardware, no monthly fees, comprehensive POS, free chargeback protection',
 'Limited customization, account holds can occur, limited international support',
 '["retail", "restaurant", "service", "online"]',
 2.9, 3.5, 0, 0.0, 0.0,
 true, true, true, true, true,
 0.0, null, 'active'),

-- PayPal
('PayPal', 'PayPal Holdings, Inc.', 'https://paypal.com', 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg',
 2.29, 0.49, 0.0,
 'E-commerce businesses, international sales, established brands',
 'Universal acceptance, buyer protection, global reach, no monthly fees',
 'High international fees, account holds, limited customization',
 '["online", "service", "retail"]',
 2.99, 3.49, 0, 0.0, 0.0,
 true, true, false, true, true,
 0.0, null, 'active'),

-- Helcim
('Helcim', 'Helcim Inc.', 'https://helcim.com', 'https://helcim.com/images/helcim-logo.svg',
 1.93, 0.08, 0.0,
 'Growing businesses wanting transparent pricing and volume discounts',
 'Transparent interchange-plus pricing, volume discounts, no hidden fees',
 'Limited to North America, smaller brand recognition',
 '["retail", "service", "online", "restaurant"]',
 2.49, 2.49, 0, 0.0, 0.0,
 true, true, false, true, true,
 0.0, null, 'active'),

-- Toast
('Toast', 'Toast, Inc.', 'https://pos.toasttab.com', 'https://pos.toasttab.com/images/toast-logo.png',
 2.49, 0.15, 69.0,
 'Full-service restaurants, multi-location restaurant chains',
 'Comprehensive restaurant features, excellent support, integrated ecosystem',
 'Restaurant-only focus, high hardware costs, processing lock-in, recent rate increases',
 '["restaurant"]',
 2.69, 3.5, 24, 495.0, 0.0,
 false, true, false, true, true,
 3000.0, null, 'active'),

-- Stax
('Stax', 'Stax Payments', 'https://staxpayments.com', 'https://staxpayments.com/images/stax-logo.svg',
 0.08, 0.08, 99.0,
 'High-volume businesses ($5K+ monthly) wanting minimal per-transaction fees',
 'Interchange-plus-zero pricing, no long-term contracts, dedicated support',
 'High monthly fees, not cost-effective for low volume, limited integrations',
 '["retail", "service", "online", "restaurant"]',
 0.15, 0.15, 0, 0.0, 0.0,
 false, true, false, true, true,
 5000.0, null, 'active');

-- Now insert detailed research data into processor_research table
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
    WHEN 'Stripe' THEN 15.0
    WHEN 'Square' THEN 0.0
    WHEN 'PayPal' THEN 20.0
    WHEN 'Helcim' THEN 15.0
    WHEN 'Toast' THEN 15.0
    WHEN 'Stax' THEN 15.0
  END as chargeback_fee,
  CASE p.name
    WHEN 'Stripe' THEN 0.8
    WHEN 'Square' THEN 1.0
    WHEN 'PayPal' THEN 1.0
    WHEN 'Helcim' THEN 0.05
    WHEN 'Toast' THEN 1.0
    WHEN 'Stax' THEN 0.5
  END as ach_rate,
  CASE p.name
    WHEN 'Stripe' THEN 3.9
    WHEN 'Square' THEN 2.6
    WHEN 'PayPal' THEN 4.99
    WHEN 'Helcim' THEN 1.93
    WHEN 'Toast' THEN 2.49
    WHEN 'Stax' THEN 0.08
  END as international_rate,
  CASE p.name
    WHEN 'Toast' THEN true
    ELSE false
  END as hardware_required,
  CASE p.name
    WHEN 'Stripe' THEN '{"terminal": 249, "reader": 59}'::jsonb
    WHEN 'Square' THEN '{"terminal": 299, "reader": 49, "stand": 169}'::jsonb
    WHEN 'PayPal' THEN '{"chip_reader": 59, "card_reader": 29}'::jsonb
    WHEN 'Helcim' THEN '{"terminal": 249}'::jsonb
    WHEN 'Toast' THEN '{"terminal": 799, "handheld": 449, "kds": 549}'::jsonb
    WHEN 'Stax' THEN '{"terminal": 299}'::jsonb
  END as hardware_costs,
  CASE p.name
    WHEN 'Square' THEN true
    WHEN 'Toast' THEN true
    WHEN 'Stax' THEN true
    ELSE false
  END as hardware_lease_available,
  CASE p.name
    WHEN 'Square' THEN true
    ELSE false
  END as free_hardware,
  CASE p.name
    WHEN 'PayPal' THEN true
    WHEN 'Toast' THEN true
    ELSE false
  END as support_phone,
  true as support_chat, -- All have chat
  true as support_email, -- All have email
  CASE p.name
    WHEN 'Stripe' THEN '24/7 chat and email'
    WHEN 'Square' THEN '24/7 phone and chat support'
    WHEN 'PayPal' THEN '24/7 phone support'
    WHEN 'Toast' THEN '24/7 phone and chat support'
    ELSE 'Business hours phone support'
  END as support_hours,
  true as setup_assistance,
  CASE p.name
    WHEN 'Helcim' THEN true
    WHEN 'Toast' THEN true
    WHEN 'Stax' THEN true
    ELSE false
  END as dedicated_rep,
  CASE p.name
    WHEN 'Stripe' THEN '2_days'
    ELSE 'next_day'
  END as funding_speed,
  '["daily"]'::jsonb as funding_schedule,
  false as weekend_funding,
  CASE p.name
    WHEN 'Stripe' THEN 'Standard 7-day rolling reserve for new accounts'
    WHEN 'Square' THEN 'Standard rolling reserve policy'
    WHEN 'PayPal' THEN '21-day hold for new merchants'
    WHEN 'Helcim' THEN 'Minimal holds for established businesses'
    WHEN 'Toast' THEN 'Standard restaurant industry holds'
    WHEN 'Stax' THEN 'Minimal holds for approved businesses'
  END as hold_policy,
  CASE p.name
    WHEN 'Stripe' THEN '["US", "CA", "GB", "AU", "EU", "40+ countries"]'::jsonb
    WHEN 'Square' THEN '["US", "CA", "AU", "JP", "GB"]'::jsonb
    WHEN 'PayPal' THEN '["200+ countries"]'::jsonb
    WHEN 'Helcim' THEN '["US", "CA"]'::jsonb
    WHEN 'Toast' THEN '["US", "CA", "IE"]'::jsonb
    WHEN 'Stax' THEN '["US"]'::jsonb
  END as countries_supported,
  true as pci_compliant,
  true as emv_certified,
  true as apple_pay,
  true as google_pay,
  'Official pricing pages and industry research' as data_source,
  '2025-09-21'::timestamp as verified_date,
  CASE p.name
    WHEN 'Stripe' THEN 'Market leader for online payments with excellent documentation'
    WHEN 'Square' THEN 'Excellent all-in-one solution for brick-and-mortar businesses'
    WHEN 'PayPal' THEN 'Most recognized payment brand globally with extensive buyer protection'
    WHEN 'Helcim' THEN 'Excellent for businesses that want to see exact interchange costs'
    WHEN 'Toast' THEN 'Industry leader for restaurant POS with comprehensive restaurant management features'
    WHEN 'Stax' THEN 'Subscription model works best for businesses with consistent high volume'
  END as research_notes
FROM processors_v2 p;

-- Update features arrays with proper JSON
UPDATE processors_v2 SET features = '["API", "Subscriptions", "Marketplace", "Connect", "Fraud Protection", "Invoicing"]'::jsonb WHERE name = 'Stripe';
UPDATE processors_v2 SET features = '["POS", "Inventory", "Employee Management", "Analytics", "Marketing"]'::jsonb WHERE name = 'Square';
UPDATE processors_v2 SET features = '["Checkout", "Invoicing", "Subscriptions", "Buyer Protection"]'::jsonb WHERE name = 'PayPal';
UPDATE processors_v2 SET features = '["Interchange Plus", "Volume Discounts", "Fraud Protection"]'::jsonb WHERE name = 'Helcim';
UPDATE processors_v2 SET features = '["Restaurant POS", "Online Ordering", "Delivery", "Loyalty", "Payroll"]'::jsonb WHERE name = 'Toast';
UPDATE processors_v2 SET features = '["Interchange Plus Zero", "Subscription Model", "Custom Branding"]'::jsonb WHERE name = 'Stax';

-- Clean up old processors table data (optional - run after testing)
-- DELETE FROM processors WHERE name IN ('Square', 'Clover', 'Stripe', 'Toast');