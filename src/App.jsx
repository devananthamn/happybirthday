import React, { useState } from 'react';
import FloatingElements from './components/common/FloatingElements';
import MusicPlayer from './components/common/MusicPlayer';
import ScrollToTop from './components/common/ScrollToTop';

import IntroGate from './components/sections/IntroGate';
import OpeningSurprise from './components/sections/OpeningSurprise';
import HeroSection from './components/sections/HeroSection';
import FriendshipScrapbook from './components/sections/FriendshipScrapbook';
import BirthdayLetter from './components/sections/BirthdayLetter';
import BirthdayCakeFinale from './components/sections/BirthdayCakeFinale';

export default function App() {
  // Playful first question screen: "Do you want to read?"
  const [isIntroGateOpen, setIsIntroGateOpen] = useState(true);
  // Opening surprise gift box modal opens right after clicking Yes
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  // Current active section tab: 'home' | 'memories' | 'letter' | 'wishcake'
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-pink-200">
      {/* Ambient background particles */}
      <FloatingElements />

      {/* Playful First Gatekeeper Screen: Do you want to read? */}
      <IntroGate
        isOpen={isIntroGateOpen}
        onAccept={() => {
          setIsIntroGateOpen(false);
          setIsSurpriseOpen(true);
        }}
      />

      {/* Opening Full-screen Birthday Gift Box Surprise */}
      <OpeningSurprise 
        isOpen={isSurpriseOpen} 
        onClose={() => {
          setIsSurpriseOpen(false);
          setActiveTab('home');
        }} 
      />


      {/* Main Tabbed Experience: Only rendered once user has entered the site */}
      {!isIntroGateOpen && !isSurpriseOpen && (
        <main>
          {activeTab === 'home' && (
            <HeroSection onNavigate={handleNavigate} />
          )}

          {activeTab === 'memories' && (
            <FriendshipScrapbook />
          )}

          {activeTab === 'letter' && (
            <BirthdayLetter defaultOpen={false} />
          )}

          {activeTab === 'wishcake' && (
            <BirthdayCakeFinale />
          )}

          {/* Bottom Back-to-Home button when viewing a specific section */}
          {activeTab !== 'home' && (
            <div style={{ textAlign: 'center', padding: '30px 20px 80px' }}>
              <button
                onClick={() => handleNavigate('home')}
                className="btn-primary back-home-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 30px',
                  fontSize: '0.92rem',
                }}
              >
                <span>← Back to Gifts Overview 🎀</span>
              </button>
            </div>
          )}
        </main>
      )}

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
