'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './hugo-styles.css';
import { getProcessorRecommendations } from '../../lib/processors';
import { renderIconSVG } from '../../components/ThemeIcons';
import type { ProcessorWithCost } from '../../lib/supabase';

export default function Home() {
  useEffect(() => {
    // Floating Calendly button
    const setupFloatingButton = () => {
      let floatingButton = document.getElementById('floating-calendly');

      if (!floatingButton) {
        floatingButton = document.createElement('a') as HTMLAnchorElement;
        floatingButton.id = 'floating-calendly';
        (floatingButton as HTMLAnchorElement).href = 'https://calendly.com/themerchantguide-info/30min';
        (floatingButton as HTMLAnchorElement).target = '_blank';
        floatingButton.innerHTML = '📅';
        floatingButton.title = 'Schedule Free Consultation';

        Object.assign(floatingButton.style, {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
          zIndex: '1000',
          transition: 'all 0.3s ease',
          opacity: '0',
          transform: 'translateY(100px)',
          textDecoration: 'none'
        });

        floatingButton.addEventListener('mouseenter', function() {
          const button = this as HTMLElement;
          button.style.transform = button.style.transform.includes('translateY(0)') ? 'translateY(0) scale(1.1)' : 'translateY(100px) scale(1.1)';
          button.style.boxShadow = '0 6px 25px rgba(34, 197, 94, 0.6)';
        });

        floatingButton.addEventListener('mouseleave', function() {
          const button = this as HTMLElement;
          button.style.transform = button.style.transform.includes('translateY(0)') ? 'translateY(0) scale(1)' : 'translateY(100px) scale(1)';
          button.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.4)';
        });

        document.body.appendChild(floatingButton);
      }

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const showThreshold = 300; // Show after scrolling 300px

        if (scrollY > showThreshold) {
          floatingButton.style.opacity = '1';
          floatingButton.style.transform = 'translateY(0)';
        } else {
          floatingButton.style.opacity = '0';
          floatingButton.style.transform = 'translateY(100px)';
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    // Your Hugo JavaScript logic
    const setupForm = () => {
      const form = document.getElementById('processorForm');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const formData = new FormData(this as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (
          !data.business_type ||
          !data.monthly_volume ||
          !data.payment_environment ||
          !data.budget_priority
        ) {
          const errorEl = document.querySelector('.error') as HTMLElement;
          if (errorEl) errorEl.style.display = 'block';
          return;
        }

        const errorEl = document.querySelector('.error') as HTMLElement;
        const loadingEl = document.querySelector('.loading') as HTMLElement;
        const resultsEl = document.querySelector('.results') as HTMLElement;

        if (errorEl) errorEl.style.display = 'none';
        if (loadingEl) loadingEl.style.display = 'block';
        if (resultsEl) resultsEl.style.display = 'none';

        // Get personalized recommendations from Supabase
        getProcessorRecommendations({
          business_type: data.business_type as string,
          monthly_volume: data.monthly_volume as string,
          payment_environment: data.payment_environment as string,
          budget_priority: data.budget_priority as string,
        })
          .then((recommendations) => {
            displayResults(recommendations);
            if (loadingEl) loadingEl.style.display = 'none';
            const results = document.getElementById('results');
            if (results) {
              results.style.display = 'block';
              results.scrollIntoView({ behavior: 'smooth' });
            }
          })
          .catch((error) => {
            console.error('Error getting recommendations:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (errorEl) {
              errorEl.innerHTML =
                '<p style="display: flex; align-items: center; justify-content: center; gap: 8px;"><span>' +
                renderIconSVG('warning', 18, '#f59e0b') +
                '</span> Error loading recommendations. Please try again.</p>';
              errorEl.style.display = 'block';
            }
          });
      });
    };

    const displayResults = (recommendations: ProcessorWithCost[]) => {
      const resultsHTML = recommendations
        .map((rec, index) => {
          // Get priority reason based on user's selection
          const formData = new FormData(
            document.getElementById('processorForm') as HTMLFormElement
          );
          const budgetPriority = formData.get('budget_priority') as string;

          let priorityReason = '';
          switch (budgetPriority) {
            case 'lowest_total_cost':
              priorityReason = 'Lowest Total Cost';
              break;
            case 'no_monthly_fees':
              priorityReason = 'No Monthly Fees';
              break;
            case 'easy_setup':
              priorityReason = 'Easy Setup';
              break;
            case 'advanced_features':
              priorityReason = 'Advanced Features';
              break;
          }

          return `
        <div style="background: #F4E4BC; padding: 35px; border-radius: 20px; margin-bottom: 30px; color: #1B1B1B; border: 2px solid ${index === 0 ? '#DCA54A' : '#D4C8A8'}; position: relative; box-shadow: 0 8px 25px rgba(107, 107, 71, 0.15);">
          ${index === 0 ? `<div style="position: absolute; top: -10px; right: 15px; background: linear-gradient(135deg, #DCA54A, #E8B866); color: #1B1B1B; padding: 8px 18px; border-radius: 25px; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(220, 165, 74, 0.4); display: flex; align-items: center; gap: 5px;">${renderIconSVG('bestMatch', 16, '#1B1B1B')} Best for ${priorityReason}</div>` : ''}

          <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: center; margin: 0 0 12px 0; min-height: 80px;">
              ${(() => {
                // Simple, reliable logo URLs - only include working ones
                const logos: Record<string, string> = {
                  Square: 'https://logos-world.net/wp-content/uploads/2020/11/Square-Logo.png',
                  Stripe: 'https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png',
                  PayPal: 'https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png',
                  Stax: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/erkxwhl1gczutvx3f5qt',
                  Toast: 'https://1000logos.net/wp-content/uploads/2021/05/Toast-logo.png',
                  // Helcim will show as text for now until we find working URL
                };

                return logos[rec.name]
                  ? `<img src="${logos[rec.name]}" alt="${rec.name}" style="height: 60px; max-width: 200px; object-fit: contain;" onerror="this.outerHTML='<h3 style=&quot;margin: 0; color: #1B1B1B; font-size: 1.8rem; font-weight: 700;&quot;>${rec.name}</h3>';" />`
                  : `<h3 style="margin: 0; color: #1B1B1B; font-size: 1.8rem; font-weight: 700;">${rec.name}</h3>`;
              })()}
            </div>
            <div style="background: linear-gradient(135deg, #DCA54A, #E8B866); color: #1B1B1B; padding: 12px 20px; border-radius: 12px; font-weight: 700; font-size: 1.1rem; text-align: center; box-shadow: 0 4px 15px rgba(220, 165, 74, 0.3);">
              $${rec.totalCost.toFixed(2)}/month total cost • ${rec.effectiveRate.toFixed(2)}% effective rate
            </div>
          </div>

          <div style="background: #FAF5E5; padding: 18px; border-radius: 15px; margin-bottom: 20px; border: 2px solid #DCA54A; box-shadow: 0 3px 12px rgba(220, 165, 74, 0.15);">
            <p style="margin: 0; line-height: 1.6; font-size: 1.05rem; color: #1B1B1B; font-style: italic;">
              <strong>Perfect for:</strong> ${rec.best_for}
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: #1B1B1B; margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">${renderIconSVG('features', 18, '#DCA54A')} Key Features:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
              ${rec.features
                .map(
                  (feature) => `
                <div style="background: #FAF5E5; padding: 10px 14px; border-radius: 10px; color: #1B1B1B; font-size: 0.95rem; border: 2px solid #DCA54A; box-shadow: 0 2px 8px rgba(220, 165, 74, 0.15);">
                  ${renderIconSVG('check', 14, '#22c55e')} ${feature}
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(34, 197, 94, 0.1); padding: 15px; border-radius: 12px; border-left: 4px solid #22c55e;">
              <div style="font-weight: 600; color: #1B1B1B; margin-bottom: 5px; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">${renderIconSVG('check', 16, '#22c55e')} Strengths</div>
              <div style="color: #1B1B1B; font-size: 0.9rem; line-height: 1.4;">${rec.pros}</div>
            </div>
            <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 12px; border-left: 4px solid #ef4444;">
              <div style="font-weight: 600; color: #1B1B1B; margin-bottom: 5px; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">${renderIconSVG('warning', 16, '#f59e0b')} Considerations</div>
              <div style="color: #1B1B1B; font-size: 0.9rem; line-height: 1.4;">${rec.cons}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; padding-top: 20px; border-top: 2px solid #D4C8A8;">
            <div style="background: #FAF5E5; padding: 15px 20px; border-radius: 12px; border: 2px solid #DCA54A; box-shadow: 0 2px 8px rgba(220, 165, 74, 0.15);">
              <div style="font-size: 0.85rem; color: #4A4A32; margin-bottom: 2px;">Processing Rate</div>
              <div style="font-weight: 600; color: #1B1B1B;">${rec.primary_rate}% + $${rec.primary_fixed_fee.toFixed(2)}</div>
              <div style="font-size: 0.85rem; color: #4A4A32; margin-top: 2px;">Monthly: $${rec.monthly_fee.toFixed(2)}</div>
            </div>
            <a href="${rec.website}" target="_blank" style="background: linear-gradient(135deg, #DCA54A, #C4923D); color: #1B1B1B; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(220, 165, 74, 0.4); display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 25px rgba(220, 165, 74, 0.6)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 20px rgba(220, 165, 74, 0.4)';">
              Learn More <span style="font-size: 1.2rem;">→</span>
            </a>
          </div>
        </div>
        `;
        })
        .join('');

      const resultsContainer = document.getElementById('results');
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div style="background: #FAF5E5; padding: 40px; border-radius: 25px; margin: 20px auto; max-width: 1200px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
            <h2 style="margin-bottom: 30px; color: #1B1B1B; text-align: center; display: flex; align-items: center; justify-content: center; gap: 15px; font-size: 2.2rem; font-weight: 700;"><img src="/images/logo_removedbg.png" alt="Guide" style="height: 48px; width: auto; opacity: 0.9;" /> Your Personalized Recommendations</h2>
            ${resultsHTML}
            <div style="text-align: center; margin-top: 40px; padding: 25px; background: linear-gradient(135deg, rgba(220, 165, 74, 0.15), rgba(220, 165, 74, 0.08)); border-radius: 20px; border: 2px solid #DCA54A;">
              <p style="color: #1B1B1B; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1.1rem;"><strong style="display: flex; align-items: center; gap: 6px;">${renderIconSVG('insight', 20, '#DCA54A')} Pro Tip:</strong> Consider your growth plans when choosing. You can always upgrade later!</p>
              <div style="margin-bottom: 20px;">
                <a href="/compare" style="background: linear-gradient(135deg, #DCA54A, #C4923D); color: #1B1B1B; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(220, 165, 74, 0.4);">
                  <span style="display: inline-flex; align-items: center;">${renderIconSVG('chart', 20, '#1B1B1B')}</span> Compare All Processors Side-by-Side
                </a>
              </div>
              <div style="margin-bottom: 15px;">
                <a href="https://calendly.com/themerchantguide-info/30min" target="_blank" style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 1rem; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);">
                  📅 Get Expert Guidance - Free 15min Call
                </a>
              </div>
              <p style="color: #4A4A32; font-size: 1rem;">Contact processors directly for custom quotes, or <a href="mailto:info@themerchantguide.com" style="color: #DCA54A; font-weight: 600; text-decoration: none;">email us</a> for personalized guidance.</p>
            </div>
          </div>
        `;
      }
    };

    const cleanupFloating = setupFloatingButton();
    setupForm();

    // Cleanup on unmount
    return () => {
      if (cleanupFloating) cleanupFloating();
    };
  }, []);

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-header">
          <Link href="/" className="nav-logo">
            <img src="/images/logo_removedbg.png" alt="The Merchant Guide Logo" />
            <h2 className="nav-title">
              The <span className="nav-title-highlight">Merchant</span> Guide
            </h2>
          </Link>
          <div className="nav-menu">
            <Link href="/" className="active">
              Home
            </Link>
            <a href="/blog">Blog</a>
            <a href="/podcast">Podcast</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Say Goodbye to Payment Stress—
          <br />
          <span className="highlight">Simple</span> Payment Solutions Start Here
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            margin: '20px auto 40px',
            maxWidth: '600px',
            flexWrap: 'wrap',
          }}
        >
          <img
            src="/images/logo_removedbg.png"
            alt="Guide"
            style={{ height: '24px', width: 'auto', opacity: 0.9, flexShrink: 0 }}
          />
          <p
            style={{
              fontSize: '1.25rem',
              color: '#FAF5E5',
              margin: 0,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              textAlign: 'center',
              flex: 1,
              minWidth: '280px',
            }}
          >
            Find the perfect payment processor for your business in minutes, not weeks.
          </p>
        </div>
        <button
          onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'var(--bg-gradient-primary)',
            color: 'var(--text-on-golden)',
            padding: '20px 40px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(220, 165, 74, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(220, 165, 74, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 165, 74, 0.4)';
          }}
        >
          Find My Perfect Processor →
        </button>
      </section>

      {/* Processor Tool Section */}
      <section className="section" id="quiz">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2
              style={{
                color: '#1B1B1B',
                marginBottom: '15px',
                fontSize: '2rem',
                fontWeight: '700',
              }}
            >
              Find Your Perfect Payment Processor
            </h2>
            <p style={{ color: '#4A4A32', fontSize: '1.1rem', lineHeight: '1.5' }}>
              Answer a few quick questions and get personalized recommendations tailored to your
              business needs
            </p>
          </div>

          <form id="processorForm">
            <div className="form-group">
              <label
                htmlFor="business_type"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('business', 18, '#1B1B1B') }}
                ></span>
                What type of business do you run?
              </label>
              <select id="business_type" name="business_type" required>
                <option value="">Choose your business type</option>
                <optgroup label="Retail & Physical">
                  <option value="retail">General Retail Store</option>
                  <option value="grocery">Grocery Store/Market</option>
                  <option value="fashion">Fashion/Clothing Store</option>
                  <option value="electronics">Electronics Store</option>
                  <option value="auto">Auto Sales/Parts</option>
                </optgroup>
                <optgroup label="Food & Beverage">
                  <option value="restaurant">Restaurant/Dining</option>
                  <option value="cafe">Coffee Shop/Cafe</option>
                  <option value="bar">Bar/Nightclub</option>
                  <option value="food_truck">Food Truck</option>
                  <option value="catering">Catering Service</option>
                </optgroup>
                <optgroup label="Online & Digital">
                  <option value="online">E-commerce/Online Store</option>
                  <option value="saas">Software/SaaS</option>
                  <option value="digital">Digital Services</option>
                  <option value="subscription">Subscription Business</option>
                </optgroup>
                <optgroup label="Services">
                  <option value="service">Professional Services</option>
                  <option value="healthcare">Healthcare/Medical</option>
                  <option value="fitness">Fitness/Wellness</option>
                  <option value="beauty">Beauty/Salon</option>
                  <option value="education">Education/Training</option>
                  <option value="nonprofit">Non-profit Organization</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="multi_location">Multiple Locations</option>
                  <option value="marketplace">Marketplace/Platform</option>
                  <option value="other">Other</option>
                </optgroup>
              </select>
            </div>

            <div className="input-group">
              <div className="form-group">
                <label
                  htmlFor="monthly_volume"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: renderIconSVG('money', 18, '#1B1B1B') }}
                  ></span>
                  Monthly Sales Volume
                </label>
                <select id="monthly_volume" name="monthly_volume" required>
                  <option value="">Select range</option>
                  <option value="2500">Under $5K/month</option>
                  <option value="7500">$5K - $10K/month</option>
                  <option value="15000">$10K - $20K/month</option>
                  <option value="35000">$20K - $50K/month</option>
                  <option value="75000">$50K+ /month</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="payment_environment"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: renderIconSVG('location', 18, '#1B1B1B') }}
                  ></span>
                  Where do you sell?
                </label>
                <select id="payment_environment" name="payment_environment" required>
                  <option value="">Choose location</option>
                  <option value="in_person_only">In-person only</option>
                  <option value="online_only">Online only</option>
                  <option value="both_equal">Both online & in-person</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="budget_priority"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: renderIconSVG('target', 18, '#1B1B1B') }}
                ></span>
                What matters most to you?
              </label>
              <select id="budget_priority" name="budget_priority" required>
                <option value="">Select priority</option>
                <option value="lowest_total_cost">Lowest fees possible</option>
                <option value="no_monthly_fees">No monthly fees</option>
                <option value="easy_setup">Easy setup & support</option>
                <option value="advanced_features">Advanced features & tools</option>
              </select>
            </div>

            <button type="submit" className="button" style={{ marginTop: '10px' }}>
              Get My Personalized Recommendations →
            </button>
          </form>

          <div className="loading">
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: renderIconSVG('chart', 18, '#DCA54A') }}
              ></span>
              Finding the best processors for your business...
            </p>
          </div>

          <div className="error">
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
              Please fill in all fields to get recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="results" id="results">
        <h2
          style={{
            marginBottom: '20px',
            color: '#F5F5DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: renderIconSVG('target', 24, '#DCA54A') }}></span>
          Your Top Recommendations
        </h2>
      </div>
    </div>
  );
}
