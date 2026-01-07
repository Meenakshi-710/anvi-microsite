import Image from 'next/image';

interface HeaderProps {
  isDialogueOpen?: boolean;
}

export default function Header({ isDialogueOpen }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-40 bg-white w-full pl-4 pr-6 pb-2 pt-2 border-b-2 transition-colors duration-200 ${isDialogueOpen ? 'border-[#7921B1]' : 'border-[#E4E4E7]'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/Image.svg"
            alt="ANVI"
            width={90}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-[#7B2CBF] text-[26px] font-bold">
            DAVOS 2026
          </span>
        </div>
        {isDialogueOpen && (
          <span className="text-[#7921B1] text-2xl font-light pr-4">
            −
          </span>
        )}
      </div>
    </header>
  );
}
