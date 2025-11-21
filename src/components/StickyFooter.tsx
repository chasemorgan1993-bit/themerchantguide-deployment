'use client';

export default function StickyFooter() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #1B1B1B 0%, #2D2D2D 100%)',
        borderTop: '3px solid #DCA54A',
        padding: '15px 20px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {/* Text Section */}
      <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
        <div
          style={{
            color: '#DCA54A',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '4px',
          }}
        >
          💬 Have Questions?
        </div>
        <div style={{ color: '#E8E8E8', fontSize: '0.9rem' }}>
          Not sure which processor is right? Book a free consultation with a payment expert.
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <a
          href="https://calendly.com/themerchantguide-info/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';
          }}
        >
          📅 Schedule Free Call
        </a>

        <a
          href="mailto:info@themerchantguide.com"
          style={{
            background: 'transparent',
            color: '#DCA54A',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid #DCA54A',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#DCA54A';
            e.currentTarget.style.color = '#1B1B1B';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#DCA54A';
          }}
        >
          📧 Email Us
        </a>
      </div>
    </div>
  );
}
