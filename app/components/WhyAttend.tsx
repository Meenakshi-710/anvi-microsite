'use client';

import Accordion from './Accordion';

interface WhyAttendProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function WhyAttend({ isOpen = true, onToggle }: WhyAttendProps) {
  return (
    <Accordion title="Why attend" isOpen={isOpen} onToggle={onToggle}>
      {/* Mobile View - Simple content */}
      <div className="md:hidden pb-6">
        <p className="text-[#897e7e] text-[15px] leading-[28.9px]">
          The future of finance will not be announced. It will be quietly designed by those in the room. ARTHA SUTRA convenes capital, policy, and technology leaders to rethink how trade, assets, and trust flow in a post-bank, post-border world.
        </p>
      </div>

      {/* Desktop View - Two column layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-12 lg:gap-16 pt-12 lg:py-20 pl-8 lg:pl-16 pr-8 lg:pr-16">
          {/* Left Column - Large Title */}
          <div>
            <h2 className="text-[48px] font-semibold text-black leading-tight">
              Why attend
            </h2>
          </div>

          {/* Right Column - Content */}
          <div className="flex items-start pt-2">
            <p className="text-[#4a4a4a] text-[16px] lg:text-[18px] leading-[28px] lg:leading-[30px]">
              The future of finance will not be announced. It will be quietly designed by those in the room. ARTHA SUTRA convenes capital, policy, and technology leaders to rethink how trade, assets, and trust flow in a post-bank, post-border world.
            </p>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

