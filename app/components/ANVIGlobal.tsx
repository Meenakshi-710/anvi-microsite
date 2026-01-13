import Accordion from './Accordion';

interface ANVIGlobalProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onRequestDialogue?: () => void;
  onRequestSpeaker?: () => void;
}

export default function ANVIGlobal({ isOpen, onToggle, onRequestDialogue, onRequestSpeaker }: ANVIGlobalProps) {
  return (
    <Accordion title="ANVI Global" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0 lg:pb-13">
        {/* Left Column - Text and Buttons */}
        <div className="space-y-6 lg:pt-20 lg:pl-14 lg:w-[580px] lg:h-[900px]">
          <p className="text-[#897e7e] text-[17px] leading-[28.9px]">
            ANVI GLOBAL's vision is to transform how the world trades and finances commodities and energy transition, enabling transparent, liquid, and digitally-native markets.
          </p>

          <p className="text-[#897e7e] text-[17px] leading-[28.9px]">
            We aim to democratize access to commodity and transition finance by tokenizing real assets and embedding DeFi principles into global trade flows.
          </p>

          <p className="text-[#333333] text-[17px] leading-[28.9px]">
            The global energy and technology transition is reshaping commodity markets. Traditional financing channels in emerging markets remain constrained, creating a $1+ trillion trade finance gap.
          </p>

          <p className="text-[#333333] text-[17px] leading-[28.9px] font-semibold">
            Anvi Global stands at this convergence: unlocking capital and commodity flows through trading, structured finance, and digital tokenisation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              className="w-full h-[54px] bg-[#7921B1] text-white justify-center items-center text-[15px] lg:text-[17px] font-semibold transition-colors hover:bg-[#6a1d9b]"
              onClick={onRequestDialogue}
            >
              Request a Dialogue
            </button>
            <button
              className="w-full h-[54px] bg-white text-[#333333] border border-[#CCCCCC] justify-center items-center text-[15px] lg:text-[17px] font-semibold hover:bg-gray-50 transition-colors"
              onClick={onRequestSpeaker}
            >
              Speak at ANVI Global Sessions
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3 pt-1">
            <a href="/ANVI Global Commodity Trade Finance Concept Teaser Davos 2026.pdf" download="ANVI Global Commodity Trade Finance Concept Teaser Davos 2026" className="text-[#7921B1] underline text-[15px] lg:text-[16px]">
              Explore the ANVI Global Thesis
            </a>
            <a href="https://www.anvi.global/" target="_blank" rel="noopener noreferrer" className="text-[#7921B1] underline text-[15px] lg:text-[16px]">
              Visit Website
            </a>
          </div>
        </div>

        {/* Right Column - Image (Desktop) / Bottom (Mobile) */}
        <div className="pt-2 -mx-[27px] md:pt-0 relative">
          <img
            src="/Anvi Global.svg"
            alt="The Future of Trade is Tokenized"
            className="w-full h-auto object-cover lg:w-[580px] lg:h-[900px]"
          />
        </div>
      </div>
    </Accordion>
  );
}

