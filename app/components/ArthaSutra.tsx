'use client';

import { useState } from 'react';

interface ArthaSutraProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onRequestInvite?: () => void;
  onRequestDialogue?: () => void;
}

export default function ArthaSutra({ isOpen = true, onToggle, onRequestInvite, onRequestDialogue }: ArthaSutraProps) {
  return (
    <div className="border-b border-purple-600">
      <div className="flex items-center justify-between">
        <h1 className="text-[#7B2CBF] text-[19px] font-semibold font-helvetica leading-[14.9px]">
          ARTHA SUTRA
        </h1>
        <button
          onClick={onToggle}
          className="text-[#7921B1] text-2xl font-light active:opacity-80 transition-opacity min-w-[44px] h-auto flex items-center justify-end"
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      <div className="pb-2 space-y-2">
        <p className="text-[#7B2CBF] text-[10px] leading-[8px] font-bold">
          DIALOGUES FOR A NEW ECONOMIC OPERATING SYSTEM
        </p>
        <p className="text-[#7B2CBF] text-[10px] leading-[6.8px] font-regular">
          2026 THEME: BEYOND BANKS. BEYOND BORDERS.
        </p>
      </div>

      {isOpen && (
        <div className="pb-6 space-y-2">
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
  );
}
