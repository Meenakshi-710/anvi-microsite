'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface DialogueRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
}

export default function DialogueRequestModal({ isOpen, onClose, onProceed }: DialogueRequestModalProps) {
    // Prevent scrolling when modal is open
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
            className="fixed inset-0 z-50 flex items-start justify-center pt-[57px] bg-black/50"
            onClick={onClose}
        >
            <div
                className="relative w-[calc(100%-48px)] max-w-[520px] md:max-w-[720px] bg-white px-6 md:px-12 py-[48px] md:py-[60px] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#333333] hover:text-black transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Content */}
                <div className="flex flex-col space-y-6 pt-2">
                    <h2 className="text-[#000000] text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[44px] font-noto-sans">
                        Request a Strategic Dialogue at ANVI Davos 2026
                    </h2>

                    <p className="text-[#666666] text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] font-noto-sans">
                        Artha Sutra dialogues are private, invitation-only conversations convened during WEF Week. Requests are reviewed by the ANVI Secretariat.
                    </p>

                    <button
                        className="w-full h-[48px] md:h-[54px] bg-[#7921B1] text-white flex justify-center items-center text-[15px] md:text-[17px] font-noto-sans font-semibold transition-colors mt-2 hover:bg-[#621B91]"
                        onClick={onProceed}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
