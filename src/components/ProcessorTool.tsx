'use client';

import { useState } from 'react';
import { ProcessorCard } from './ProcessorCard';
import { renderIconSVG } from '../../components/ThemeIcons';
import { getProcessorRecommendations } from '../../lib/processors';
import type { ProcessorWithCost } from '../../lib/supabase';

export default function ProcessorTool() {
  const [formData, setFormData] = useState({
    business_type: '',
    monthly_volume: '',
    payment_environment: '',
    budget_priority: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<ProcessorWithCost[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.business_type ||
      !formData.monthly_volume ||
      !formData.payment_environment ||
      !formData.budget_priority
    ) {
      setError('Please fill in all fields to get recommendations.');
      return;
    }

    setError('');
    setLoading(true);
    setShowResults(false);

    // Get personalized recommendations from Supabase
    getProcessorRecommendations(formData)
      .then((recommendations) => {
        setResults(recommendations);
        setLoading(false);
        setShowResults(true);

        // Scroll to results
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      })
      .catch(() => {
        setError('Failed to get recommendations. Please try again.');
        setLoading(false);
      });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user starts typing
  };

  return (
    <>
      {/* Form Section */}
      <div
        style={{
          background: '#F4E4BC',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          border: '2px solid #DCA54A',
          marginBottom: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              color: '#1B1B1B',
              marginBottom: '10px',
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
          >
            Tell us about your business
          </h2>
          <p
            style={{
              color: '#4A4A32',
              fontSize: '1rem',
            }}
          >
            Answer 3 quick questions to get personalized recommendations
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Business Type */}
          <div>
            <label
              htmlFor="business_type"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#1B1B1B',
                fontSize: '1rem',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('business', 18, '#1B1B1B') }}
                ></span>
                What type of business do you run?
              </span>
            </label>
            <select
              id="business_type"
              value={formData.business_type}
              onChange={(e) => handleInputChange('business_type', e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #D4C8A8',
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'white',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#DCA54A';
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 165, 74, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D4C8A8';
                e.target.style.boxShadow = 'none';
              }}
              required
            >
              <option value="">Choose your business type</option>
              <option value="retail">Retail Store (physical location)</option>
              <option value="online">E-commerce/Online Business</option>
              <option value="restaurant">Restaurant/Food Service</option>
              <option value="service">Service Business</option>
              <option value="multi_location">Multiple Locations</option>
            </select>
          </div>

          {/* Volume and Environment Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="monthly_volume"
                className="block mb-3 font-semibold text-dark-500 text-lg"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: renderIconSVG('money', 18, '#1B1B1B') }}
                  ></span>
                  Monthly Sales Volume
                </span>
              </label>
              <select
                id="monthly_volume"
                value={formData.monthly_volume}
                onChange={(e) => handleInputChange('monthly_volume', e.target.value)}
                className="w-full p-4 border-2 border-golden-200 rounded-xl text-lg bg-white transition-all duration-300 focus:border-golden-500 focus:ring-2 focus:ring-golden-200 focus:outline-none"
                required
              >
                <option value="">Select range</option>
                <option value="2500">Under $5K/month</option>
                <option value="7500">$5K - $10K/month</option>
                <option value="15000">$10K - $20K/month</option>
                <option value="35000">$20K - $50K/month</option>
                <option value="75000">$50K+ /month</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="payment_environment"
                className="block mb-3 font-semibold text-dark-500 text-lg"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: renderIconSVG('location', 18, '#1B1B1B') }}
                  ></span>
                  Where do you sell?
                </span>
              </label>
              <select
                id="payment_environment"
                value={formData.payment_environment}
                onChange={(e) => handleInputChange('payment_environment', e.target.value)}
                className="w-full p-4 border-2 border-golden-200 rounded-xl text-lg bg-white transition-all duration-300 focus:border-golden-500 focus:ring-2 focus:ring-golden-200 focus:outline-none"
                required
              >
                <option value="">Choose location</option>
                <option value="in_person_only">In-person only</option>
                <option value="online_only">Online only</option>
                <option value="both_equal">Both online & in-person</option>
              </select>
            </div>
          </div>

          {/* Budget Priority */}
          <div>
            <label
              htmlFor="budget_priority"
              className="block mb-3 font-semibold text-dark-500 text-lg"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('target', 18, '#1B1B1B') }}
                ></span>
                What matters most to you?
              </span>
            </label>
            <select
              id="budget_priority"
              value={formData.budget_priority}
              onChange={(e) => handleInputChange('budget_priority', e.target.value)}
              className="w-full p-4 border-2 border-golden-200 rounded-xl text-lg bg-white transition-all duration-300 focus:border-golden-500 focus:ring-2 focus:ring-golden-200 focus:outline-none"
              required
            >
              <option value="">Select priority</option>
              <option value="lowest_total_cost">Lowest fees possible</option>
              <option value="no_monthly_fees">No monthly fees</option>
              <option value="easy_setup">Easy setup & support</option>
              <option value="advanced_features">Advanced features & tools</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #DCA54A, #C4923D)',
              color: '#1B1B1B',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(220, 165, 74, 0.4)',
              marginTop: '1.5rem',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(220, 165, 74, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 165, 74, 0.4)';
              }
            }}
          >
            {loading ? 'Finding Recommendations...' : 'Get My Personalized Recommendations →'}
          </button>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 animate-fadeIn">
            <p className="text-golden-600 font-semibold text-lg">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('chart', 18, '#DCA54A') }}
                ></span>
                Finding the best processors for your business...
              </span>
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 text-center animate-fadeIn">
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: renderIconSVG('warning', 18, '#f59e0b') }}
              ></span>
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {showResults && (
        <div id="results" className="mt-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: renderIconSVG('target', 24, '#DCA54A') }}
              ></span>
              Your Personalized Recommendations
            </span>
          </h2>

          <div className="space-y-6">
            {results.map((processor, index) => (
              <ProcessorCard
                key={processor.id}
                processor={processor}
                index={index}
                formData={formData}
              />
            ))}
          </div>

          <div className="text-center mt-8 p-6 bg-golden-500/10 rounded-2xl border border-golden-500">
            <p className="text-white mb-4 text-lg">
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('insight', 18, '#DCA54A') }}
                ></span>
                Pro Tip:
              </strong>{' '}
              Consider your growth plans when choosing. You can always upgrade later!
            </p>
            <p className="text-cream-50 text-sm">
              These recommendations are based on your specific business type, payment environment,
              volume, and priorities. Contact processors directly for custom quotes, or{' '}
              <a
                href="mailto:info@themerchantguide.com"
                className="text-golden-200 font-semibold hover:underline"
              >
                email us
              </a>{' '}
              for personalized guidance.
            </p>
          </div>

          {/* Calendly CTA */}
          <div className="text-center mt-8 p-8 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl border-2 border-green-400 shadow-xl">
            <h3 className="text-white text-2xl font-bold mb-3">
              Want a Custom Quote for Your Business?
            </h3>
            <p className="text-green-50 mb-6 text-lg">
              Schedule a free 15-minute consultation with a payment processing expert. Get
              personalized rates and recommendations.
            </p>
            <a
              href="https://calendly.com/themerchantguide-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-green-50 hover:scale-105 hover:shadow-2xl no-underline"
            >
              📅 Schedule Free Consultation
            </a>
            <p className="text-green-100 text-sm mt-4">
              No obligation • Expert guidance • Custom pricing
            </p>
          </div>
        </div>
      )}
    </>
  );
}
