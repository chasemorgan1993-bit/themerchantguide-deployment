import { supabase } from './supabase';
import type { ProcessorWithCost } from './supabase';

export async function getProcessorRecommendations(formData: {
  business_type: string;
  monthly_volume: string;
  payment_environment: string;
  budget_priority: string;
}): Promise<ProcessorWithCost[]> {
  const businessType = formData.business_type;
  const monthlyVolume = parseFloat(formData.monthly_volume) || 0;
  const paymentEnvironment = formData.payment_environment;
  const budgetPriority = formData.budget_priority;
  const avgTransaction = 50;

  try {
    // Map specific business types to broader categories
    const businessTypeMapping: { [key: string]: string[] } = {
      // Retail & Physical
      retail: ['retail'],
      grocery: ['retail'],
      fashion: ['retail'],
      electronics: ['retail'],
      auto: ['retail'],

      // Food & Beverage
      restaurant: ['restaurant'],
      cafe: ['restaurant', 'retail'],
      bar: ['restaurant', 'retail'],
      food_truck: ['restaurant', 'retail'],
      catering: ['restaurant', 'service'],

      // Online & Digital
      online: ['online'],
      saas: ['online', 'service'],
      digital: ['online', 'service'],
      subscription: ['online', 'service'],

      // Services
      service: ['service'],
      healthcare: ['service'],
      fitness: ['service', 'retail'],
      beauty: ['service', 'retail'],
      education: ['service'],
      nonprofit: ['service'],

      // Other
      multi_location: ['multi_location', 'retail', 'restaurant', 'service'],
      marketplace: ['online', 'service'],
      other: ['retail', 'service'],
    };

    const compatibleTypes = businessTypeMapping[businessType] || [businessType];

    // Fetch from new processors_v2 table (include both active and coming_soon)
    const { data: allProcessors, error: allError } = await supabase
      .from('processors_v2')
      .select('*')
      .in('status', ['active', 'coming_soon']);

    if (allError) {
      console.error('Error fetching processors:', allError);
      return [];
    }

    let processors = allProcessors || [];

    // Advanced filtering system
    processors = processors.filter((processor) => {
      // 1. Enhanced business type filtering
      const matchesBusinessType =
        !processor.business_types ||
        processor.business_types.some((type: string) => compatibleTypes.includes(type)) ||
        processor.business_types.includes('multi_location');

      // 2. Volume range filtering
      const meetsMinVolume =
        !processor.min_monthly_volume || monthlyVolume >= processor.min_monthly_volume;
      const withinMaxVolume =
        !processor.max_monthly_volume || monthlyVolume <= processor.max_monthly_volume;

      // 3. Environment-specific filtering
      let environmentMatch = true;
      if (paymentEnvironment === 'online_only' && !processor.api_available) {
        environmentMatch = false;
      }

      return matchesBusinessType && meetsMinVolume && withinMaxVolume && environmentMatch;
    });

    // Calculate costs and enhanced scoring for each processor
    const processorsWithCosts: ProcessorWithCost[] = processors.map((processor) => {
      const transactionCount = monthlyVolume / avgTransaction;
      const transactionFees =
        (monthlyVolume * processor.primary_rate) / 100 +
        transactionCount * processor.primary_fixed_fee;
      const totalCost = transactionFees + processor.monthly_fee;
      const effectiveRate =
        monthlyVolume > 0 ? (totalCost / monthlyVolume) * 100 : processor.primary_rate;

      // Enhanced scoring based on budget priority + industry fit
      let priorityScore = 0;

      // Base score from budget priority
      switch (budgetPriority) {
        case 'lowest_total_cost':
          priorityScore = 1000 - totalCost; // Lower cost = higher score
          break;
        case 'no_monthly_fees':
          priorityScore = processor.no_monthly_fee ? 1000 : totalCost > 0 ? 500 - totalCost : 0;
          break;
        case 'easy_setup':
          // Favor well-known processors with good support
          const setupScore =
            processor.name === 'Square'
              ? 900
              : processor.name === 'Stripe'
                ? 850
                : processor.name === 'PayPal'
                  ? 800
                  : 750;
          priorityScore = setupScore - totalCost * 0.1;
          break;
        case 'advanced_features':
          // Favor processors with more features
          const featureCount = processor.features ? processor.features.length : 0;
          priorityScore =
            featureCount * 100 + (processor.api_available ? 200 : 0) - totalCost * 0.1;
          break;
        default:
          priorityScore = 1000 - totalCost;
      }

      // Add industry-specific bonuses
      let industryBonus = 0;

      // PayBright Dual Pricing - AUTO-RECOMMEND for Service/Hospitality (ISO Priority)
      if (
        [
          'restaurant',
          'cafe',
          'bar',
          'food_truck',
          'catering',
          'service',
          'hospitality',
          'healthcare',
          'fitness',
          'beauty',
        ].includes(businessType)
      ) {
        if (
          processor.name === 'PayBrite Dual Pricing' ||
          processor.name === 'GoPayBright' ||
          processor.name === 'PayBright'
        ) {
          industryBonus += 600; // HIGHEST PRIORITY - ISO recommended for service/hospitality
        }
      }

      // Restaurant/Food & Beverage bonuses
      if (['restaurant', 'cafe', 'bar', 'food_truck', 'catering'].includes(businessType)) {
        if (processor.name === 'Toast') industryBonus += 300; // Toast specializes in restaurants
        if (processor.name === 'Lightspeed') industryBonus += 280; // Lightspeed excellent for restaurants
        if (processor.name === 'Square') industryBonus += 200; // Square is great for food businesses
        if (processor.name === 'Clover') industryBonus += 180; // Clover has restaurant features
      }

      // Online/Digital bonuses
      if (['online', 'saas', 'digital', 'subscription'].includes(businessType)) {
        if (processor.name === 'Stripe') industryBonus += 300; // Stripe excels in online payments
        if (processor.api_available) industryBonus += 150; // API is crucial for online businesses
      }

      // High-volume bonuses
      if (monthlyVolume >= 50000) {
        if (processor.name === 'Stax') industryBonus += 250; // Stax is great for high volume
        if (processor.name === 'Helcim') industryBonus += 200; // Helcim offers volume discounts
      }

      // Small business bonuses
      if (monthlyVolume < 10000) {
        if (processor.no_monthly_fee) industryBonus += 200; // Important for small businesses
        if (processor.name === 'Square' || processor.name === 'PayPal') industryBonus += 150;
        if (processor.name === 'Clover') industryBonus += 100; // Good starter POS option
        if (processor.name === 'GoPayBright') industryBonus += 120; // No contracts, good for small business
      }

      // Retail-specific bonuses
      if (['retail', 'fashion', 'electronics', 'grocery'].includes(businessType)) {
        if (processor.name === 'Clover') industryBonus += 200; // Clover excels in retail
        if (processor.name === 'Lightspeed') industryBonus += 180; // Great retail POS
        if (processor.name === 'Square') industryBonus += 150; // Popular retail choice
        if (processor.name === 'GoPayBright') industryBonus += 130; // Flexible, no contracts
      }

      // Service business bonuses
      if (['service', 'healthcare', 'fitness', 'beauty', 'education'].includes(businessType)) {
        if (processor.name === 'GoPayBright') industryBonus += 150; // Good for service businesses wanting flexibility
        if (processor.name === 'Square') industryBonus += 140; // Popular service choice
      }

      // POS integration bonuses
      if (['retail', 'restaurant'].includes(businessType)) {
        if (processor.name === 'GoPayBright') industryBonus += 80; // Figure POS integration advantage
      }

      // Featured processor bonus - prioritize our main 5 processors
      if (processor.featured) {
        industryBonus += 400; // Significant boost for featured processors
      }

      priorityScore += industryBonus;

      return {
        ...processor,
        totalCost,
        effectiveRate,
        priorityScore,
      };
    });

    // Sort by priority score (higher is better), then by total cost
    processorsWithCosts.sort((a, b) => {
      if (Math.abs(a.priorityScore - b.priorityScore) < 10) {
        return a.totalCost - b.totalCost; // If scores are close, prefer lower cost
      }
      return b.priorityScore - a.priorityScore; // Higher priority score first
    });

    return processorsWithCosts.slice(0, 3);
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}
