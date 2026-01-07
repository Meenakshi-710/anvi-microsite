'use client';

import { useState } from 'react';
import Accordion from './Accordion';

interface RequestInviteProps {
  isOpen?: boolean;
  onToggle?: () => void;
  hasSelectedSessions?: boolean;
}

export default function RequestInvite({ isOpen, onToggle, hasSelectedSessions = false }: RequestInviteProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [role, setRole] = useState('');

  return (
    <Accordion title="Request an Invite" isOpen={isOpen} onToggle={onToggle}>
      <div className="space-y-4 p-2 ">
        {/* Intro text with light blue border */}
        <p className="text-[#897e7e] text-[15px] leading-[24px]">
          Complete the form and our team will reach out with the next steps.
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your First Name"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your Last name"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
          </div>

          {/* Work Email */}
          <div>
            <label htmlFor="workEmail" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Work Email
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              placeholder="your.email@company.com"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
          </div>

          {/* WhatsApp */}
          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              WhatsApp
            </label>
            <div className="flex gap-4">
              <div className="relative w-24">
                <button
                  type="button"
                  onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                  className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
                >
                  <span className="text-black">{countryCode}</span>
                  <svg
                    className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${isCountryCodeOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCountryCodeOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2">
                    {['+91', '+1', '+44'].map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setCountryCode(code);
                          setIsCountryCodeOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                )}
                <input type="hidden" name="countryCode" value={countryCode} />
              </div>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                placeholder="Enter your number"
                className="flex-1 py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
                required
              />
            </div>
          </div>

          {/* Organisation */}
          <div>
            <label htmlFor="organisation" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              defaultValue="WEF"
              className="w-full py-3 text-[16px] text-[#897e7e] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
          </div>

          {/* Country */}
          {/* Country */}
          <div className="relative">
            <label htmlFor="country" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Country
            </label>
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
            >
              <span className={country ? 'text-black' : 'text-gray-500'}>
                {country || 'Select one'}
              </span>
              <svg
                className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCountryOpen && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 max-h-60 overflow-y-auto">
                {['India', 'United States', 'United Kingdom'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCountry(c);
                      setIsCountryOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <input type="hidden" name="country" value={country} />
          </div>

          {/* Role / Designation */}
          {/* Role / Designation */}
          <div className="relative">
            <label htmlFor="role" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Role / Designation
            </label>
            <button
              type="button"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
            >
              <span className={role ? 'text-black' : 'text-gray-500'}>
                {role || 'Select one'}
              </span>
              <svg
                className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${isRoleOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isRoleOpen && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2">
                {[
                  'Minister / Secretry',
                  'Regulator / Central Bank Representative / Policy Advisor',
                  'Founder / Managing Partner',
                  'General Partner (GP) / Limited Partner (LP)',
                  'Family Office Representative',
                  'Senior Leadership (CXO / Board Member / MD / EVP / SVP)',
                  'CTO / Chief Architect',
                  'Development Finance / Grant Agencies Representative',
                  'Policy Think Tank Member / Academic / Researcher',
                  'Other'
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setRole(option);
                      setIsRoleOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            <input type="hidden" name="role" value={role} />
          </div>

          {/* Button section with overlapping circular button */}
          <div className="flex">
            <button
              type="button"
              disabled={!hasSelectedSessions}
              className={`text-white text-[15px] font-semibold transition-colors w-full h-[54px] flex items-center justify-center ${hasSelectedSessions ? 'bg-[#7921B1]' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {hasSelectedSessions ? 'Select events from program' : 'Select roundtables from program'}
            </button>
          </div>

          {/* Footer text */}
          <p className="text-gray-400 text-[12px] text-center">
            Our team reviews each application personally
          </p>
        </form>
      </div>
    </Accordion>
  );
}
