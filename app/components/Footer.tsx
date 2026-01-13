import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-12 pr-20 pl-6">
      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden space-y-4 items-start">
        <div className="flex items-center">
          <Image
            src="/Image.svg"
            alt="ANVI"
            width={46}
            height={20}
            className="object-contain"
          />
          <span className="text-[#7B2CBF] text-[12.96px] font-bold font-helvetica leading-[12.57px] ml-2">
            DAVOS 2026
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/company/anvi-ai/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-5 h-5 text-[#7B2CBF]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <p className="text-[#aba6a6] text-[13px] leading-[19.5px] font-regular font-noto-sans">© 2026 ANVI. All rights reserved.</p>
        </div>

        <div className="">
          <p className="text-[#aba6a6] text-[13px] leading-[19.5px] font-regular font-noto-sans">
            <a href="mailto:contact@anvi.ai" className="active:text-purple-600 underline">
              contact@anvi.ai
            </a>
            {' | '}
            <a href="tel:+971554982764" className="active:text-purple-600">
              +971-554982764
            </a>
          </p>
        </div>

        <div className="flex gap-4 text-[13px] leading-[19.5px] font-regular font-noto-sans">
          <a
            href="https://www.anvi.ai/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#aba6a6] leading-[19.5px] font-regular font-noto-sans hover:text-purple-600 flex items-start"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.anvi.ai/compliance-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#aba6a6] hover:text-purple-600 flex items-start"
          >
            Terms of Use
          </a>
        </div>
      </div>

      {/* Desktop Layout - Horizontal Single Line */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-6">
        {/* Left: Logo + DAVOS 2026 */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/Image.svg"
            alt="ANVI"
            width={46}
            height={20}
            className="object-contain"
          />
          <span className="text-[#7B2CBF] text-[16px] font-bold font-helvetica leading-[12.57px] ml-2">
            DAVOS 2026
          </span>
        </div>

        {/* Center: Copyright, Privacy Policy, Terms of Use */}
        <div className="flex items-center gap-4 text-[#aba6a6] text-[16px] leading-[19.5px] font-regular font-noto-sans">
          <span>© 2026 ANVI. All rights reserved.</span>
          <a
            href="https://www.anvi.ai/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.anvi.ai/compliance-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600"
          >
            Terms of Use
          </a>
        </div>

        {/* Right: LinkedIn, Email, Phone */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="https://www.linkedin.com/company/anvi-ai/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-5 h-5 text-[#7B2CBF]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <p className="text-[#aba6a6] text-[16px] leading-[19.5px] font-regular font-noto-sans whitespace-nowrap">
            <a href="mailto:contact@anvi.ai" className="hover:text-purple-600 underline">
              contact@anvi.ai
            </a>
            {' | '}
            <a href="tel:+971554982764" className="hover:text-purple-600">
              +971-554982764
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
