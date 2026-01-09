'use client';

import { useState } from 'react';
import Header from './components/Header';
import ArthaSutra from './components/ArthaSutra';
import WhyAttend from './components/WhyAttend';
import Program from './components/Program';
import RequestInvite from './components/RequestInvite';
import ANVIIndia from './components/ANVIIndia';
import ANVIGlobal from './components/ANVIGlobal';
import Footer from './components/Footer';
import DialogueRequestModal from './components/DialogueRequestModal';
import DialogueRequestForm from './components/DialogueRequestForm';
import DialogueConfirmationModal from './components/DialogueConfirmationModal';
import ANVISpeakerModal from './components/ANVISpeakerModal';
import SpeakerPartnerForm from './components/SpeakerPartnerForm';
import SpeakerPartnerConfirmationModal from './components/SpeakerPartnerConfirmationModal';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>('arthasutra');
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(new Set());
  const [dialogueStep, setDialogueStep] = useState<'none' | 'intro' | 'form' | 'confirmation'>('none');
  const [speakerStep, setSpeakerStep] = useState<'none' | 'intro' | 'form' | 'confirmation'>('none');

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleToggle = (section: string) => {
    const isOpening = activeSection !== section;
    setActiveSection(isOpening ? section : null);
    if (isOpening) {
      scrollToSection(`${section}-section`);
    }
  };

  const handleRequestInvite = () => {
    setActiveSection('program');
    scrollToSection('program-section');
  };

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const handleSubmitInterest = () => {
    setActiveSection('requestinvite');
    scrollToSection('requestinvite-section');
  };

  const handleSelectRoundtables = () => {
    setActiveSection('program');
    scrollToSection('program-section');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto">
        <Header isDialogueOpen={dialogueStep !== 'none'} />

        <main className="py-3 px-6">
          <div id="arthasutra-section" className="scroll-mt-16">
            <ArthaSutra
              isOpen={activeSection === 'arthasutra'}
              onToggle={() => handleToggle('arthasutra')}
              onRequestInvite={handleRequestInvite}
              onRequestDialogue={() => setDialogueStep('intro')}
            />
          </div>
          <div id="whyattend-section" className="scroll-mt-16">
            <WhyAttend
              isOpen={activeSection === 'whyattend'}
              onToggle={() => handleToggle('whyattend')}
            />
          </div>
          <div id="program-section" className="scroll-mt-16">
            <Program
              isOpen={activeSection === 'program'}
              onToggle={() => handleToggle('program')}
              selectedSessions={selectedSessions}
              onSessionToggle={handleSessionToggle}
              onSubmitInterest={handleSubmitInterest}
            />
          </div>
          <div id="requestinvite-section" className="scroll-mt-16">
            <RequestInvite
              isOpen={activeSection === 'requestinvite'}
              onToggle={() => handleToggle('requestinvite')}
              hasSelectedSessions={selectedSessions.size > 0}
              onSelectRoundtables={handleSelectRoundtables}
              selectedSessions={selectedSessions}
            />
          </div>
          <div id="anviindia-section" className="scroll-mt-16">
            <ANVIIndia
              isOpen={activeSection === 'anviindia'}
              onToggle={() => handleToggle('anviindia')}
              onRequestDialogue={() => setDialogueStep('intro')}
              onRequestSpeaker={() => setSpeakerStep('intro')}
            />
          </div>
          <div id="anviglobal-section" className="scroll-mt-16">
            <ANVIGlobal
              isOpen={activeSection === 'anviglobal'}
              onToggle={() => handleToggle('anviglobal')}
              onRequestDialogue={() => setDialogueStep('intro')}
              onRequestSpeaker={() => setSpeakerStep('intro')}
            />
          </div>
        </main>

        <Footer />

        <DialogueRequestModal
          isOpen={dialogueStep === 'intro'}
          onClose={() => setDialogueStep('none')}
          onProceed={() => setDialogueStep('form')}
        />

        <DialogueRequestForm
          isOpen={dialogueStep === 'form'}
          onClose={() => setDialogueStep('none')}
          onSubmit={() => setDialogueStep('confirmation')}
        />

        <DialogueConfirmationModal
          isOpen={dialogueStep === 'confirmation'}
          onClose={() => setDialogueStep('none')}
        />

        <ANVISpeakerModal
          isOpen={speakerStep === 'intro'}
          onClose={() => setSpeakerStep('none')}
          onProceed={() => setSpeakerStep('form')}
        />

        <SpeakerPartnerForm
          isOpen={speakerStep === 'form'}
          onClose={() => setSpeakerStep('none')}
          onSubmit={() => setSpeakerStep('confirmation')}
        />

        <SpeakerPartnerConfirmationModal
          isOpen={speakerStep === 'confirmation'}
          onClose={() => setSpeakerStep('none')}
        />
      </div>
    </div>
  );
}
