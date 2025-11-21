'use client';

export default function ConsultantBio() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-6 md:p-8">
      {/* About Section */}
      <div
        className="bg-gradient-to-br from-golden-50 to-cream-50 rounded-2xl p-6 md:p-10 border-2 border-golden-300 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #F4E4BC 0%, #FAF5E5 100%)',
          borderColor: '#DCA54A',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1B1B1B' }}>
            Your Payment Processing Consultant
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#4A4A32' }}>
            Specializing in helping small businesses save money and streamline payments
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-2">✓</div>
            <div className="font-bold text-sm md:text-base mb-1" style={{ color: '#1B1B1B' }}>
              Licensed Consultant
            </div>
            <p className="text-xs md:text-sm" style={{ color: '#4A4A32' }}>
              5+ years helping small businesses
            </p>
          </div>

          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-bold text-sm md:text-base mb-1" style={{ color: '#1B1B1B' }}>
              Save 30-50%
            </div>
            <p className="text-xs md:text-sm" style={{ color: '#4A4A32' }}>
              Average fee reduction for clients
            </p>
          </div>

          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-2">🤝</div>
            <div className="font-bold text-sm md:text-base mb-1" style={{ color: '#1B1B1B' }}>
              100+ Businesses Served
            </div>
            <p className="text-xs md:text-sm" style={{ color: '#4A4A32' }}>
              Trusted by local businesses
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h3
            className="text-lg md:text-xl font-bold mb-4 text-center"
            style={{ color: '#1B1B1B' }}
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #DCA54A, #C4923D)' }}
              >
                1
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1B1B1B' }}>
                Take the Quiz
              </p>
              <p className="text-xs" style={{ color: '#4A4A32' }}>
                2-minute assessment
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #DCA54A, #C4923D)' }}
              >
                2
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1B1B1B' }}>
                Review Matches
              </p>
              <p className="text-xs" style={{ color: '#4A4A32' }}>
                Personalized recommendations
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #DCA54A, #C4923D)' }}
              >
                3
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1B1B1B' }}>
                Free Consultation
              </p>
              <p className="text-xs" style={{ color: '#4A4A32' }}>
                No obligation call
              </p>
            </div>

            <div>
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #DCA54A, #C4923D)' }}
              >
                4
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1B1B1B' }}>
                Get Custom Rates
              </p>
              <p className="text-xs" style={{ color: '#4A4A32' }}>
                Setup & ongoing support
              </p>
            </div>
          </div>
        </div>

        {/* Why Use a Consultant */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3
            className="text-lg md:text-xl font-bold mb-4 text-center"
            style={{ color: '#1B1B1B' }}
          >
            Why Use a Payment Processing Consultant?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B1B1B' }}>
                  Unbiased Recommendations
                </p>
                <p className="text-xs" style={{ color: '#4A4A32' }}>
                  Not tied to one processor - find the best fit for YOU
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B1B1B' }}>
                  Custom Rate Negotiations
                </p>
                <p className="text-xs" style={{ color: '#4A4A32' }}>
                  Leverage industry relationships for better pricing
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B1B1B' }}>
                  Access to 24+ POS Integrations
                </p>
                <p className="text-xs" style={{ color: '#4A4A32' }}>
                  Work with your existing systems - no need to start over
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B1B1B' }}>
                  Ongoing Support
                </p>
                <p className="text-xs" style={{ color: '#4A4A32' }}>
                  Help after setup - not just a one-time sale
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://calendly.com/themerchantguide-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl no-underline"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
            }}
          >
            📅 Schedule Your Free Consultation
          </a>
          <p className="text-xs md:text-sm mt-3" style={{ color: '#4A4A32' }}>
            No obligation • Takes 15 minutes • Get answers to all your questions
          </p>
        </div>
      </div>
    </div>
  );
}
