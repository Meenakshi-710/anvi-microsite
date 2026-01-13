'use client';

import Image from 'next/image';

interface ArthaSutraProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onRequestInvite?: () => void;
  onRequestDialogue?: () => void;
}

export default function ArthaSutra({ isOpen = true, onToggle, onRequestInvite, onRequestDialogue }: ArthaSutraProps) {
  return (
    <div className="border-b border-[#7921B1]">
      {/* Mobile View - Keep exactly as is */}
      <div className="md:hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left active:opacity-80 transition-opacity h-auto py-2"
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          <h1 className="text-[#7B2CBF] text-[19px] font-semibold font-helvetica leading-[14.9px]">
            ARTHA SUTRA
          </h1>
          <span className="text-[#7921B1] text-2xl font-light min-w-[44px] flex items-center justify-end">
            {isOpen ? '−' : '+'}
          </span>
        </button>



        {isOpen && (
          <div className="pb-6 space-y-2">
            <div className="pb-2 space-y-4">
              <p className="text-[#7B2CBF] text-[10px] leading-[8px] font-bold">
                DIALOGUES FOR A NEW ECONOMIC OPERATING SYSTEM
              </p>
              <p className="text-[#7B2CBF] text-[10px] leading-[6.8px] font-regular">
                2026 THEME: BEYOND BANKS. BEYOND BORDERS.
              </p>
            </div>
            <p className="text-[#897e7e] text-[16px] leading-[-0.62px] font-regular font-noto-sans">
              A private Davos-week leadership dialogue on designing an AI native new economic operating system where data becomes trust, inclusion becomes agency, and capital and commodities flow beyond traditional banks and borders.
            </p>

            <div className="pt-2">
              <h3 className="text-[#7B2CBF] text-[12px] font-semibold mb-3 font-noto-sans">EVENT DETAILS</h3>
              <p className="text-black font-bold text-[16px] mb-1 font-noto-sans">19 - 23 January 2026</p>
              <p className="text-[#7b7777] text-[15px] font-regular font-noto-sans">Davos Switzerland | Invite only</p>
            </div>

            <div className="flex flex-col gap-3 pt-3">
              <button
                onClick={onRequestInvite}
                className="bg-[#7B2CBF] text-white px-6 py-3.5 text-[17px] font-semibold transition-colors w-full h-auto"
              >
                Request an Invite
              </button>
              <button
                onClick={onRequestDialogue}
                className="bg-white border-[0.61px] border-gray-700 text-gray-600 px-6 py-3.5 text-[17px] font-semibold transition-colors w-full h-auto"
              >
                Request a Meeting
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop View - Two column layout */}
      <div className="hidden md:block relative">
        {/* Collapse button in top-right corner - improved alignment */}
        <button
          onClick={onToggle}
          className="absolute flex  justify-end top-4 right-0 z-10 text-[#7921B1] text-2xl font-light min-w-[44px] h-[44px] flex items-center justify-center active:opacity-80 transition-opacity"
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? '−' : '+'}
        </button>

        {isOpen && (
          <div className="flex justify-between lg:gap-20 py-8 lg:py-10 pl-8 lg:pl-16 pr-8 lg:pr-16 xl:pr-25">
            {/* Left Column - Content */}
            <div className="space-y-4 w-[40%]">
              <div>
                <h1 className="text-[#7B2CBF] text-[42px] font-bold font-helvetica mb-2">
                  ARTHA SUTRA
                </h1>
                <p className="text-[#7B2CBF] text-[15px] font-bold mb-1">
                  DIALOGUES FOR A NEW ECONOMIC OPERATING SYSTEM
                </p>
                <p className="text-[#7B2CBF] text-[15px] font-regular">
                  2026 THEME: BEYOND BANKS. BEYOND BORDERS.
                </p>
              </div>

              <p className="text-[#897e7e] text-[18px] leading-[32px] font-regular font-noto-sans mt-10">
                A private Davos-week leadership dialogue on designing an AI native new economic operating system where data becomes trust, inclusion becomes agency, and capital and commodities flow beyond traditional banks and borders.
              </p>

              <div className='mt-16 space-y-4'>
                <h3 className="text-[#7B2CBF] text-[12px] font-semibold font-noto-sans flex items-center">
                  <span className="w-2 h-2 bg-[#7B2CBF] rounded-full mr-2 font-bold"></span>
                  EVENT DETAILS
                </h3>
                <p className="text-black font-bold text-[18px] font-noto-sans">19 –23 January 2026</p>
                <p className="text-[#7b7777] text-[16px] font-regular font-noto-sans">Davos Switzerland | Invite only</p>
              </div>

              <div className="flex flex-col gap-6 mt-10  max-w-md">
                <button
                  onClick={onRequestInvite}
                  className="bg-[#7B2CBF] text-[18px] text-white px-6 py-3.5 text-base font-semibold transition-colors w-full hover:bg-[#6a1fa0]"
                >
                  Request an Invite
                </button>
                <button
                  onClick={onRequestDialogue}
                  className="bg-white border border-gray-700 text-gray-600 text-[18px] px-6 py-3.5 text-base font-semibold transition-colors w-full hover:bg-gray-50"
                >
                  Request a Meeting
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:w-[500px]  lg:h-[650px]">
              <Image
                src="/Container.svg"
                alt="Davos Switzerland mountain landscape"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Collapsed state for desktop */}
        {!isOpen && (
          <div className="py-4 pl-8 lg:pl-8">
            <h1 className="text-[#7B2CBF] text-[42px] font-bold font-helvetica mb-2">
              ARTHA SUTRA
            </h1>
            <p className="text-[#7B2CBF] text-[15px] font-bold mb-1">
              DIALOGUES FOR A NEW ECONOMIC OPERATING SYSTEM
            </p>
            <p className="text-[#7B2CBF] text-[15px] font-regular">
              2026 THEME: BEYOND BANKS. BEYOND BORDERS.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


