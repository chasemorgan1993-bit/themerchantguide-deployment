'use client';

import { renderIconSVG } from '../../components/ThemeIcons';
import type { ProcessorWithCost } from '../../lib/supabase';

interface ProcessorCardProps {
  processor: ProcessorWithCost & {
    matchReasons?: string[];
  };
  index: number;
  formData: {
    business_type: string;
    monthly_volume: string;
    payment_environment: string;
    budget_priority: string;
  };
}

export function ProcessorCard({ processor, index, formData }: ProcessorCardProps) {
  const getBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="absolute -top-3 right-4 bg-golden-gradient text-dark-500 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Best Match
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="absolute -top-3 right-4 bg-green-400 text-dark-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          Great Alternative
        </div>
      );
    }
    return null;
  };

  // Removed unused variable

  return (
    <div
      style={{
        background: '#F4E4BC',
        padding: '2rem',
        borderRadius: '20px',
        border:
          index === 0
            ? '2px solid #DCA54A'
            : index === 1
              ? '2px solid #7ED957'
              : '2px solid #D4C8A8',
        position: 'relative',
        transition: 'all 0.3s ease',
        marginBottom: '1.5rem',
      }}
    >
      {getBadge(index)}

      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1B1B1B',
          marginBottom: '1rem',
        }}
      >
        {processor.name}
      </h3>

      <p className="text-golden-600 font-bold mb-4 text-xl">
        <span dangerouslySetInnerHTML={{ __html: renderIconSVG('money', 18, '#DCA54A') }}></span> $
        {processor.totalCost.toFixed(2)}/month total cost • {processor.effectiveRate.toFixed(2)}%
        effective rate
      </p>

      <p className="text-dark-600 mb-6 text-lg leading-relaxed">{processor.best_for}</p>

      {/* Match Reasons */}
      {processor.matchReasons && processor.matchReasons.length > 0 && (
        <div className="bg-golden-100 p-4 rounded-xl mb-6 border-l-4 border-golden-500">
          <strong className="text-dark-500 text-sm">Why this matches you:</strong>
          <ul className="mt-2 space-y-1">
            {processor.matchReasons.map((reason, i) => (
              <li key={i} className="text-dark-600 text-sm">
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Features */}
      <div className="mb-6">
        <strong className="text-dark-500 text-lg block mb-3">Key Features:</strong>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {processor.features.map((feature, i) => (
            <li key={i} className="text-dark-600 flex items-start">
              <span className="text-golden-500 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <div
            className="text-dark-500 font-semibold mb-2"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: renderIconSVG('check', 16, '#22c55e') }}
            ></span>
            Pros:
          </div>
          <p className="text-dark-600 text-sm">{processor.pros}</p>
        </div>
        <div>
          <div
            className="text-dark-500 font-semibold mb-2"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: renderIconSVG('warning', 16, '#f59e0b') }}
            ></span>
            Cons:
          </div>
          <p className="text-dark-600 text-sm">{processor.cons}</p>
        </div>
      </div>

      {/* Pricing Details and CTA */}
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div className="text-sm text-dark-600">
          <div>
            Processing: {processor.primary_rate}% + ${processor.primary_fixed_fee.toFixed(2)}
          </div>
          <div>Monthly fee: ${processor.monthly_fee.toFixed(2)}</div>
          <div className="mt-2 italic">
            Est. {Math.round(parseFloat(formData.monthly_volume) / 50)} transactions/month
          </div>
        </div>

        <a
          href={processor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-golden-gradient text-dark-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg no-underline"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}
