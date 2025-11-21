# SQL Quick Reference for TheMerchantGuide Database

This guide provides copy-paste ready SQL queries for common database operations.

## How to Run These Queries

1. Go to https://supabase.com and log in
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Copy and paste the query
5. Click "Run" or press Cmd+Enter

---

## View All Processors

```sql
SELECT * FROM processors ORDER BY name;
```

## View Processors with Key Info Only

```sql
SELECT
  name,
  rate,
  fixed_fee,
  monthly_fee,
  website,
  business_types
FROM processors
ORDER BY rate;
```

---

## Add a New Processor

### Basic Template
```sql
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
  business_types
)
VALUES (
  'Processor Name',           -- Name
  2.75,                        -- Rate (e.g., 2.75 = 2.75%)
  0.30,                        -- Fixed fee per transaction
  0,                           -- Monthly fee (0 if none)
  '["Feature 1", "Feature 2", "Feature 3"]',  -- Features as JSON array
  'Small businesses doing mostly in-person sales',  -- Best for
  'Easy setup, no monthly fees, good customer support',  -- Pros
  'Higher per-transaction costs, limited reporting',  -- Cons
  'https://processor.com',    -- Website
  '["retail", "service"]'     -- Business types as JSON array
);
```

### Example: Adding PayPal
```sql
INSERT INTO processors (
  name, rate, fixed_fee, monthly_fee, features,
  best_for, pros, cons, website, business_types
)
VALUES (
  'PayPal',
  2.99,
  0.49,
  0,
  '["Buyer protection", "Global reach", "Easy integration", "Mobile app"]',
  'Online businesses and freelancers',
  'Widely recognized, easy to use, no monthly fees',
  'Higher fees, account holds, customer service issues',
  'https://paypal.com',
  '["online", "service"]'
);
```

### Business Type Options
Use these values in the `business_types` array:
- `"retail"` - Physical stores
- `"online"` - E-commerce
- `"service"` - Service businesses
- `"restaurant"` - Restaurants/cafes
- `"multi_location"` - Multiple locations

---

## Update an Existing Processor

### Update Rates
```sql
UPDATE processors
SET rate = 2.5,
    fixed_fee = 0.10,
    updated_at = NOW()
WHERE name = 'Square';
```

### Update Features
```sql
UPDATE processors
SET features = '["New Feature 1", "New Feature 2", "New Feature 3"]',
    updated_at = NOW()
WHERE name = 'Square';
```

### Update Multiple Fields
```sql
UPDATE processors
SET
  rate = 2.6,
  fixed_fee = 0.10,
  monthly_fee = 0,
  pros = 'Updated pros text',
  cons = 'Updated cons text',
  updated_at = NOW()
WHERE name = 'Square';
```

### Update by ID (if you know the UUID)
```sql
UPDATE processors
SET rate = 2.4
WHERE id = 'uuid-here';
```

---

## Delete a Processor

### Delete by Name
```sql
DELETE FROM processors WHERE name = 'ProcessorName';
```

### Delete by ID
```sql
DELETE FROM processors WHERE id = 'uuid-here';
```

### Delete Multiple
```sql
DELETE FROM processors
WHERE name IN ('Processor1', 'Processor2', 'Processor3');
```

---

## Search and Filter

### Find Processors with No Monthly Fee
```sql
SELECT name, rate, fixed_fee, website
FROM processors
WHERE monthly_fee = 0
ORDER BY rate;
```

### Find Processors by Business Type
```sql
SELECT name, rate, website
FROM processors
WHERE business_types @> '["retail"]'  -- Contains "retail"
ORDER BY rate;
```

### Find Cheapest Processors (by rate)
```sql
SELECT name, rate, fixed_fee, monthly_fee
FROM processors
ORDER BY rate ASC
LIMIT 5;
```

### Find Processors with Specific Feature
```sql
SELECT name, features
FROM processors
WHERE features::text LIKE '%API%'  -- Contains "API" in features
ORDER BY name;
```

---

## Bulk Operations

### Add Multiple Processors at Once
```sql
INSERT INTO processors (name, rate, fixed_fee, monthly_fee, features, best_for, pros, cons, website, business_types)
VALUES
  ('Processor1', 2.5, 0.10, 0, '["Feature1"]', 'Best for...', 'Pros...', 'Cons...', 'https://site.com', '["retail"]'),
  ('Processor2', 2.6, 0.15, 10, '["Feature1"]', 'Best for...', 'Pros...', 'Cons...', 'https://site.com', '["online"]'),
  ('Processor3', 2.7, 0.20, 0, '["Feature1"]', 'Best for...', 'Pros...', 'Cons...', 'https://site.com', '["service"]');
```

