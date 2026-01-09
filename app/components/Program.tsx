'use client';

import { useState } from 'react';
import Accordion from './Accordion';

export const PROGRAM_DATA = [
  {
    dayLabel: 'DAY 1',
    date: 'MONDAY, JANUARY 19',
    description: 'Rebuilding Trust • Digital Public Goods • Inclusive Growth',
    sessions: [
      {
        type: 'ROUND TABLE I — ANVI INDIA',
        time: '19 Jan 10:00 – 10:45',
        title: "India's Leapfrog Moment",
        body: "Designing the World's First AI Bank, and the World's First Alternate Financial Rail for a Billion People. What if inclusion was not about entering the old banking system, but about building a new one?",
        thesis: [
          "ANVI India is not just a bank, it is an AI-native financial operating system",
          "A parallel rail to legacy banking, correspondent networks, and fee-extractive intermediaries",
          "Built on India's DPI, but not dependent on legacy global pipes"
        ]
      },
      {
        type: 'ROUND TABLE II — ANVI GLOBAL',
        time: '19 Jan 11:00 – 11:45',
        title: "The Future of Trade Is Tokenized",
        body: "Re-architecting Global Commerce for a Fragmented World. Global trade is broken, not because of demand, but because of architecture. Tokenization, AI and DeFi are not experiments. They are becoming infrastructure.",
        thesis: [
          "$2.5T global trade finance gap",
          "Tokenized commodities & fractional ownership",
          "AI-driven DeFi liquidity pools",
          "South-South trade acceleration"
        ]
      },
      {
        type: 'ROUND TABLE III — ANVI INDIA',
        time: '19 Jan 12:00 – 12:45',
        title: "The Last Mile First",
        body: "How India Can Amplify Local & Regional GDP Without a Single Branch. GDP does not grow from capital, it grows from participation.",
        thesis: [
          "How India Can Bank 1.1 Billion People Without Building a Single Branch",
          "Every traditional banking system failed the last mile",
          "The question is no longer can we reach the last mile, but what happens when the last mile becomes the first mile of growth?",
          "Digitizing the cash economy → measurable GDP lift",
          "Peer-to-peer commerce replacing extractive middle layers",
          "Local networks compounding into regional economic engines",
        ]
      }
    ]
  },
  {
    dayLabel: 'DAY 2',
    date: 'TUESDAY, JANUARY 20',
    description: 'Universal Credit • AI Governance • Economic Resilience',
    sessions: [
      {
        type: 'ROUND TABLE I — ANVI INDIA',
        time: '20 Jan 10:00 – 10:45',
        title: "AI Underwriting for a Billion",
        body: "From Invisible Credit to Macro-Stable, Tradeable Loan Books. What if the poorest borrowers produced the highest-quality assets?",
        thesis: [
          "AI allows to price risk invisibly, fairly, and at population scale, transforming credit from a privilege into a utility",
          "Millions of AI underwritten micro-loans aggregated into institutional-grade assets",
          "Behavioral & psychometric underwriting"
        ]
      },
      {
        type: 'ROUND TABLE II — ANVI GLOBAL',
        time: '20 Jan 11:00 – 11:45',
        title: "Monetising the Cash Economy",
        body: "How Float Becomes a New Financial Rail, Not a Hidden Tax. Fees extract value. Float compounds it.",
        thesis: [
          "Zero-fee model increases participation",
          "Float becomes shared economic infrastructure",
          "Banks, merchants, consumers aligned , not adversarial"
        ]
      },
      {
        type: 'ROUND TABLE III — ANVI INDIA',
        time: '20 Jan 12:00 – 12:45',
        title: "From Scarcity to Abundance",
        body: "Peer-to-Peer Capital, Asset Ownership & Local Wealth Creation. What if we enable the marginalised with scarce resources to leapfrog into an Abundance Mindset",
        thesis: [
          "Savings + responsible credit habits",
          "Fractional access to real assets",
          "Lending and commerce between citizens, not just institutions"
        ]
      }
    ]
  },
  {
    dayLabel: 'DAY 3',
    date: 'WEDNESDAY, JANUARY 21',
    description: 'Global Trade • Capital Market Innovation • Energy Transition',
    sessions: [
      {
        type: 'ROUND TABLE I — ANVI GLOBAL',
        time: '21 Jan 10:00 – 10:45',
        title: "DeFi Meets Trade Finance",
        body: "Replacing SWIFT-based Banking with Liquidity Networks",
        thesis: [
          "Why correspondent banking and SWIFT-based settlement structurally exclude SMEs and emerging markets",
          "Liquidity-first trade finance vs permission-based banking models. AI-driven risk pricing at transaction level",
          "Decentralized liquidity pools complementing regulated finance",
          "Programmable compliance for regulators and central banks",
        ]
      },
      {
        type: 'ROUND TABLE II — ANVI INDIA',
        time: '21 Jan 11:00 – 11:45',
        title: "Securitizing Commodity Credit",
        body: "From Physical Flows to Macro-Stabilizing Financial Assets",
        thesis: [
          "Commodity-backed credit has structurally lower LGD",
          "Aggregation into institutional-grade pools",
          "Multi-tranche structures for pensions, insurers, sovereign funds",
          "Hedging basis, location, timing risks",
          "Stabilizing producer economies"
        ]
      },
      {
        type: 'ROUND TABLE III — ANVI GLOBAL',
        time: '21 Jan 12:00 – 12:45',
        title: "Tokenizing the Real World",
        body: "Commodities, Carbon, Inventory, Assets That Move the Planet",
        thesis: [
          "Legal enforceability of tokenized claims",
          "Inventory and supply-chain tokens",
          "Carbon and ESG tokens as auditable assets",
          "Smart contracts bridging physical verification and digital trust",
          "Transparency over speculation"
        ]
      }
    ]
  },
  {
    dayLabel: 'DAY 4',
    date: 'THURSDAY, JANUARY 22',
    description: 'Digital Trust • SMEs • Global South',
    sessions: [
      {
        type: 'ROUND TABLE I — ANVI INDIA',
        time: '22 Jan 10:00 – 10:45',
        title: "Retailers as the New Bank Branches",
        body: "350,000 Corner-stores as India's Financial Nervous System",
        thesis: [
          "Corner stores as trust anchors",
          "Zero-MDR merchant adoption",
          "SME liquidity and local supply chains",
          "Hyper-local GDP amplification"
        ]
      },
      {
        type: 'ROUND TABLE II — ANVI INDIA',
        time: '22 Jan 11:00 – 11:45',
        title: "The Trade Finance Technology Stack",
        body: "Smart Contracts, Oracles & the End of Paper Trust",
        thesis: [
          "Digitized agreements replacing LCs",
          "Oracles feeding real-world data",
          "Role of banks, law firms, custodians, insurers",
          "Interoperability between DeFi and regulated institutions",
          "Cybersecurity by design"
        ]
      },
      {
        type: 'ROUND TABLE III — ANVI GLOBAL',
        time: '22 Jan 12:00 – 12:45',
        title: "True Inclusion Through AI, DeFi & New Rails",
        body: "Instant, Compliant, Cross-Border Commerce for the Global South",
        thesis: [
          "Cross-border commerce without correspondent banking",
          "Built-in KYC, AML, auditability",
          "SMEs and gig workers as global participants",
          "Digital identity as economic passports",
          "Inclusion without regulatory compromise"
        ]
      },
    ]
  },
  {
    dayLabel: 'DAY 5',
    date: 'FRIDAY, JANUARY 23',
    description: 'Future of Capitalism • Risk • Systemic Resilience',
    sessions: [
      {
        type: 'ROUND TABLE I — ANVI GLOBAL',
        time: '23 Jan 10:00 – 10:45',
        title: "Beyond a Bank",
        body: "From Remittance Rail to National Digital Economic Platform",
        thesis: [
          "Evolution to full economic OS",
          "Zero-fee ecosystem funded by float incentivised by value added services",
          "Super-app as citizen infrastructure, not consumer exploitatiion",
          "Unified and virtuous loop: credit, savings, insurance, commerce",
          "Long-term productivity gains"
        ]
      },
      {
        type: 'ROUND TABLE II — ANVI INDIA',
        time: '23 Jan 11:00 – 11:45',
        title: "Trust by Design",
        body: "Risk, Cybersecurity, ESG & Governance Across New Financial Rails",
        thesis: [
          "Proactive, AI-driven risk management across chains",
          "Cybersecurity and privacy embedded at protocol level",
          "Unified risk frameworks across traditional and tokenized markets",
          "ESG assets as measurable, tradable classes",
          "Regulatory harmonization across jurisdictions"
        ]
      },
      {
        type: 'CLOSING SALON',
        time: '23 Jan 12:00 – 12:45',
        title: "A New Economic Operating System",
        body: "Peer-to-Peer Capital • Alternate Rails • Resilient Growth",
        thesis: [
          "Why emerging markets will define the next financial architecture",
          "Peer-to-peer capital as complement to institutions",
          "Tokenization as access, not abstraction",
          "ANVI India → GDP amplification through participation",
          "ANVI Global → stable commodity and energy transition finance"
        ]
      }
    ]
  }
];

