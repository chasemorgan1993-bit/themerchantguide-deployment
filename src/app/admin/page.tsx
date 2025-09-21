'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import type { ProcessorV2 } from '../../../lib/supabase';

export default function AdminPage() {
  const [processors, setProcessors] = useState<ProcessorV2[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'processors' | 'analytics'>('processors');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    website: '',
    primary_rate: '',
    primary_fixed_fee: '',
    monthly_fee: '',
    best_for: '',
    pros: '',
    cons: '',
    business_types: '',
    features: '',
  });

  useEffect(() => {
    loadProcessors();

    // Set up real-time subscription for processors_v2
    const subscription = supabase
      .channel('processors_v2')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'processors_v2' }, () => {
        loadProcessors();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProcessors = async () => {
    try {
      const { data, error } = await supabase.from('processors_v2').select('*').order('name');

      if (error) throw error;
      setProcessors(data || []);
    } catch (error) {
      console.error('Error loading processors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const processorData = {
        name: formData.name,
        company: formData.company || null,
        website: formData.website,
        primary_rate: parseFloat(formData.primary_rate),
        primary_fixed_fee: parseFloat(formData.primary_fixed_fee),
        monthly_fee: parseFloat(formData.monthly_fee),
        best_for: formData.best_for,
        pros: formData.pros,
        cons: formData.cons,
        business_types: JSON.parse(formData.business_types || '[]'),
        features: JSON.parse(formData.features || '[]'),
        no_monthly_fee: parseFloat(formData.monthly_fee) === 0,
        api_available: true, // Default values
        multi_location: true,
        status: 'active',
      };

      if (editing) {
        const { error } = await supabase
          .from('processors_v2')
          .update(processorData)
          .eq('id', editing);

        if (error) throw error;
        setEditing(null);
      } else {
        const { error } = await supabase.from('processors_v2').insert([processorData]);

        if (error) throw error;
        setShowAddForm(false);
      }

      // Reset form
      setFormData({
        name: '',
        company: '',
        website: '',
        primary_rate: '',
        primary_fixed_fee: '',
        monthly_fee: '',
        best_for: '',
        pros: '',
        cons: '',
        business_types: '',
        features: '',
      });

      loadProcessors();
    } catch (error) {
      console.error('Error saving processor:', error);
      alert('Error saving processor. Please check the console for details.');
    }
  };

  const handleEdit = (processor: ProcessorV2) => {
    setFormData({
      name: processor.name,
      company: processor.company || '',
      website: processor.website,
      primary_rate: processor.primary_rate.toString(),
      primary_fixed_fee: processor.primary_fixed_fee.toString(),
      monthly_fee: processor.monthly_fee.toString(),
      best_for: processor.best_for,
      pros: processor.pros,
      cons: processor.cons,
      business_types: JSON.stringify(processor.business_types),
      features: JSON.stringify(processor.features),
    });
    setEditing(processor.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this processor?')) return;

    try {
      const { error } = await supabase.from('processors_v2').delete().eq('id', id);

      if (error) throw error;
      loadProcessors();
    } catch (error) {
      console.error('Error deleting processor:', error);
    }
  };

  // Analytics calculations
  const analytics = {
    totalProcessors: processors.length,
    avgProcessingRate:
      processors.length > 0
        ? (processors.reduce((sum, p) => sum + p.primary_rate, 0) / processors.length).toFixed(2)
        : '0',
    avgFixedFee:
      processors.length > 0
        ? (processors.reduce((sum, p) => sum + p.primary_fixed_fee, 0) / processors.length).toFixed(
            2
          )
        : '0',
    avgMonthlyFee:
      processors.length > 0
        ? (processors.reduce((sum, p) => sum + p.monthly_fee, 0) / processors.length).toFixed(2)
        : '0',
    noMonthlyFeeCount: processors.filter((p) => p.no_monthly_fee).length,
    apiAvailableCount: processors.filter((p) => p.api_available).length,
    multiLocationCount: processors.filter((p) => p.multi_location).length,
    businessTypeDistribution: processors.reduce(
      (acc, p) => {
        p.business_types.forEach((type) => {
          acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    ),
    featureDistribution: processors.reduce(
      (acc, p) => {
        p.features.forEach((feature) => {
          acc[feature] = (acc[feature] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    ),
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Loading processors...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ color: '#1B1B1B' }}>Admin Dashboard</h1>
        <Link href="/" style={{ color: '#DCA54A', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Site
        </Link>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '30px', borderBottom: '2px solid #DCA54A' }}>
        <div style={{ display: 'flex', gap: '0' }}>
          <button
            onClick={() => setActiveTab('processors')}
            style={{
              background: activeTab === 'processors' ? '#DCA54A' : 'transparent',
              color: activeTab === 'processors' ? '#1B1B1B' : '#DCA54A',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            📊 Processors ({processors.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              background: activeTab === 'analytics' ? '#DCA54A' : 'transparent',
              color: activeTab === 'analytics' ? '#1B1B1B' : '#DCA54A',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div>
          <h2 style={{ color: '#1B1B1B', marginBottom: '25px' }}>Platform Analytics</h2>

          {/* Key Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                background: '#F4E4BC',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1B1B1B' }}>
                {analytics.totalProcessors}
              </div>
              <div style={{ color: '#4A4A32', fontWeight: '600' }}>Total Processors</div>
            </div>
            <div
              style={{
                background: '#F4E4BC',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1B1B1B' }}>
                {analytics.avgProcessingRate}%
              </div>
              <div style={{ color: '#4A4A32', fontWeight: '600' }}>Avg Processing Rate</div>
            </div>
            <div
              style={{
                background: '#F4E4BC',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1B1B1B' }}>
                ${analytics.avgFixedFee}
              </div>
              <div style={{ color: '#4A4A32', fontWeight: '600' }}>Avg Fixed Fee</div>
            </div>
            <div
              style={{
                background: '#F4E4BC',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1B1B1B' }}>
                ${analytics.avgMonthlyFee}
              </div>
              <div style={{ color: '#4A4A32', fontWeight: '600' }}>Avg Monthly Fee</div>
            </div>
          </div>

          {/* Feature Analytics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '30px',
            }}
          >
            <div style={{ background: '#F4E4BC', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#1B1B1B', marginBottom: '15px' }}>Business Type Coverage</h3>
              {Object.entries(analytics.businessTypeDistribution).map(([type, count]) => (
                <div
                  key={type}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ color: '#1B1B1B', textTransform: 'capitalize' }}>{type}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        background: '#DCA54A',
                        height: '8px',
                        width: `${(count / analytics.totalProcessors) * 100}px`,
                        borderRadius: '4px',
                        minWidth: '20px',
                      }}
                    ></div>
                    <span style={{ color: '#4A4A32', fontWeight: '600', minWidth: '30px' }}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#F4E4BC', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#1B1B1B', marginBottom: '15px' }}>Feature Adoption</h3>
              <div style={{ marginBottom: '15px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  <span style={{ color: '#1B1B1B' }}>No Monthly Fee</span>
                  <span style={{ color: '#4A4A32', fontWeight: '600' }}>
                    {analytics.noMonthlyFeeCount}/{analytics.totalProcessors}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  <span style={{ color: '#1B1B1B' }}>API Available</span>
                  <span style={{ color: '#4A4A32', fontWeight: '600' }}>
                    {analytics.apiAvailableCount}/{analytics.totalProcessors}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  <span style={{ color: '#1B1B1B' }}>Multi-Location</span>
                  <span style={{ color: '#4A4A32', fontWeight: '600' }}>
                    {analytics.multiLocationCount}/{analytics.totalProcessors}
                  </span>
                </div>
              </div>

              <h4 style={{ color: '#1B1B1B', marginBottom: '10px', fontSize: '14px' }}>
                Top Features:
              </h4>
              {Object.entries(analytics.featureDistribution)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([feature, count]) => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '5px',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: '#1B1B1B' }}>{feature}</span>
                    <span style={{ color: '#4A4A32', fontWeight: '600' }}>{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'processors' && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ color: '#1B1B1B', margin: 0 }}>Processor Management</h2>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditing(null);
                setFormData({
                  name: '',
                  company: '',
                  website: '',
                  primary_rate: '',
                  primary_fixed_fee: '',
                  monthly_fee: '',
                  best_for: '',
                  pros: '',
                  cons: '',
                  business_types: '',
                  features: '',
                });
              }}
              style={{
                background: '#DCA54A',
                color: '#1B1B1B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {showAddForm ? 'Cancel' : 'Add New Processor'}
            </button>
          </div>

          {showAddForm && (
            <div
              style={{
                background: '#F4E4BC',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '30px',
              }}
            >
              <h2 style={{ color: '#1B1B1B', marginBottom: '20px' }}>
                {editing ? 'Edit Processor' : 'Add New Processor'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Processor Name*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                  />
                  <input
                    type="text"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                  />
                  <input
                    type="url"
                    placeholder="Website URL*"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Rate (%)*"
                      value={formData.primary_rate}
                      onChange={(e) => setFormData({ ...formData, primary_rate: e.target.value })}
                      required
                      style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Fixed Fee ($)*"
                      value={formData.primary_fixed_fee}
                      onChange={(e) =>
                        setFormData({ ...formData, primary_fixed_fee: e.target.value })
                      }
                      required
                      style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Monthly Fee ($)*"
                      value={formData.monthly_fee}
                      onChange={(e) => setFormData({ ...formData, monthly_fee: e.target.value })}
                      required
                      style={{ padding: '10px', borderRadius: '5px', border: '1px solid #DCA54A' }}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Best For (description)*"
                  value={formData.best_for}
                  onChange={(e) => setFormData({ ...formData, best_for: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #DCA54A',
                    minHeight: '60px',
                    marginBottom: '15px',
                  }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <textarea
                    placeholder="Pros*"
                    value={formData.pros}
                    onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #DCA54A',
                      minHeight: '80px',
                    }}
                  />
                  <textarea
                    placeholder="Cons*"
                    value={formData.cons}
                    onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #DCA54A',
                      minHeight: '80px',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <textarea
                    placeholder='Business Types* (JSON: ["retail", "online", "restaurant"])'
                    value={formData.business_types}
                    onChange={(e) => setFormData({ ...formData, business_types: e.target.value })}
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #DCA54A',
                      minHeight: '60px',
                    }}
                  />
                  <textarea
                    placeholder='Features* (JSON: ["Feature 1", "Feature 2"])'
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #DCA54A',
                      minHeight: '60px',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#DCA54A',
                    color: '#1B1B1B',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {editing ? 'Update Processor' : 'Add Processor'}
                </button>
              </form>
            </div>
          )}

          <div style={{ display: 'grid', gap: '20px' }}>
            {processors.map((processor) => (
              <div
                key={processor.id}
                style={{
                  background: '#F4E4BC',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #DCA54A',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '15px',
                  }}
                >
                  <div>
                    <h3 style={{ color: '#1B1B1B', margin: '0 0 5px 0' }}>{processor.name}</h3>
                    {processor.company && (
                      <p
                        style={{
                          color: '#4A4A32',
                          margin: '0 0 5px 0',
                          fontSize: '14px',
                          fontStyle: 'italic',
                        }}
                      >
                        {processor.company}
                      </p>
                    )}
                    <p style={{ color: '#4A4A32', margin: '0', fontSize: '14px' }}>
                      {processor.primary_rate}% + ${processor.primary_fixed_fee} per transaction | $
                      {processor.monthly_fee}/month
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(processor)}
                      style={{
                        background: '#DCA54A',
                        color: '#1B1B1B',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(processor.id)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p style={{ color: '#1B1B1B', marginBottom: '10px' }}>
                  <strong>Best for:</strong> {processor.best_for}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <p style={{ color: '#1B1B1B', margin: '0 0 5px 0' }}>
                      <strong>Pros:</strong>
                    </p>
                    <p style={{ color: '#4A4A32', margin: '0', fontSize: '14px' }}>
                      {processor.pros}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#1B1B1B', margin: '0 0 5px 0' }}>
                      <strong>Cons:</strong>
                    </p>
                    <p style={{ color: '#4A4A32', margin: '0', fontSize: '14px' }}>
                      {processor.cons}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <p style={{ color: '#1B1B1B', margin: '0 0 5px 0' }}>
                    <strong>Features:</strong>
                  </p>
                  <p style={{ color: '#4A4A32', margin: '0', fontSize: '14px' }}>
                    {processor.features.join(', ')}
                  </p>
                </div>

                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <p style={{ color: '#4A4A32', margin: '0', fontSize: '14px' }}>
                    <strong>Business Types:</strong> {processor.business_types.join(', ')}
                  </p>
                  <a
                    href={processor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#DCA54A', textDecoration: 'none', fontSize: '14px' }}
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '40px',
              padding: '20px',
              background: '#F4E4BC',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#1B1B1B', margin: '0' }}>
              <strong>📊 Total Processors:</strong> {processors.length} |
              <strong> 🔄 Real-time enabled</strong> |
              <strong> 📝 Using processors_v2 schema</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
