'use client';

import { X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DialogueRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function DialogueRequestForm({ isOpen, onClose, onSubmit }: DialogueRequestFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [titleRole, setTitleRole] = useState('');
    const [country, setCountry] = useState('');
    const [whoAreYou, setWhoAreYou] = useState('');
    const [discussionTopics, setDiscussionTopics] = useState<string[]>([]);
    const [preferredTrack, setPreferredTrack] = useState('');
    const [primaryObjective, setPrimaryObjective] = useState('');
    const [openTo, setOpenTo] = useState<string[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timePreference, setTimePreference] = useState('');

    // Single state to track which dropdown is currently open
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

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

    const rolesList = [
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
    ];

    const toggleCheckbox = (list: string[], setList: (val: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const isFormEmpty = !firstName.trim() &&
        !lastName.trim() &&
        !organisation.trim() &&
        !titleRole &&
        !country &&
        !email.trim() &&
        !phoneNumber.trim() &&
        !whoAreYou &&
        discussionTopics.length === 0 &&
        !preferredTrack &&
        !primaryObjective.trim() &&
        openTo.length === 0 &&
        availableDates.length === 0 &&
        !timePreference;

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[57px] bg-black/50 overflow-hidden"
            onClick={onClose}
        >
            <div
                className="relative w-[calc(100%-48px)] max-w-[420px] bg-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col h-[calc(100vh-57px)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Close Button */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="text-[#333333] hover:text-black transition-colors"
                        aria-label="Close form"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 pt-12 custom-scrollbar" onScroll={() => setActiveDropdown(null)}>
                    <h2 className="text-[#000000] text-[28px] font-semibold leading-[36px] font-noto-sans mb-8">
                        Dialogue Request Form
                    </h2>

                    <form className="space-y-8 pb-10">
                        {/* Section: Identity */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase leading-[20px]">Identity</h3>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Full Name *</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your First Name"
                                    className="w-full h-[44px] border border-[#E4E4E7] px-4 text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Last Name *</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your Last Name"
                                    className="w-full h-[44px] border border-[#E4E4E7] px-4 text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Organisation *</label>
                                <input
                                    type="text"
                                    value={organisation}
                                    onChange={(e) => setOrganisation(e.target.value)}
                                    placeholder="WEF"
                                    className="w-full h-[44px] border border-[#E4E4E7] px-4 text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Title / Role *</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('titleRole')}
                                        className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
                                    >
                                        <span className={titleRole ? 'text-black' : 'text-[#ADADAD]'}>
                                            {titleRole || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'titleRole' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'titleRole' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 max-h-60 overflow-y-auto">
                                            {rolesList.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setTitleRole(option);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Country *</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('country')}
                                        className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
                                    >
                                        <span className={country ? 'text-black' : 'text-[#ADADAD]'}>
                                            {country || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'country' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'country' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 max-h-60 overflow-y-auto">
                                            {['India', 'United States', 'United Kingdom', 'Switzerland', 'UAE'].map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => {
                                                        setCountry(c);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Email *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-[44px] border border-[#E4E4E7] px-4 text-[13px] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">WhatsApp / Mobile *</label>
                                <div className="flex gap-2 mt-2">
                                    <div className="relative min-w-[80px] dropdown-container">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('countryCode')}
                                            className="w-full h-[44px] border border-[#E4E4E7] px-3 text-[13px] bg-white text-left flex items-center justify-center gap-1 focus:border-[#7921B1] outline-none"
                                        >
                                            <span className="text-black">{countryCode}</span>
                                            <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'countryCode' ? 'rotate-180' : ''}`} size={14} />
                                        </button>
                                        {activeDropdown === 'countryCode' && (
                                            <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2">
                                                {['+91', '+1', '+44', '+41', '+971'].map((code) => (
                                                    <button
                                                        key={code}
                                                        type="button"
                                                        onClick={() => {
                                                            setCountryCode(code);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                                                    >
                                                        {code}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your number"
                                        className="flex-1 h-[44px] border border-[#E4E4E7] px-4 text-[13px] font-noto-sans placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Dialogue Context */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Dialogue Context</h3>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Who are you?</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('whoAreYou')}
                                        className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                    >
                                        <span className={whoAreYou ? 'text-black' : 'text-[#ADADAD]'}>
                                            {whoAreYou || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'whoAreYou' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'whoAreYou' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 max-h-60 overflow-y-auto font-noto-sans">
                                            {rolesList.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setWhoAreYou(option);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333] block">What would you like to discuss?</label>
                                <div className="space-y-3">
                                    {[
                                        'AI-powered Financial Inclusion',
                                        'Digital Public Infrastructure (DPI)',
                                        'Trade Finance & Commodities',
                                        'Tokenization & RWA',
                                        'DeFi & Liquidity Structures',
                                        'Inclusion Pilots (India / Global South)',
                                        'Policy & Regulatory Collaboration',
                                        'Strategic Partnership',
                                        'Other'
                                    ].map((item) => (
                                        <label key={item} className="flex items-start gap-3 group cursor-pointer">
                                            <div className="relative flex items-center mt-1">
                                                <input
                                                    type="checkbox"
                                                    checked={discussionTopics.includes(item)}
                                                    onChange={() => toggleCheckbox(discussionTopics, setDiscussionTopics, item)}
                                                    className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-[#333333] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Preferred Track</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('preferredTrack')}
                                        className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                    >
                                        <span className={preferredTrack ? 'text-black' : 'text-[#ADADAD]'}>
                                            {preferredTrack || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'preferredTrack' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'preferredTrack' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 font-noto-sans">
                                            {['ANVI India', 'ANVI Global', 'Both'].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setPreferredTrack(option);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Intent */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold uppercase tracking-wider font-noto-sans">Intent</h3>

                            <div className="space-y-4">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333] block">Primary Objective</label>
                                <div className="space-y-2">
                                    <textarea
                                        value={primaryObjective}
                                        onChange={(e) => setPrimaryObjective(e.target.value)}
                                        placeholder="E.g., Exploring Investment Opportunities, Exploring partnership on inclusion pilots, Discussing trade finance capital structures..."
                                        className="w-full h-[120px] border border-[#E4E4E7] p-4 text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none resize-none"
                                    ></textarea>
                                    <div className="flex justify-between">
                                        <span className="text-[13px] font-noto-sans text-[#ADADAD] block">{primaryObjective.length}/300 characters</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333] block">Are you open to:</label>
                                <div className="space-y-3 font-noto-sans">
                                    {[
                                        '1:1 dialogue',
                                        'Small roundtable (4-6 people)',
                                        'Bilateral meeting with ANVI leadership'
                                    ].map((item) => (
                                        <label key={item} className="flex items-start gap-3 group cursor-pointer">
                                            <div className="relative flex items-center mt-1">
                                                <input
                                                    type="checkbox"
                                                    checked={openTo.includes(item)}
                                                    onChange={() => toggleCheckbox(openTo, setOpenTo, item)}
                                                    className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-[#333333]">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section: Availability */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold uppercase font-noto-sans">Availability</h3>

                            <div className="space-y-4">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333] block">Available dates</label>
                                <div className="space-y-3">
                                    {[
                                        'January 19',
                                        'January 20',
                                        'January 21',
                                        'January 22',
                                        'January 23'
                                    ].map((item) => (
                                        <label key={item} className="flex items-start gap-3 group cursor-pointer">
                                            <div className="relative flex items-center mt-1">
                                                <input
                                                    type="checkbox"
                                                    checked={availableDates.includes(item)}
                                                    onChange={() => toggleCheckbox(availableDates, setAvailableDates, item)}
                                                    className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] font-noto-sans text-[#333333]">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Time preference</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('timePreference')}
                                        className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[14px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                    >
                                        <span className={timePreference ? 'text-black' : 'text-[#ADADAD]'}>
                                            {timePreference || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'timePreference' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'timePreference' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 font-noto-sans mb-10">
                                            {['Morning', 'Lunch', 'Afternoon', 'Evening'].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setTimePreference(option);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isFormEmpty}
                            className={`w-full h-[54px] text-white flex justify-center items-center text-[16px] font-semibold font-noto-sans transition-colors ${isFormEmpty
                                ? 'bg-[#E4E4E7] text-[#ADADAD] cursor-not-allowed'
                                : 'bg-[#7921B1] hover:bg-[#621B91]'
                                }`}
                            onClick={() => {
                                // Logic for submit can be added here
                                onSubmit();
                            }}
                        >
                            Submit Dialogue Request
                        </button>
                    </form>
                </div>
            </div>

            {/* Injected Style for Scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E4E4E7;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D1D1D6;
                }
            `}</style>
        </div>
    );
}
