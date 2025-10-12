// src/app/components/layout/header/navigation/actions/CtaAction.tsx
'use client';

const CtaAction = () => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-gray-900 font-semibold text-sm hover:bg-brand-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2"
      onClick={() => {
        // 👉 hier kun je evt. router.push('/offerte') doen
        console.log('Offerte aanvragen clicked');
      }}
    >

      
      <span>
        Offerte aanvragen</span>
      
      {/* Optional arrow icon */}
      <svg 
        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </button>
  );
};

export default CtaAction;