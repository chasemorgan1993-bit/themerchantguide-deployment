'use client';

export default function StickyFooter() {
  return (
    <div
      className="p-3 md:p-4"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #1B1B1B 0%, #2D2D2D 100%)',
        borderTop: '3px solid #DCA54A',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Text Section */}
      <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
        <div
          className="text-sm md:text-lg font-bold mb-1"
          style={{
            color: '#DCA54A',
          }}
        >
          💬 Have Questions?
        </div>
        <div className="text-xs md:text-sm hidden md:block" style={{ color: '#E8E8E8' }}>
          Not sure which processor is right? Book a free consultation.
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2 md:gap-3 flex-wrap justify-center md:justify-end w-full md:w-auto">
        <a
          href="https://calendly.com/themerchantguide-info/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
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
          className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm"
          style={{
            background: 'transparent',
            color: '#DCA54A',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
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
