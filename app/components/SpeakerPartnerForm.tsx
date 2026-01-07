'use client';

import { X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

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

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

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

    const isFormEmpty = !firstName.trim() && !lastName.trim() && !organisation.trim();

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
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[57px] bg-black/50 overflow-hidden"
            onClick={onClose}
        >
            <div
                className="relative w-[calc(100%-48px)] max-w-[420px] bg-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col h-[calc(100vh-57px)]"
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

                <div className="flex-1 overflow-y-auto px-8 pt-12 custom-scrollbar" onScroll={() => setActiveDropdown(null)}>
                    <h2 className="text-[#000000] text-[28px] font-semibold leading-[36px] font-noto-sans mb-8">
                        Speaker / Partner Application
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

                        {/* Section: Engagement Type */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Engagement Type</h3>
                            <div className="relative mt-2 dropdown-container">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('engagementType')}
                                    className="w-full h-[44px] border border-[#E4E4E7] px-4 pr-3 text-[13px] bg-white text-left flex items-center justify-between focus:border-[#7921B1] outline-none font-noto-sans"
                                >
                                    <span className={engagementType ? 'text-black' : 'text-[#ADADAD]'}>
                                        {engagementType || 'Select one'}
                                    </span>
                                    <ChevronDown className={`text-[#ADADAD] transition-transform ${activeDropdown === 'engagementType' ? 'rotate-180' : ''}`} size={18} />
                                </button>
                                {activeDropdown === 'engagementType' && (
                                    <div className="absolute z-50 left-0 right-0 top-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 font-noto-sans">
                                        {engagementTypes.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => {
                                                    setEngagementType(option);
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

                        {/* Section: Relevance to ANVI India */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Relevance to ANVI India</h3>
                            <p className="text-[#333333] text-[14px] font-semibold font-noto-sans">(Select all that apply)</p>
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
                                        <span className="text-[14px] text-[#333333] font-noto-sans">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section: Relevance to ANVI Global */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Relevance to ANVI Global</h3>
                            <p className="text-[#333333] text-[14px] font-semibold font-noto-sans">(Select all that apply)</p>
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
                                            <span className="text-[14px] text-[#333333] font-semibold font-noto-sans">{item.title}</span>
                                            {item.desc && <span className="text-[12px] text-[#666666] font-noto-sans leading-tight mt-0.5">{item.desc}</span>}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section: Your Contribution */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Your Contribution</h3>
                            <div className="space-y-2">
                                <textarea
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value.slice(0, 400))}
                                    placeholder="We can deploy X in Y geography within Z months..."
                                    className="w-full h-[120px] border border-[#E4E4E7] p-4 text-[13px] placeholder:text-[#ADADAD] focus:border-[#7921B1] outline-none resize-none font-noto-sans"
                                ></textarea>
                                <div className="flex justify-between">
                                    <span className="text-[13px] font-noto-sans text-[#ADADAD] block">{contribution.length}/400 characters</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Pilot Interest */}
                        <div className="space-y-6">
                            <h3 className="text-[#7921B1] text-[14px] font-bold font-noto-sans uppercase">Pilot Interest</h3>
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
                                        <span className="text-[14px] text-[#333333] font-noto-sans">{item}</span>
                                    </label>
                                ))}
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
                                onSubmit();
                            }}
                        >
                            Submit Application
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
            `}</style>
        </div>
    );
}
