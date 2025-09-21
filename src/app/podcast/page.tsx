'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PodcastComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'podcast',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #4A4A32, #1B1B1B)' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
              }}
            >
              <img
                src="/images/logo_removedbg.png"
                alt="The Merchant Guide Logo"
                style={{ height: '40px', width: 'auto' }}
              />
              <h2 style={{ color: '#F4E4BC', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                The <span style={{ color: '#DCA54A' }}>Merchant</span> Guide
              </h2>
            </Link>
            <Link
              href="/"
              style={{
                color: '#DCA54A',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 20px',
          textAlign: 'center',
          color: '#F4E4BC',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #DCA54A, #E8B866)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2',
            }}
          >
            The Merchant Guide Podcast
          </h1>
          <p
            style={{
              fontSize: '1.3rem',
              lineHeight: '1.6',
              color: '#FAF5E5',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Real conversations with payment industry experts, successful business owners, and the
            people shaping the future of commerce
          </p>
        </div>

        {/* Coming Soon Card */}
        <div
          style={{
            background: '#F4E4BC',
            borderRadius: '20px',
            padding: '50px 40px',
            margin: '0 auto 40px',
            maxWidth: '600px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ marginBottom: '30px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #DCA54A, #E8B866)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2.5rem',
              }}
            >
              🎙️
            </div>
            <h2
              style={{
                color: '#1B1B1B',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '15px',
              }}
            >
              Coming Soon!
            </h2>
            <p style={{ color: '#4A4A32', fontSize: '1.1rem', lineHeight: '1.5' }}>
              We&apos;re preparing deep-dive conversations with industry leaders to bring you the insights
              you need to succeed. Each episode will feature:
            </p>
          </div>

          {/* Features List */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '40px',
              textAlign: 'left',
            }}
          >
            {[
              '🎯 Industry expert interviews',
              '💼 Business owner success stories',
              '📈 Growth strategy discussions',
              '🔍 Behind-the-scenes insights',
              '❓ Q&A with payment pros',
              '📚 Actionable business tips',
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  color: '#1B1B1B',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  padding: '10px',
                  background: 'rgba(220, 165, 74, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Platform Preview */}
          <div style={{ marginBottom: '30px' }}>
            <h3
              style={{
                color: '#1B1B1B',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '15px',
              }}
            >
              Available on all major platforms:
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap',
                opacity: 0.7,
              }}
            >
              {['🎵 Apple Podcasts', '📊 Spotify', '🎧 Google Podcasts', '📱 All Platforms'].map(
                (platform, index) => (
                  <span
                    key={index}
                    style={{
                      color: '#4A4A32',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      background: 'rgba(220, 165, 74, 0.1)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                    }}
                  >
                    {platform}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Email Signup */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
              <h3
                style={{
                  color: '#1B1B1B',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                Get notified when Episode 1 drops!
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    padding: '15px 20px',
                    borderRadius: '10px',
                    border: '2px solid #DCA54A',
                    fontSize: '16px',
                    flex: '1',
                    minWidth: '250px',
                    outline: 'none',
                    color: '#1B1B1B',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #DCA54A, #E8B866)',
                    color: '#1B1B1B',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 165, 74, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Notify Me 🎧
                </button>
              </div>
              <p
                style={{
                  color: '#4A4A32',
                  fontSize: '0.9rem',
                  marginTop: '15px',
                  opacity: 0.8,
                }}
              >
                Be the first to hear our launch episode. No spam, just great content.
              </p>
            </form>
          ) : (
            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid #22c55e',
                borderRadius: '10px',
                padding: '20px',
                marginTop: '30px',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
              <h3 style={{ color: '#1B1B1B', fontSize: '1.3rem', marginBottom: '10px' }}>
                You&apos;re on the list!
              </h3>
              <p style={{ color: '#4A4A32', fontSize: '1rem' }}>
                You&apos;ll get an email as soon as Episode 1 is live. Thanks for your interest!
              </p>
            </div>
          )}
        </div>

        {/* CTA to main site */}
        <div style={{ marginTop: '60px' }}>
          <p style={{ color: '#FAF5E5', fontSize: '1.1rem', marginBottom: '20px' }}>
            While you wait, solve your payment processing needs:
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #DCA54A, #E8B866)',
              color: '#1B1B1B',
              padding: '15px 30px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(220, 165, 74, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Find My Payment Processor →
          </Link>
        </div>
      </div>
    </div>
  );
}