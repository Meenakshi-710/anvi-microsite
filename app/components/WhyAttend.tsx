'use client';

import { useState } from 'react';

interface WhyAttendProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function WhyAttend({ isOpen = true, onToggle }: WhyAttendProps) {
  return (
    <div className="border-b border-[#7921B1]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left active:opacity-80 transition-opacity h-auto"
        aria-label={isOpen ? 'Collapse' : 'Expand'}
      >
        <h2 className={`${isOpen ? 'text-[26px] font-semibold' : 'text-[16px] font-regular'} text-black flex-1 pr-2`}>
          Why attend
        </h2>
        <span className="text-[#7921B1] text-2xl font-light min-w-[44px] flex items-center justify-end">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="pb-6">
          <p className="text-[#897e7e] text-[15px] leading-[28.9px]">
            The future of finance will not be announced. It will be quietly designed by those in the room. ARTHA SUTRA convenes capital, policy, and technology leaders to rethink how trade, assets, and trust flow in a post-bank, post-border world.
          </p>
        </div>
      )}
    </div>
  );
}
