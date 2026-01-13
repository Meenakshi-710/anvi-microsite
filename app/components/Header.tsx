import Image from 'next/image';

interface HeaderProps {
  isDialogueOpen?: boolean;
}

export default function Header({ isDialogueOpen }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-40 bg-white w-full px-3 sm:px-4 md:px-8 lg:px-12 py-2 md:py-3 border-b-2 transition-colors duration-200 ${isDialogueOpen ? 'border-[#7921B1]' : 'border-[#E4E4E7]'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <Image
            src="/Image.svg"
            alt="ANVI"
            width={90}
            height={40}
            className="object-contain w-[60px] h-[26px] sm:w-[70px] sm:h-[31px] md:w-[80px] md:h-[35px] lg:w-[90px] lg:h-[40px]"
            priority
          />
          <span className="text-[#7B2CBF] text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-bold leading-tight">
            DAVOS 2026
          </span>
        </div>
        {isDialogueOpen && (
          <span className="text-[#7921B1] text-xl sm:text-2xl md:text-3xl font-light pr-2 sm:pr-3 md:pr-4">
            −
          </span>
        )}
      </div>
    </header>
  );
}
