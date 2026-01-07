'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SpeakerPartnerConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SpeakerPartnerConfirmationModal({ isOpen, onClose }: SpeakerPartnerConfirmationModalProps) {
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
                className="relative w-[calc(100%-48px)] max-w-[420px] bg-white px-8 py-[60px] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
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
                    <h2 className="text-[#000000] text-[28px] font-bold leading-[36px] font-noto-sans">
                        Thank you.
                    </h2>

                    <div className="space-y-4">
                        <p className="text-[#666666] text-[16px] leading-[26px] font-noto-sans">
                            For your interest in ANVI.
                        </p>

                        <p className="text-[#ADADAD] text-[16px] leading-[26px] font-noto-sans">
                            Applications are reviewed by the ANVI leadership team. Selected contributors will be contacted directly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
