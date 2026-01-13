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
        <div className="space-y-4 md:space-y-6 lg:pt-20 lg:pl-14 lg:w-[50%]">
          <p className="text-[#897e7e] text-[15px] md:text-[16px] lg:text-[17px] leading-[24px] md:leading-[27px] lg:leading-[28.9px] font-noto-sans">
            ANVI GLOBAL's vision is to transform how the world trades and finances commodities and energy transition, enabling transparent, liquid, and digitally-native markets.
          </p>

          <p className="text-[#897e7e] text-[15px] md:text-[16px] lg:text-[17px] leading-[24px] md:leading-[27px] lg:leading-[28.9px] font-noto-sans">
            We aim to democratize access to commodity and transition finance by tokenizing real assets and embedding DeFi principles into global trade flows.
          </p>

          <p className="text-[#333333] text-[15px] md:text-[16px] lg:text-[17px] leading-[24px] md:leading-[27px] lg:leading-[28.9px] font-noto-sans">
            The global energy and technology transition is reshaping commodity markets. Traditional financing channels in emerging markets remain constrained, creating a $1+ trillion trade finance gap.
          </p>

          <p className="text-[#333333] text-[15px] md:text-[16px] lg:text-[17px] leading-[24px] md:leading-[27px] lg:leading-[28.9px] font-semibold font-noto-sans">
            Anvi Global stands at this convergence: unlocking capital and commodity flows through trading, structured finance, and digital tokenisation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-3 pt-2">
            <button
              className="w-full h-[48px] md:h-[52px] lg:h-[54px] bg-[#7921B1] text-white flex justify-center items-center text-[15px] md:text-[16px] lg:text-[17px] font-semibold transition-colors hover:bg-[#6a1d9b] font-noto-sans"
              onClick={onRequestDialogue}
            >
              Request a Dialogue
            </button>
            <button
              className="w-full h-[48px] md:h-[52px] lg:h-[54px] bg-white text-[#333333] border border-[#CCCCCC] flex justify-center items-center text-[15px] md:text-[16px] lg:text-[17px] font-semibold hover:bg-gray-50 transition-colors font-noto-sans"
              onClick={onRequestSpeaker}
            >
              Speak at ANVI Global Sessions
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2 md:space-y-3 pt-1">
            <a href="/ANVI Global Commodity Trade Finance Concept Teaser Davos 2026.pdf" download="ANVI Global Commodity Trade Finance Concept Teaser Davos 2026" className="text-[#7921B1] underline text-[14px] md:text-[15px] lg:text-[16px] font-noto-sans hover:text-[#6a1d9b] transition-colors">
              Explore the ANVI Global Thesis
            </a>
            <a href="https://www.anvi.global/" target="_blank" rel="noopener noreferrer" className="text-[#7921B1] underline text-[14px] md:text-[15px] lg:text-[16px] font-noto-sans hover:text-[#6a1d9b] transition-colors">
              Visit Website
            </a>
          </div>
        </div>

        {/* Right Column - Image (Desktop) / Bottom (Mobile) */}
        <div className="pt-2 -mx-[27px] md:pt-4  lg:pt-0 relative">
          <img
            src="/Anvi Global.svg"
            alt="The Future of Trade is Tokenized"
            className="w-full h-auto object-cover md:max-w-full lg:w-[580px] lg:h-[900px]"
          />
        </div>
      </div>
    </Accordion>
  );
}