### Update All Processors (increase rates by 0.1%)
```sql
UPDATE processors
SET rate = rate + 0.1,
    updated_at = NOW();
```

---

## Analytics & Reporting

### Count Total Processors
```sql
SELECT COUNT(*) as total_processors FROM processors;
```

### Average Rate
```sql
SELECT ROUND(AVG(rate), 2) as average_rate FROM processors;
```

### Processors by Business Type (count)
```sql
SELECT
  jsonb_array_elements_text(business_types) as business_type,
  COUNT(*) as processor_count
FROM processors
GROUP BY business_type
ORDER BY processor_count DESC;
```

### Most Recently Added
```sql
SELECT name, created_at, website
FROM processors
ORDER BY created_at DESC
LIMIT 10;
```

### Recently Updated
```sql
SELECT name, updated_at
FROM processors
ORDER BY updated_at DESC
LIMIT 10;
```

---

## Backup & Export

### Export All Data (for backup)
```sql
-- Run this and save the results
SELECT * FROM processors;
-- Copy results to a spreadsheet or save as CSV
```

### Get Insert Statements for All Records
```sql
SELECT
  'INSERT INTO processors (name, rate, fixed_fee, monthly_fee, features, best_for, pros, cons, website, business_types) VALUES (' ||
  quote_literal(name) || ', ' ||
  rate || ', ' ||
  fixed_fee || ', ' ||
  monthly_fee || ', ' ||
  quote_literal(features::text) || '::jsonb, ' ||
  quote_literal(best_for) || ', ' ||
  quote_literal(pros) || ', ' ||
  quote_literal(cons) || ', ' ||
  quote_literal(website) || ', ' ||
  quote_literal(business_types::text) || '::jsonb);'
FROM processors;
```

---

## Troubleshooting

### Check if Table Exists
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'processors';
```

### View Table Structure
```sql
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'processors'
ORDER BY ordinal_position;
```

### Find Duplicate Processor Names
```sql
SELECT name, COUNT(*)
FROM processors
GROUP BY name
HAVING COUNT(*) > 1;
```

### Fix Invalid JSON (if features column has issues)
```sql
-- Check for invalid JSON
SELECT name, features
FROM processors
WHERE NOT (features::text)::jsonb IS NOT NULL;
```

---

## Advanced: Using Enhanced Schema (processors_v2)

If you've implemented the enhanced schema, use these queries:

### Add Processor to Enhanced Schema
```sql
INSERT INTO processors_v2 (
  name, website, primary_rate, primary_fixed_fee, monthly_fee,
  best_for, pros, cons, business_types, features,
  no_monthly_fee, same_day_funding, free_hardware
)
VALUES (
  'ProcessorName',
  'https://site.com',
  2.75,
  0.30,
  0,
  'Best for description',
  'Pros',
  'Cons',
  '["retail"]'::jsonb,
  '["Feature 1", "Feature 2"]'::jsonb,
  true,  -- no_monthly_fee
  false, -- same_day_funding
  true   -- free_hardware
);
```

### Find Processors with Same-Day Funding
```sql
SELECT name, primary_rate, website
FROM processors_v2
WHERE same_day_funding = true
ORDER BY primary_rate;
```

### Find Processors with No Monthly Fee
```sql
SELECT name, primary_rate, primary_fixed_fee
FROM processors_v2
WHERE no_monthly_fee = true
ORDER BY primary_rate;
```

---

## Safety Tips

1. **Always backup before bulk operations**
   - Export data before DELETE or UPDATE operations

2. **Test with SELECT first**
   - Before UPDATE or DELETE, run a SELECT with the same WHERE clause

3. **Use transactions for multiple operations**
```sql
BEGIN;
-- Your queries here
-- Check results
COMMIT;  -- or ROLLBACK; if something's wrong
```

4. **Be careful with WHERE clauses**
   - Double-check your WHERE conditions
   - Missing WHERE in UPDATE/DELETE affects ALL rows!

---

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- PostgreSQL JSON Functions: https://www.postgresql.org/docs/current/functions-json.html
- SQL Tutorial: https://www.postgresqltutorial.com/