interface SessionToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

function SessionToggle({ isOn, onToggle }: SessionToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isOn ? 'bg-[#7921B1]' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-5' : ''}`}></div>
    </button>
  );
}

interface ProgramProps {
  isOpen?: boolean;
  onToggle?: () => void;
  selectedSessions: Set<string>;
  onSessionToggle: (sessionId: string) => void;
  onSubmitInterest?: () => void;
}

export default function Program({ isOpen, onToggle, selectedSessions, onSessionToggle, onSubmitInterest }: ProgramProps) {

  const isSubmitEnabled = selectedSessions.size > 0;

  return (
    <Accordion title="Program" isOpen={isOpen} onToggle={onToggle}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h3 className="text-[#7921B1] font-semibold text-[13px] tracking-wider uppercase font-noto-sans">
            FIVE DAYS OF IMPACT
          </h3>
          <p className="text-[#897e7e] text-[16px] font-noto-sans">
            Leadership Roundtables • By Invitation Only
          </p>
          <p className="text-[#7921B1] font-semibold text-[15px] font-noto-sans">
            ANVI INDIA × ANVI GLOBAL
          </p>
          <p className="text-[#897e7e] text-[14px] font-noto-sans font-regular">
            Real Assets • Digital Trust • Human Agency • New Financial Rails
          </p>
        </div>

        {/* Days Loop */}
        {PROGRAM_DATA.map((day, index) => (
          <div key={index} className="space-y-3">
            {/* Day Header */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[#7921B1] font-bold text-[14px] whitespace-nowrap font-noto-sans font-bold">{day.dayLabel}</span>
                <div className="h-[1px] bg-gray-300 w-12"></div>
                <span className="text-black font-bold text-[16px] font-noto-sans font-semibold">{day.date}</span>
              </div>
              <p className="text-[#897e7e] text-[15px] leading-[24px] font-noto-sans font-regular">
                {day.description}
              </p>
            </div>

            {/* Roundtables */}
            <div className="space-y-6">
              {day.sessions.map((session, sIndex) => (
                <div key={sIndex} className="overflow-hidden">
                  <div className="bg-[#EFEFEF] border-[#EFEFEF] border border-[1px] p-3 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-[#7921B1] font-bold text-[13px] tracking-wider uppercase font-noto-sans">
                        {session.type}
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className="text-[#7921B1] text-[14px] font-medium font-noto-sans">
                          {session.time}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11.19px] text-gray-600 font-medium font-noto-sans">Mark Interest</span>
                          <SessionToggle
                            isOn={selectedSessions.has(`${index}-${sIndex}`)}
                            onToggle={() => onSessionToggle(`${index}-${sIndex}`)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-black text-[20px] font-bold leading-[28.8px] mb-2 font-noto-sans">
                        {session.title}
                      </h3>
                      <p className="text-black text-[14px] leading-[27.2px] font-normal font-noto-sans">
                        {session.body}
                      </p>
                    </div>
                  </div>

                  {session.thesis && (
                    <div className="bg-[#F8F8F8] border-[#EFEFEF] border border-[1px] p-3">
                      <h5 className="text-[#7921B1] font-bold text-[14px] mb-2 font-noto-sans">
                        Core thesis
                      </h5>
                      <ul className="space-y-4">
                        {session.thesis.map((item, tIndex) => (
                          <li key={tIndex} className="flex items-start gap-2 font-noto-sans">
                            <div className="mt-[9px] min-w-[5px] h-[5px] rounded-full bg-[#897e7e]"></div>
                            <span className="text-[#897e7e] text-[15px] leading-relaxed font-noto-sans">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="">
          {/* Card Container */}
          <div className="space-y-6">

            {/* Gray Box for Text */}
            <div className="bg-[#F9F9F9] p-3 border border-gray-100">
              <h3 className="text-black text-[24px] font-bold leading-[36px] mb-3 font-noto-sans">
                Ready to join the <br className="hidden sm:block" /> conversation?
              </h3>
              <p className="text-[#897e7e] text-[16px] leading-[25px] font-noto-sans">
                Submit your interest in the sessions you'd like to attend. Our team will reach out with next steps.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={onSubmitInterest}
              disabled={!isSubmitEnabled}
              className={`w-full text-white py-4 font-semibold text-[16px] transition-colors font-noto-sans ${isSubmitEnabled
                ? 'bg-[#7921B1] hover:bg-[#6a1d9b] shadow-sm'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
            >
              Submit Your Interest
            </button>

            {/* Link */}
            <div className="text-center">
              <a href="/ANVI Program Agenda.pdf" download="ANVI Program Agenda" className="text-[#7921B1] text-[17px] font-semibold border-b border-[#7921B1] pb-0.5 hover:text-[#5f1a8b] transition-colors font-noto-sans">
                Download Full Program
              </a>
            </div>

          </div>
        </div>
      </div>
    </Accordion>
  );
}

