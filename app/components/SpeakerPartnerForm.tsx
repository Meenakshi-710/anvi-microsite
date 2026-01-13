'use client';

import { X, ChevronDown, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { COUNTRIES } from '../constants/countries';
import { saveFieldSuggestion, getFieldSuggestions, isDuplicateSubmission, recordSubmission } from '../utils/form-utils';
import { submitToGoogleSheets } from '../utils/google-sheets';


interface SpeakerPartnerFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function SpeakerPartnerForm({ isOpen, onClose, onSubmit }: SpeakerPartnerFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [titleRole, setTitleRole] = useState('');
    const [country, setCountry] = useState('');
    const [engagementType, setEngagementType] = useState('');
    const [indiaRelevance, setIndiaRelevance] = useState<string[]>([]);
    const [globalRelevance, setGlobalRelevance] = useState<string[]>([]);
    const [contribution, setContribution] = useState('');
    const [pilotInterest, setPilotInterest] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);



    const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});

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

    const rolesList = [
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

    const engagementTypes = [
        'Speaker / Panel Contributor',
        'Pilot Partner',
        'Policy Partner',
        'Capital Partner',
        'Technology / Distribution Partner'
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
            setEngagementType('');
            setIndiaRelevance([]);
            setGlobalRelevance([]);
            setContribution('');
            setPilotInterest('');
            setIsSubmitted(false);
            setDuplicateError(false);
        }
    }, [isOpen]);

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
        // Check for duplicate submission
        if (isDuplicateSubmission('Speaker / Partner Application', firstName, lastName)) {
            setDuplicateError(true);
            return;
        }

        setIsSubmitting(true);
        setDuplicateError(false);
        // Save suggestions
        saveFieldSuggestion('firstName', firstName);
        saveFieldSuggestion('lastName', lastName);
        saveFieldSuggestion('email', email);
        saveFieldSuggestion('organisation', organisation);
        saveFieldSuggestion('whatsapp', phoneNumber);

        try {
            await submitToGoogleSheets({
                formType: 'Speaker / Partner Application',
                firstName,
                lastName,
                email,
                organisation,
                countryCode,
                phoneNumber,
                country,
                titleRole,
                additionalDetails: {
                    engagementType,
                    indiaRelevance,
                    globalRelevance,
                    contribution,
                    pilotInterest
                }
            });

            // Record the submission to prevent duplicates
            recordSubmission('Speaker / Partner Application', firstName, lastName);

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
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[57px] bg-black/50 overflow-hidden"
            onClick={onClose}
        >
            <div
                className="relative w-[calc(100%-48px)] max-w-[520px] md:max-w-[720px] bg-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col h-[calc(100dvh)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="text-[#333333] hover:text-black transition-colors"
                        aria-label="Close form"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 md:px-12 pt-12 custom-scrollbar" onScroll={() => setActiveDropdown(null)}>
                    <h2 className="text-[#000000] text-[24px] md:text-[32px] font-semibold leading-[32px] md:leading-[40px] font-noto-sans mb-6 md:mb-8">
                        Speaker / Partner Application
                    </h2>

                    {/* Duplicate Error Message */}
                    {duplicateError && (
                        <div className="bg-purple-50 border border-[#7921B1] rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-[#7921B1] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-[#7921B1] text-[13px] font-semibold">
                                        An application with the name <strong>{firstName} {lastName}</strong> has already been submitted. Please use a different name or contact our team for assistance.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setDuplicateError(false)}
                                        className="text-[#7921B1] text-[12px] mt-2 hover:underline"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6 md:space-y-8 pb-12 md:pb-16">
                        {/* Section: Identity */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase leading-[20px]">Identity</h3>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Full Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="given-name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your First Name"
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your Last Name"
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Organisation *</label>
                                <input
                                    type="text"
                                    id="organisation"
                                    name="organisation"
                                    autoComplete="organization"
                                    value={organisation}
                                    onChange={(e) => setOrganisation(e.target.value)}
                                    placeholder="Enter your Organisation"
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none mt-2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Title / Role *</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('titleRole')}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
                                    >
                                        <span className={titleRole ? 'text-black' : 'text-[#ADADAD]'}>
                                            {titleRole || 'Select one'}
                                        </span>
                                        <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'titleRole' ? 'rotate-180' : ''}`} size={18} />
                                    </button>
                                    {activeDropdown === 'titleRole' && (
                                        <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                                            {rolesList.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setTitleRole(option);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 text-[14px] md:text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Country *</label>
                                <div className="relative mt-2 dropdown-container">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('country')}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none"
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
                                                    className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 text-[14px] md:text-[15px] text-gray-800 hover:bg-gray-50 transition-colors font-noto-sans"
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
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] focus:border-[#7921B1] outline-none mt-2 placeholder:text-[#ADADAD]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[13px] md:text-[14px] font-semibold font-noto-sans text-[#333333]">WhatsApp / Mobile *</label>
                                <div className="flex gap-2 mt-2">
                                    <div className="relative min-w-[80px] dropdown-container">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('countryCode')}
                                            className="w-full px-2 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] bg-white text-left flex items-center justify-center gap-1 focus:border-[#7921B1] outline-none"
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
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your number"
                                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 border border-[#E4E4E7] text-[14px] md:text-[15px] font-noto-sans placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Engagement Type */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase">Engagement Type</h3>
                            <div className="relative mt-2 dropdown-container">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('engagementType')}
                                    className="w-full py-2 border-b border-[#E4E4E7] text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                >
                                    <span className={engagementType ? 'text-black' : 'text-[#ADADAD]'}>
                                        {engagementType || 'Select one'}
                                    </span>
                                    <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'engagementType' ? 'rotate-180' : ''}`} size={18} />
                                </button>
                                {activeDropdown === 'engagementType' && (
                                    <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200 py-2 max-h-[220px] overflow-y-auto custom-scrollbar font-noto-sans">
                                        {engagementTypes.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => {
                                                    setEngagementType(option);
                                                    setActiveDropdown(null);
                                                }}
                                                className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 text-[14px] md:text-[15px] text-gray-800 hover:bg-gray-50 transition-colors"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section: Relevance to ANVI India */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase">Relevance to ANVI India</h3>
                            <p className="text-[#333333] text-[13px] md:text-[14px] font-semibold font-noto-sans">(Select all that apply)</p>
                            <div className="space-y-3">
                                {[
                                    'Financial Inclusion & AI Credit',
                                    'Last-Mile Banking (Kirana Networks)',
                                    'Credit Underwriting & Risk',
                                    'Digital Payments & Zero-Fee Models',
                                    'Cross-border inclusion',
                                    'Inclusion Policy & Regulation',
                                    'Other'
                                ].map((item) => (
                                    <label key={item} className="flex items-start gap-3 group cursor-pointer">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={indiaRelevance.includes(item)}
                                                onChange={() => toggleCheckbox(indiaRelevance, setIndiaRelevance, item)}
                                                className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-[13px] md:text-[14px] text-[#333333] font-noto-sans">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section: Relevance to ANVI Global */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase">Relevance to ANVI Global</h3>
                            <p className="text-[#333333] text-[13px] md:text-[14px] font-semibold font-noto-sans">(Select all that apply)</p>
                            <div className="space-y-6">
                                {[
                                    { title: 'DeFi Meets Commodity Trade Finance & Physical Flows', desc: 'Commodity Trade Finance & Physical Flows' },
                                    { title: 'Capital Allocation & LP Participation', desc: 'Family office, institutional, sovereign or strategic capital seeking structured exposure.' },
                                    { title: 'Replacing SWIFT-based Banking with Liquidity Networks', desc: 'Family office, institutional, sovereign or strategic capital seeking structured exposure.' },
                                    { title: 'Future of trade is tokenized. RWA Tokenization & DeFi Capital Structures', desc: 'Tokenized commodities, on-chain funds, Defi-enabled leverage and yield strategies.' },
                                    { title: 'Deal Origination & Strategic Partnerships', desc: 'Origination, co-investment, platform partnerships, or long-term collaboration.' },
                                    { title: 'Policy, Regulation & Geopolitical Trade Architecture, Risk, ESG & Governance', desc: 'Cross-border regulation, sanctions, trade corridors, and public-private frameworks.' },
                                    { title: 'Securitising Commodity Credit', desc: 'From physical flows to Macro-Stabilizing Financial Assets' },
                                    { title: 'Other', desc: '' }
                                ].map((item) => (
                                    <label key={item.title} className="flex items-start gap-3 group cursor-pointer">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={globalRelevance.includes(item.title)}
                                                onChange={() => toggleCheckbox(globalRelevance, setGlobalRelevance, item.title)}
                                                className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[13px] md:text-[14px] text-[#333333] font-semibold font-noto-sans">{item.title}</span>
                                            {item.desc && <span className="text-[11px] md:text-[12px] text-[#666666] font-noto-sans leading-tight mt-0.5">{item.desc}</span>}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section: Your Contribution */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase">Your Contribution</h3>
                            <div className="space-y-2">
                                <textarea
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value.slice(0, 400))}
                                    placeholder="We can deploy X in Y geography within Z months..."
                                    className="w-full min-h-[100px] py-2 border-b border-[#E4E4E7] text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none resize-none font-noto-sans"
                                ></textarea>
                                <div className="flex justify-between">
                                    <span className="text-[13px] font-noto-sans text-[#ADADAD] block">{contribution.length}/400 characters</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Pilot Interest */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[13px] md:text-[14px] font-bold font-noto-sans uppercase">Pilot Interest</h3>
                            <div className="space-y-4">
                                {[
                                    'Yes – India',
                                    'Yes – Global South',
                                    'Yes – Both',
                                    'Not at this stage'
                                ].map((item) => (
                                    <label key={item} className="flex items-start gap-3 group cursor-pointer">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={pilotInterest === item}
                                                onChange={() => setPilotInterest(item)}
                                                className="peer w-5 h-5 border border-[#7921B1] appearance-none cursor-pointer checked:bg-[#7921B1]"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-[13px] md:text-[14px] text-[#333333] font-noto-sans">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isFormInvalid || isSubmitting}
                            className={`w-full h-[48px] md:h-[54px] text-white flex justify-center items-center text-[15px] md:text-[16px] font-semibold font-noto-sans transition-colors ${isFormInvalid || isSubmitting
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
                                'Submit Application'
                            )}
                        </button>

                    </form>
                </div>
            </div>

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
                
                /* Hide input arrows on all devices */
                input[type="number"] {
                    -moz-appearance: textfield;
                }
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                /* Hide calendar picker indicators */
                input::-webkit-calendar-picker-indicator {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
