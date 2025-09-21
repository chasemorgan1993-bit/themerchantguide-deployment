const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addNewProcessors() {
  try {
    console.log('Adding Clover, Lightspeed, and GoPayBright to the database...');

    // Add Clover
    const { data: clover, error: cloverError } = await supabase
      .from('processors_v2')
      .insert([{
        name: 'Clover',
        company: 'Fiserv',
        website: 'https://www.clover.com',
        logo_url: 'https://www.clover.com/favicon.ico',
        primary_rate: 2.3,
        primary_fixed_fee: 0.10,
        monthly_fee: 14.95,
        best_for: 'Small to medium retail businesses needing robust POS features',
        pros: 'Low in-person rates, comprehensive POS system, industry-specific plans, good hardware options',
        cons: 'Long-term contracts (36-48 months), high early termination fees, locked processing rates',
        business_types: ['retail', 'restaurant', 'service'],
        online_rate: 3.5,
        keyed_rate: 3.5,
        contract_length: 36,
        early_termination_fee: 495.0,
        setup_fee: 0.0,
        no_monthly_fee: false,
        same_day_funding: true,
        free_hardware: false,
        api_available: true,
        multi_location: true,
        min_monthly_volume: 0.0,
        max_monthly_volume: null,
        status: 'active',
        features: ['POS System', 'Inventory Management', 'Employee Management', 'Customer Engagement', 'Analytics', 'App Market']
      }])
      .select();

    if (cloverError) {
      console.error('Error adding Clover:', cloverError);
    } else {
      console.log('✅ Clover added successfully');
    }

    // Add Lightspeed
    const { data: lightspeed, error: lightspeedError } = await supabase
      .from('processors_v2')
      .insert([{
        name: 'Lightspeed',
        company: 'Lightspeed Commerce',
        website: 'https://www.lightspeedhq.com',
        logo_url: 'https://www.lightspeedhq.com/favicon.ico',
        primary_rate: 2.6,
        primary_fixed_fee: 0.10,
        monthly_fee: 89.0,
        best_for: 'Restaurants and retail businesses needing advanced POS features and inventory management',
        pros: 'Advanced POS features, excellent inventory management, integrated ecosystem, good reporting',
        cons: 'High monthly fees, forces use of Lightspeed Payments ($400/month penalty), expensive hardware',
        business_types: ['restaurant', 'retail'],
        online_rate: 2.9,
        keyed_rate: 2.9,
        contract_length: 0,
        early_termination_fee: 0.0,
        setup_fee: 0.0,
        no_monthly_fee: false,
        same_day_funding: true,
        free_hardware: false,
        api_available: true,
        multi_location: true,
        min_monthly_volume: 1000.0,
        max_monthly_volume: null,
        status: 'active',
        features: ['Advanced POS', 'Inventory Management', 'Multi-Location', 'Analytics', 'Integrations', 'Omnichannel']
      }])
      .select();

    if (lightspeedError) {
      console.error('Error adding Lightspeed:', lightspeedError);
    } else {
      console.log('✅ Lightspeed added successfully');
    }

    // Add GoPayBright
    const { data: gopaybright, error: gopaybrightError } = await supabase
      .from('processors_v2')
      .insert([{
        name: 'GoPayBright',
        company: 'PayBright Merchant Services',
        website: 'https://www.gopaybright.com',
        logo_url: 'https://www.gopaybright.com/favicon.ico',
        primary_rate: 2.4,
        primary_fixed_fee: 0.15,
        monthly_fee: 0.0,
        best_for: 'Small to medium businesses wanting transparent pricing with no contracts, especially those using Figure POS',
        pros: 'No contracts, no early termination fees, no annual rate increases, local customer service, PCI compliance included, Figure POS integration',
        cons: 'Limited brand recognition, rates not publicly disclosed, fewer advanced features than major POS providers',
        business_types: ['retail', 'service', 'restaurant'],
        online_rate: 2.9,
        keyed_rate: 3.2,
        contract_length: 0,
        early_termination_fee: 0.0,
        setup_fee: 0.0,
        no_monthly_fee: true,
        same_day_funding: true,
        free_hardware: false,
        api_available: true,
        multi_location: false,
        min_monthly_volume: 0.0,
        max_monthly_volume: null,
        status: 'active',
        features: ['No Contracts', 'Transparent Pricing', 'Local Support', 'PCI Compliance', 'Competitive Rates', 'Next Day Funding', 'Figure POS Integration']
      }])
      .select();

    if (gopaybrightError) {
      console.error('Error adding GoPayBright:', gopaybrightError);
    } else {
      console.log('✅ GoPayBright added successfully');
    }

    console.log('\n🎉 All new processors added to the database!');
    console.log('Your payment processor tool now includes:');
    console.log('- Clover (POS system with competitive rates)');
    console.log('- Lightspeed (Advanced restaurant/retail POS)');
    console.log('- GoPayBright (Transparent pricing, no contracts)');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

addNewProcessors();