'use client';

import { X, ChevronDown, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { COUNTRIES } from '../constants/countries';
import { saveFieldSuggestion, getFieldSuggestions } from '../utils/form-utils';
import { submitToGoogleSheets } from '../utils/google-sheets';


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
    const [availabilityMappings, setAvailabilityMappings] = useState<Record<string, string>>({});
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

    const titlesList = [
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
    ];

    const identitiesList = [
        'Policy Maker / Government',
        'Regulator / Central Bank / Authority',
        'Bank / NBFC / Financial Institution',
        'Fintech / Digital Banking Platform',
        'Investor (VC / PE / Family Office / Fund)',
        'Commodity Trader / Producer',
        'Trade Finance / Supply Chain Finance',
        'DeFi / Web3 Infrastructure',
        'Technology / AI Platform',
        'Energy / Energy Transition',
        'Development Finance / Multilateral / DFI',
        'Academic / Think Tank',
        'Media / Press',
        'Other'
    ];

    const toggleCheckbox = (list: string[], setList: (val: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const isFormInvalid = !firstName.trim() ||
        !lastName.trim() ||
        !organisation.trim() ||
        !titleRole ||
        !country ||
        !email.trim() ||
        !phoneNumber.trim();

    // Clear form when closed
    useEffect(() => {
        if (!isOpen) {
            setFirstName('');
            setLastName('');
            setOrganisation('');
            setPhoneNumber('');
            setEmail('');
            setTitleRole('');
            setCountry('');
            setWhoAreYou('');
            setDiscussionTopics([]);
            setPreferredTrack('');
            setPrimaryObjective('');
            setOpenTo([]);
            setAvailabilityMappings({});
            setIsSubmitted(false);
        }
    }, [isOpen]);

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

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Save suggestions
        saveFieldSuggestion('firstName', firstName);
        saveFieldSuggestion('lastName', lastName);
        saveFieldSuggestion('email', email);
        saveFieldSuggestion('organisation', organisation);
        saveFieldSuggestion('whatsapp', phoneNumber);

        try {
            await submitToGoogleSheets({
                formType: 'Dialogue Request',
                firstName,
                lastName,
                email,
                organisation,
                countryCode,
                phoneNumber,
                country,
                titleRole,
                additionalDetails: {
                    whoAreYou,
                    discussionTopics,
                    preferredTrack,
                    primaryObjective,
                    openTo,
                    availabilityMappings
                }
            });
            setIsSubmitted(true);
            onSubmit();
        } catch (error) {

            console.error('Submission failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[57px] bg-black/50 overflow-hidden"
            onClick={onClose}
        >
            <div
                className="relative w-[calc(100%-48px)] max-w-[420px] bg-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col h-[calc(100dvh-70px)] mb-4"
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

                    <form className="space-y-8 pb-16">
                        {/* Section: Identity */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase leading-[20px]">Identity</h3>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Full Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="given-name"
                                    list="firstName-suggestions"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your First Name"
                                    className="w-full py-2 border-b border-[#E4E4E7] text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                                <datalist id="firstName-suggestions">
                                    {suggestions.firstName?.map(s => <option key={s} value={s} />)}
                                </datalist>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    list="lastName-suggestions"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your Last Name"
                                    className="w-full py-2 border-b border-[#E4E4E7] text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                                <datalist id="lastName-suggestions">
                                    {suggestions.lastName?.map(s => <option key={s} value={s} />)}
                                </datalist>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Organisation *</label>
                                <input
                                    type="text"
                                    id="organisation"
                                    name="organisation"
                                    autoComplete="organization"
                                    list="organisation-suggestions"
                                    value={organisation}
                                    onChange={(e) => setOrganisation(e.target.value)}
                                    placeholder="Enter your Organisation"
                                    className="w-full py-2 border-b border-[#E4E4E7] text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                                <datalist id="organisation-suggestions">
                                    {suggestions.organisation?.map(s => <option key={s} value={s} />)}
                                </datalist>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Title / Role *</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('titleRole')}
                                        className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
                                    >
                                        <span className={titleRole ? 'text-black' : 'text-[#ADADAD]'}>
                                            {titleRole || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'titleRole' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'titleRole' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                                            {titlesList.map((option) => (
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
                                        className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
                                    >
                                        <span className={country ? 'text-black' : 'text-[#ADADAD]'}>
                                            {country || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'country' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'country' && (
                                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                            <div className="px-4 pb-2 sticky top-0 bg-white">
                                                <div className="relative">
                                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search country..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full pl-8 pr-3 py-2 text-[14px] border border-gray-100 focus:outline-none focus:border-[#7921B1] font-noto-sans"
                                                        autoFocus
                                                    />
                                                </div>
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
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    list="email-suggestions"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-2 border-b border-[#E4E4E7] text-[13px] focus:border-[#7921B1] outline-none mt-2"
                                />
                                <datalist id="email-suggestions">
                                    {suggestions.email?.map(s => <option key={s} value={s} />)}
                                </datalist>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333]">WhatsApp / Mobile *</label>
                                <div className="flex gap-2 mt-2">
                                    <div className="relative min-w-[100px] dropdown-container">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('countryCode')}
                                            className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-center gap-1 focus:border-[#7921B1] outline-none"
                                        >
                                            <span className="text-black">{countryCode}</span>
                                            <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'countryCode' ? 'rotate-180' : ''}`} size={14} />
                                        </button>
                                        {activeDropdown === 'countryCode' && (
                                            <div className="absolute z-50 left-0 mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 w-[240px] max-h-60 overflow-y-auto custom-scrollbar">
                                                <div className="px-3 pb-2 sticky top-0 bg-white">
                                                    <div className="relative">
                                                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full pl-8 pr-2 py-1.5 text-[14px] border border-gray-100 focus:outline-none focus:border-[#7921B1] font-noto-sans"
                                                            autoFocus
                                                        />
                                                    </div>
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
                                    </div>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        autoComplete="tel-national"
                                        list="whatsapp-suggestions"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your number"
                                        className="flex-1 py-2 border-b border-[#E4E4E7] text-[13px] font-noto-sans placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none"
                                    />
                                    <datalist id="whatsapp-suggestions">
                                        {suggestions.whatsapp?.map(s => <option key={s} value={s} />)}
                                    </datalist>
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
                                        className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                    >
                                        <span className={whoAreYou ? 'text-black' : 'text-[#ADADAD]'}>
                                            {whoAreYou || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'whoAreYou' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'whoAreYou' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-[220px] overflow-y-auto custom-scrollbar font-noto-sans">
                                            {identitiesList.map((option) => (
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
                                        className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                    >
                                        <span className={preferredTrack ? 'text-black' : 'text-[#ADADAD]'}>
                                            {preferredTrack || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'preferredTrack' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'preferredTrack' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 font-noto-sans">
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
                                        className="w-full py-2 border-b border-[#E4E4E7] text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none resize-none min-h-[100px]"
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
                                <label className="text-[14px] font-semibold font-noto-sans text-[#333333] block">Available dates & time preference</label>
                                <div className="space-y-4">
                                    {[
                                        'January 19',
                                        'January 20',
                                        'January 21',
                                        'January 22',
                                        'January 23'
                                    ].map((date) => (
                                        <div key={date} className="flex items-center gap-4">
                                            <label className="flex items-center gap-3 group cursor-pointer min-w-[120px]">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!availabilityMappings[date]}
                                                        onChange={() => {
                                                            const newMappings = { ...availabilityMappings };
                                                            if (newMappings[date]) {
                                                                delete newMappings[date];
                                                            } else {
                                                                newMappings[date] = 'Select one';
                                                            }
                                                            setAvailabilityMappings(newMappings);
                                                        }}
                                                        className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                                    />
                                                    <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-[14px] font-noto-sans text-[#333333]">
                                                    {date === 'January 19' ? 'Jan 19' :
                                                        date === 'January 20' ? 'Jan 20' :
                                                            date === 'January 21' ? 'Jan 21' :
                                                                date === 'January 22' ? 'Jan 22' : 'Jan 23'}
                                                </span>
                                            </label>

                                            <div className="relative flex-1 dropdown-container">
                                                <button
                                                    type="button"
                                                    disabled={!availabilityMappings[date]}
                                                    onClick={() => toggleDropdown(`time-${date}`)}
                                                    className={`w-full h-[44px] border border-gray-200 px-4 flex items-center justify-between text-[14px] font-noto-sans transition-opacity ${!availabilityMappings[date] ? 'opacity-50 cursor-not-allowed' : 'bg-white opacity-100'}`}
                                                >
                                                    <span className={availabilityMappings[date] && availabilityMappings[date] !== 'Select one' ? 'text-black' : 'text-[#ADADAD]'}>
                                                        {availabilityMappings[date] || 'Select one'}
                                                    </span>
                                                    <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === `time-${date}` ? 'rotate-180' : ''}`} size={16} />
                                                </button>
                                                {activeDropdown === `time-${date}` && (
                                                    <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 font-noto-sans">
                                                        {['Morning', 'Lunch', 'Afternoon', 'Evening'].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setAvailabilityMappings({
                                                                        ...availabilityMappings,
                                                                        [date]: option
                                                                    });
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className="w-full text-left px-4 py-2.5 text-[14px] text-gray-800 hover:bg-gray-50 transition-colors"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isFormInvalid || isSubmitting}
                            className={`w-full h-[54px] text-white flex justify-center items-center text-[16px] font-semibold font-noto-sans transition-colors ${isFormInvalid || isSubmitting
                                ? 'bg-[#E4E4E7] text-[#ADADAD] cursor-not-allowed'
                                : 'bg-[#7921B1] hover:bg-[#621B91]'
                                }`}
                            onClick={handleSubmit}
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
                                'Submit Dialogue Request'
                            )}
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
