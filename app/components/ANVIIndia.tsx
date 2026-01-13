import Accordion from './Accordion';

interface ANVIIndiaProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onRequestDialogue?: () => void;
  onRequestSpeaker?: () => void;
}

export default function ANVIIndia({ isOpen, onToggle, onRequestDialogue, onRequestSpeaker }: ANVIIndiaProps) {
  return (
    <Accordion title="ANVI India" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0 lg:pb-13">
        {/* Left Column - Text and Buttons */}
        <div className="lg:w-[50%] space-y-6 lg:pt-20 lg:pl-14">
          <p className="text-[#897e7e] text-[18px] leading-[31.5px] font-noto-sans">
            ANVI India is re-architecting banking for India, building an AI-native financial platform to bank over a billion citizens, where data replaces collateral, retailers replace branches, and thin-file participation evolves into thick-data economic agency through free banking and affordable credit.
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              className="w-full h-[54px] bg-[#7921B1] text-white justify-center items-center text-[15px] lg:[17px] font-semibold transition-colors hover:bg-[#6a1d9b]"
              onClick={onRequestDialogue}
            >
              Request a Dialogue
            </button>
            <button
              className="w-full h-[54px] bg-white text-[#333333] border border-[#CCCCCC] justify-center items-center text-[15px] lg:[17px] font-semibold hover:bg-gray-50 transition-colors"
              onClick={onRequestSpeaker}
            >
              Speak at ANVI India Sessions
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3 pt-1">
            <a href="/ANVI_India_Explainer_video.MOV" download="ANVI India Explainer Video" className="text-[#7921B1] underline text-[15px] lg:text-[16px]">
              Download the ANVI India Explainer Video
            </a>
            <a href="https://www.anvi.ai/" target="_blank" rel="noopener noreferrer" className="text-[#7921B1] underline text-[15px] lg:text-[16px]">
              Visit Website
            </a>
          </div>
        </div>

        {/* Right Column - Image (Desktop) / Bottom (Mobile) */}
        <div className="pt-2 -mx-[27px] md:pt-0 relative">
          <img
            src="/Anvi India.svg"
            alt="One Card. One India - Woman in yellow sari"
            className="w-full h-auto object-cover lg:w-[580px] lg:h-[600px]"
          />
          {/* GIF overlay centered on image */}
          <div className="absolute bottom-14 left-2 right-0 flex justify-center pointer-events-none">
            <img
              src="/WHITE-Anvi-Ek-Bharat-homepage-GIF-UPDATED.gif"
              alt="ANVI Animation"
              className="w-auto h-auto max-w-full max-h-full object-fit"
            />
          </div>
        </div>
      </div>

    </Accordion>
  );
}

