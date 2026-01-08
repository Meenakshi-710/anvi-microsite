import { useState, useEffect, useMemo } from 'react';
import Accordion from './Accordion';
import { COUNTRIES } from '../constants/countries';
import { saveFieldSuggestion, getFieldSuggestions } from '../utils/form-utils';
import { submitToGoogleSheets } from '../utils/google-sheets';


interface RequestInviteProps {
  isOpen?: boolean;
  onToggle?: () => void;
  hasSelectedSessions?: boolean;
  onSelectRoundtables?: () => void;
}

export default function RequestInvite({ isOpen, onToggle, hasSelectedSessions = false, onSelectRoundtables }: RequestInviteProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);



  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});

  // Single state to track which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = (name: string) => {
    if (activeDropdown !== name) {
      setSearchQuery('');
    }
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredDialCodes = useMemo(() => {
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dial_code.includes(searchQuery)
    );
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (activeDropdown && !target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Clear form when closed
  useEffect(() => {
    if (!isOpen) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setOrganisation('');
      setWhatsapp('');
      setCountry('');
      setRole('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // Load suggestions on mount
  useEffect(() => {
    if (isOpen) {
      const fields = ['firstName', 'lastName', 'email', 'organisation', 'whatsapp'];
      const loadedSuggestions: Record<string, string[]> = {};
      fields.forEach(f => {
        loadedSuggestions[f] = getFieldSuggestions(f);
      });
      setSuggestions(loadedSuggestions);
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (!hasSelectedSessions) {
      if (onSelectRoundtables) {
        onSelectRoundtables();
      }
      return;
    }

    setIsSubmitting(true);
    // Save suggestions
    saveFieldSuggestion('firstName', firstName);
    saveFieldSuggestion('lastName', lastName);
    saveFieldSuggestion('email', email);
    saveFieldSuggestion('organisation', organisation);
    saveFieldSuggestion('whatsapp', whatsapp);

    try {
      await submitToGoogleSheets({
        formType: 'Request Invite',
        firstName,
        lastName,
        email,
        organisation,
        countryCode,
        whatsapp,
        country,
        role
      });

      setIsSubmitted(true);
      // Reset form fields after submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setOrganisation('');
      setWhatsapp('');
      setCountry('');
      setRole('');
    } catch (error) {

      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <Accordion title="Request an Invite" isOpen={isOpen} onToggle={onToggle}>
        <div className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#7921B1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-[20px] font-bold text-black font-noto-sans">Request Received</h3>
          <p className="text-[#897e7e] text-[15px] leading-[24px]">
            Thank you for your interest in ANVI. Our team personally reviews each application and will reach out with the next steps soon.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-[#7921B1] font-semibold text-[14px] hover:underline"
          >
            Submit another request
          </button>
        </div>
      </Accordion>
    );
  }

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
              autoComplete="given-name"
              list="firstName-suggestions"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your First Name"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
            <datalist id="firstName-suggestions">
              {suggestions.firstName?.map(s => <option key={s} value={s} />)}
            </datalist>
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
              autoComplete="family-name"
              list="lastName-suggestions"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your Last name"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
            <datalist id="lastName-suggestions">
              {suggestions.lastName?.map(s => <option key={s} value={s} />)}
            </datalist>
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
              autoComplete="email"
              list="email-suggestions"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@company.com"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
            <datalist id="email-suggestions">
              {suggestions.email?.map(s => <option key={s} value={s} />)}
            </datalist>
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              WhatsApp
            </label>
            <div className="flex gap-4">
              <div className="relative w-24 dropdown-container">
                <button
                  type="button"
                  onClick={() => toggleDropdown('countryCode')}
                  className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
                >
                  <span className="text-black">{countryCode}</span>
                  <svg
                    className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${activeDropdown === 'countryCode' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'countryCode' && (
                  <div className="absolute z-50 left-0 mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 w-[240px] max-h-60 overflow-y-auto custom-scrollbar">
                    <div className="px-3 pb-2 sticky top-0 bg-white">
                      <input
                        type="text"
                        placeholder="Search code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-2 py-1.5 text-[14px] border border-gray-100 focus:outline-none focus:border-[#7921B1] font-noto-sans"
                        autoFocus
                      />
                    </div>
                    {filteredDialCodes.map((c, idx) => (
                      <button
                        key={`${c.dial_code}-${idx}`}
                        type="button"
                        onClick={() => {
                          setCountryCode(c.dial_code);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[14px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans flex justify-between gap-2"
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-gray-400 shrink-0">{c.dial_code}</span>
                      </button>
                    ))}
                    {filteredDialCodes.length === 0 && (
                      <div className="px-4 py-2 text-[13px] text-gray-400">No results found</div>
                    )}
                  </div>
                )}
                <input type="hidden" name="countryCode" value={countryCode} />
              </div>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                autoComplete="tel-national"
                list="whatsapp-suggestions"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Enter your number"
                className="flex-1 py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
                required
              />
              <datalist id="whatsapp-suggestions">
                {suggestions.whatsapp?.map(s => <option key={s} value={s} />)}
              </datalist>
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
              autoComplete="organization"
              list="organisation-suggestions"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              placeholder="Enter your Organisation"
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black placeholder-[#897e7e] rounded-none"
              required
            />
            <datalist id="organisation-suggestions">
              {suggestions.organisation?.map(s => <option key={s} value={s} />)}
            </datalist>
          </div>

          {/* Country */}
          <div className="relative dropdown-container">
            <label htmlFor="country" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Country
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown('country')}
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
            >
              <span className={country ? 'text-black' : 'text-gray-500'}>
                {country || 'Select one'}
              </span>
              <svg
                className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${activeDropdown === 'country' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === 'country' && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                <div className="px-4 pb-2 sticky top-0 bg-white">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-[14px] border border-gray-100 focus:outline-none focus:border-[#7921B1] font-noto-sans"
                    autoFocus
                  />
                </div>
                {filteredCountries.map((c, idx) => (
                  <button
                    key={`${c.name}-${idx}`}
                    type="button"
                    onClick={() => {
                      setCountry(c.name);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                  >
                    {c.name}
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-4 py-3 text-[15px] text-gray-400">No results found</div>
                )}
              </div>
            )}
            <input type="hidden" name="country" value={country} />
          </div>

          {/* Role / Designation */}
          <div className="relative dropdown-container">
            <label htmlFor="role" className="block text-[13px] font-semibold text-black mb-2 font-noto-sans">
              Role / Designation
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown('role')}
              className="w-full py-3 text-[16px] border-b border-gray-200 focus:outline-none focus:border-black bg-white text-left flex items-center justify-between"
            >
              <span className={role ? 'text-black' : 'text-gray-500'}>
                {role || 'Select one'}
              </span>
              <svg
                className={`w-3 h-3 text-[#9CA3AF] transform transition-transform ${activeDropdown === 'role' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === 'role' && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                {[
                  'Founder / Co-Founder',
                  'CEO / Managing Director',
                  'Board Member / Investor',
                  'Partner (VC / PE / Fund / Firm)',
                  'CXO (CFO / CIO / CTO / COO / CRO)',
                  'Senior Government Official',
                  'Regulator / Policy Maker',
                  'Banker / Financial Institution Leader',
                  'Commodity / Trade Finance Professional',
                  'Technology / AI Leader',
                  'Academic / Researcher',
                  'Advisor / Consultant',
                  'Media / Journalist',
                  'Other'
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setRole(option);
                      setActiveDropdown(null);
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
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`text-white text-[15px] font-semibold transition-colors w-full h-[54px] flex items-center justify-center bg-[#7921B1] hover:bg-[#6a1d9b] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                hasSelectedSessions ? 'Submit your Request' : 'Select Round Tables from Program'
              )}
            </button>

          </div>

          {/* Footer text */}
          <p className="text-gray-400 text-[12px] text-center">
            Our team reviews each application personally
          </p>
        </form>
      </div>

      {/* Injected Style for Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </Accordion>
  );
}
