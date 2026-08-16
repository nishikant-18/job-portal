import React from 'react';

/**
 * Pure Text-Based SaaS Logo for HireGram
 * Clean, high-impact typographic branding without standalone icon graphics.
 */
export const HireGramLogo = ({
  size = "text-2xl",
  showBadge = false,
  badgeText = "PRO",
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none font-sans ${className}`}>
      {/* Main Text Logo */}
      <span className={`${size} font-black tracking-tight leading-none text-slate-900 dark:text-white`}>
        Hire
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Gram
        </span>
        <span className="text-indigo-500 inline-block transform translate-x-0.5">.</span>
      </span>

      {/* Optional SaaS Version / Plan Badge */}
      {showBadge && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 border border-indigo-500/20">
          {badgeText}
        </span>
      )}
    </div>
  );
};

export const HireGramLogoWithText = HireGramLogo;

