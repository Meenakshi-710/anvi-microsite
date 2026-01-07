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

  const handleToggle = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleRequestInvite = () => {
    setActiveSection('program');
    setTimeout(() => {
      const programElement = document.getElementById('program-section');
      if (programElement) {
        programElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto">
        <Header isDialogueOpen={dialogueStep !== 'none'} />

        <main className="px-[27px]">
          <ArthaSutra
            isOpen={activeSection === 'arthasutra'}
            onToggle={() => handleToggle('arthasutra')}
            onRequestInvite={handleRequestInvite}
            onRequestDialogue={() => setDialogueStep('intro')}
          />
          <WhyAttend
            isOpen={activeSection === 'whyattend'}
            onToggle={() => handleToggle('whyattend')}
          />
          <div id="program-section">
            <Program
              isOpen={activeSection === 'program'}
              onToggle={() => handleToggle('program')}
              selectedSessions={selectedSessions}
              onSessionToggle={handleSessionToggle}
            />
          </div>
          <RequestInvite
            isOpen={activeSection === 'requestinvite'}
            onToggle={() => handleToggle('requestinvite')}
            hasSelectedSessions={selectedSessions.size > 0}
          />
          <ANVIIndia
            isOpen={activeSection === 'anviindia'}
            onToggle={() => handleToggle('anviindia')}
            onRequestDialogue={() => setDialogueStep('intro')}
            onRequestSpeaker={() => setSpeakerStep('intro')}
          />
          <ANVIGlobal
            isOpen={activeSection === 'anviglobal'}
            onToggle={() => handleToggle('anviglobal')}
            onRequestDialogue={() => setDialogueStep('intro')}
            onRequestSpeaker={() => setSpeakerStep('intro')}
          />
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
