'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface DialogueConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DialogueConfirmationModal({ isOpen, onClose }: DialogueConfirmationModalProps) {
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
                    aria-label="Close confirmation"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Content */}
                <div className="flex flex-col space-y-6 pt-2">
                    <h2 className="text-[#000000] text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[44px] font-noto-sans">
                        Thank you.
                    </h2>

                    <p className="text-[#666666] text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] font-noto-sans">
                        Your request has been received by the ANVI Davos Secretariat. Selected dialogues will be confirmed via email / WhatsApp.
                    </p>

                    <p className="text-[#ADADAD] text-[13px] md:text-[14px] leading-[20px] md:leading-[22px] font-noto-sans">
                        Due to limited capacity, not all requests can be accommodated.
                    </p>
                </div>
            </div>
        </div>
    );
}
