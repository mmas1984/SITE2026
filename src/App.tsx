/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PowerBiShowcase } from './components/PowerBiShowcase';
import { StackSection } from './components/StackSection';
import { ArticlesSection } from './components/ArticlesSection';
import { MaturityDiagnostic } from './components/MaturityDiagnostic';
import { ConsultingServices } from './components/ConsultingServices';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [preFilledContactMessage, setPreFilledContactMessage] = useState<string>('');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* 3-Zone Navigation Header */}
      <Navbar onOpenContact={scrollToContact} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenContact={scrollToContact} />

        {/* Consulting Services & Engagement Methodology */}
        <ConsultingServices onOpenContact={scrollToContact} />

        {/* Featured Power BI Live Embed & Case Studies */}
        <PowerBiShowcase />

        {/* Technical Stack Deep-Dive & Code Workbench */}
        <StackSection />

        {/* Authority & Technical Articles */}
        <ArticlesSection />

        {/* Interactive Data Maturity Diagnostic Tool */}
        <MaturityDiagnostic onPreFillContact={handleDiagnosticHandover} />

        {/* Proposal & Contact Section with WhatsApp & Direct Email */}
        <ContactSection preFilledMessage={preFilledContactMessage} />
      </main>

      {/* Quiet, Compliant Footer */}
      <Footer />
    </div>
  );
}
