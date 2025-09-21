'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import type { ProcessorV2 } from '../../../lib/supabase';
import { renderIconSVG } from '../../../components/ThemeIcons';

export default function ComparePage() {
  const [processors, setProcessors] = useState<ProcessorV2[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<ProcessorV2[]>([]);
  const [monthlyVolume, setMonthlyVolume] = useState(10000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProcessors();
  }, []);

  const loadProcessors = async () => {
    try {
      const { data, error } = await supabase
        .from('processors_v2')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setProcessors(data || []);
    } catch (error) {
      console.error('Error loading processors:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProcessor = (processor: ProcessorV2) => {
    if (selectedProcessors.find((p) => p.id === processor.id)) {
      setSelectedProcessors(selectedProcessors.filter((p) => p.id !== processor.id));
    } else if (selectedProcessors.length < 4) {
      setSelectedProcessors([...selectedProcessors, processor]);
    }
  };

  const calculateCosts = (processor: ProcessorV2) => {
    const avgTransaction = 50;
    const transactionCount = monthlyVolume / avgTransaction;
    const transactionFees =
      (monthlyVolume * processor.primary_rate) / 100 +
      transactionCount * processor.primary_fixed_fee;
    const totalCost = transactionFees + processor.monthly_fee;
    const effectiveRate =
      monthlyVolume > 0 ? (totalCost / monthlyVolume) * 100 : processor.primary_rate;

    return { totalCost, effectiveRate };
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Loading processors...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ color: '#1B1B1B', margin: 0 }}>Payment Processor Comparison</h1>
        <Link href="/" style={{ color: '#DCA54A', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Home
        </Link>
      </div>

      {/* Volume Input */}
      <div
        style={{
          background: '#F4E4BC',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px',
        }}
      >
        <label
          style={{ color: '#1B1B1B', fontWeight: '600', display: 'block', marginBottom: '10px' }}
        >
          Monthly Sales Volume (for cost calculations):
        </label>
        <input
          type="number"
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(Number(e.target.value))}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #DCA54A',
            fontSize: '16px',
            width: '200px',
          }}
          placeholder="Enter monthly volume"
        />
      </div>

      {/* Processor Selection */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#1B1B1B', marginBottom: '15px' }}>
          Select Processors to Compare (max 4):
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          {processors.map((processor) => {
            const isSelected = selectedProcessors.find((p) => p.id === processor.id);
            const canSelect = selectedProcessors.length < 4 || isSelected;

            return (
              <div
                key={processor.id}
                onClick={() => canSelect && toggleProcessor(processor)}
                style={{
                  background: isSelected ? '#DCA54A' : '#F4E4BC',
                  color: '#1B1B1B',
                  padding: '15px',
                  borderRadius: '10px',
                  cursor: canSelect ? 'pointer' : 'not-allowed',
                  border: isSelected ? '2px solid #1B1B1B' : '2px solid transparent',
                  opacity: canSelect ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontWeight: '700', marginBottom: '5px' }}>{processor.name}</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  {processor.primary_rate}% + ${processor.primary_fixed_fee.toFixed(2)} | $
                  {processor.monthly_fee}/mo
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProcessors.length > 0 && (
        <div
          style={{ background: '#F4E4BC', borderRadius: '15px', padding: '20px', overflow: 'auto' }}
        >
          <h2 style={{ color: '#1B1B1B', marginBottom: '20px', textAlign: 'center' }}>
            Comparison Results ({selectedProcessors.length} processors)
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#DCA54A' }}>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    color: '#1B1B1B',
                    fontWeight: '700',
                  }}
                >
                  Feature
                </th>
                {selectedProcessors.map((processor) => (
                  <th
                    key={processor.id}
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#1B1B1B',
                      fontWeight: '700',
                      minWidth: '150px',
                    }}
                  >
                    {processor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Cost Analysis */}
              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Total Monthly Cost
                </td>
                {selectedProcessors.map((processor) => {
                  const { totalCost } = calculateCosts(processor);
                  return (
                    <td
                      key={processor.id}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#1B1B1B',
                      }}
                    >
                      ${totalCost.toFixed(2)}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Effective Rate
                </td>
                {selectedProcessors.map((processor) => {
                  const { effectiveRate } = calculateCosts(processor);
                  return (
                    <td
                      key={processor.id}
                      style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                    >
                      {effectiveRate.toFixed(2)}%
                    </td>
                  );
                })}
              </tr>

              {/* Pricing Details */}
              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Processing Rate
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    {processor.primary_rate}%
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Fixed Fee per Transaction
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    ${processor.primary_fixed_fee.toFixed(2)}
                  </td>
                ))}
              </tr>

              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Monthly Fee
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    ${processor.monthly_fee.toFixed(2)}
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>Best For</td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#1B1B1B',
                      fontSize: '12px',
                    }}
                  >
                    {processor.best_for}
                  </td>
                ))}
              </tr>

              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  No Monthly Fee
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: processor.no_monthly_fee
                          ? renderIconSVG('check', 16, '#22c55e')
                          : renderIconSVG('warning', 16, '#f59e0b'),
                      }}
                    ></span>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  API Available
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: processor.api_available
                          ? renderIconSVG('check', 16, '#22c55e')
                          : renderIconSVG('warning', 16, '#f59e0b'),
                      }}
                    ></span>
                  </td>
                ))}
              </tr>

              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Multi-Location Support
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: processor.multi_location
                          ? renderIconSVG('check', 16, '#22c55e')
                          : renderIconSVG('warning', 16, '#f59e0b'),
                      }}
                    ></span>
                  </td>
                ))}
              </tr>

              {/* Business Types */}
              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Business Types
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#1B1B1B',
                      fontSize: '12px',
                    }}
                  >
                    {processor.business_types.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Features Count */}
              <tr style={{ background: 'rgba(220, 165, 74, 0.1)' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>
                  Number of Features
                </td>
                {selectedProcessors.map((processor) => (
                  <td
                    key={processor.id}
                    style={{ padding: '12px', textAlign: 'center', color: '#1B1B1B' }}
                  >
                    {processor.features.length}
                  </td>
                ))}
              </tr>

              {/* Website Links */}
              <tr>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1B1B1B' }}>Learn More</td>
                {selectedProcessors.map((processor) => (
                  <td key={processor.id} style={{ padding: '12px', textAlign: 'center' }}>
                    <a
                      href={processor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#DCA54A',
                        color: '#1B1B1B',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '12px',
                      }}
                    >
                      Visit Site →
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedProcessors.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#4A4A32' }}>
          <p style={{ fontSize: '18px' }}>Select processors above to see a detailed comparison</p>
        </div>
      )}
    </div>
  );
}
