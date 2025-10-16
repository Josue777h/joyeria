// Tailwind CDN configuration (must load before https://cdn.tailwindcss.com)
(function(){
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          ebony: '#1C1B1B',
          brown: '#3C2F25',
          goldBright: '#D4AF37',
          goldSoft: '#E8C67C',
          ivory: '#F7F3E9'
        },
        fontFamily: {
          display: ['Playfair Display', 'serif'],
          sans: ['Inter', 'ui-sans-serif', 'system-ui']
        },
        boxShadow: {
          glow: '0 0 0 2px rgba(212,175,55,0.25), 0 8px 32px rgba(0,0,0,0.45)'
        }
      }
    }
  };
})();
