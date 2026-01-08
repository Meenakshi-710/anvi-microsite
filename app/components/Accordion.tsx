'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Accordion({ title, children, defaultOpen = false, isOpen: controlledIsOpen, onToggle }: AccordionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!isOpen);
    }
  };

  return (
    <div className="border-b border-[#7921B1]">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-4 text-left active:opacity-80 transition-opacity h-auto"
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
      >
        <h2 className={`${isOpen ? 'text-[26px] font-semibold' : 'text-[16px] font-regular'} text-black flex-1 pr-2`}>{title}</h2>
        <span className="text-[#7921B1] text-2xl font-light min-w-[44px] flex items-center justify-end">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-700 leading-relaxed text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
