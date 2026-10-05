/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PowerBiShowcase } from './components/PowerBiShowcase';
import { CorporateTraining } from './components/CorporateTraining';
import { AboutMe } from './components/AboutMe';
import { MaturityDiagnostic } from './components/MaturityDiagnostic';
import { ConsultingServices } from './components/ConsultingServices';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [preFilledContactMessage, setPreFilledContactMessage] = useState<string>('');
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiagnosticHandover = (message: string) => {
    setPreFilledContactMessage(message);
    scrollToContact();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* 3-Zone Navigation Header */}
        <Navbar onOpenContact={scrollToContact} />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero onOpenContact={scrollToContact} />

          {/* Consulting Services & Engagement Methodology */}
          <ConsultingServices onOpenContact={scrollToContact} />

          {/* Featured Power BI Live Embed & Case Studies */}
          <PowerBiShowcase />

          {/* Corporate Training & Team Enablement */}
          <CorporateTraining onOpenContact={scrollToContact} />

          {/* Quem Sou Eu — Mini Currículo & Perfil Profissional */}
          <AboutMe onOpenContact={scrollToContact} />

          {/* Interactive Data Maturity Diagnostic Tool */}
          <MaturityDiagnostic onPreFillContact={handleDiagnosticHandover} />

          {/* Proposal & Contact Section with WhatsApp & Direct Email */}
          <ContactSection preFilledMessage={preFilledContactMessage} />
        </main>

        {/* Quiet, Compliant Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
