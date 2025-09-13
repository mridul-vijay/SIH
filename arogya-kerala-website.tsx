import React, { useState, useEffect } from 'react';

// Custom SVG Icons as React Components
const ShieldPlusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const SyringeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428l-7.071 7.071a2 2 0 01-2.828 0L4 17.071a2 2 0 010-2.828l7.071-7.071M19.428 15.428L22 13l-4.243-4.243M19.428 15.428l-4.243 4.243M9.172 9.172L5.636 5.636a2 2 0 00-2.828 0l-.707.707a2 2 0 000 2.828L5.636 12.707" />
  </svg>
);

const VideoCameraIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const BrokenDocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12" />
  </svg>
);

const VirusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    <circle cx="12" cy="12" r="4" strokeWidth={2} />
    <circle cx="12" cy="8" r="1" strokeWidth={2} />
    <circle cx="12" cy="16" r="1" strokeWidth={2} />
    <circle cx="16" cy="12" r="1" strokeWidth={2} />
    <circle cx="8" cy="12" r="1" strokeWidth={2} />
  </svg>
);

const ScalesIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArogyaKeralaWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Inter', sans-serif;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-teal-600">
              Arogya Kerala
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'The Challenge', 'Features', 'SDG Impact', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-slate-700 hover:text-teal-600 transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-teal-600 transition-colors duration-300"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 pt-20">
            <nav className="flex flex-col items-center space-y-8 pt-8">
              {['Home', 'The Challenge', 'Features', 'SDG Impact', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-2xl text-slate-700 hover:text-teal-600 transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
                Lighting the Way to <span className="text-teal-600">Health</span> for Every Migrant Worker in Kerala
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                A digital initiative to ensure accessible healthcare, prevent disease transmission, and build a healthier community, aligned with global sustainability goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Register a Worker
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none">
                  {/* Background circles */}
                  <circle cx="200" cy="200" r="180" fill="#f0fdfa" opacity="0.5"/>
                  <circle cx="200" cy="200" r="120" fill="#ccfbf1" opacity="0.5"/>
                  
                  {/* Central medical cross */}
                  <rect x="180" y="140" width="40" height="120" fill="#14b8a6" rx="8"/>
                  <rect x="140" y="180" width="120" height="40" fill="#14b8a6" rx="8"/>
                  
                  {/* Surrounding health elements */}
                  <circle cx="120" cy="120" r="20" fill="#f59e0b" opacity="0.8"/>
                  <circle cx="280" cy="120" r="15" fill="#10b981" opacity="0.8"/>
                  <circle cx="320" cy="280" r="18" fill="#3b82f6" opacity="0.8"/>
                  <circle cx="80" cy="280" r="22" fill="#ef4444" opacity="0.8"/>
                  
                  {/* Connecting lines */}
                  <path d="M120 120 L180 160" stroke="#14b8a6" strokeWidth="3" opacity="0.6"/>
                  <path d="M280 120 L220 160" stroke="#14b8a6" strokeWidth="3" opacity="0.6"/>
                  <path d="M320 280 L220 240" stroke="#14b8a6" strokeWidth="3" opacity="0.6"/>
                  <path d="M80 280 L180 240" stroke="#14b8a6" strokeWidth="3" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section id="the-challenge" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">The Challenge</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Migrant workers in Kerala face significant healthcare barriers that impact both individual and public health outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrokenDocumentIcon />,
                title: "Fragmented Health Records",
                description: "Scattered medical history across different providers makes continuity of care nearly impossible for mobile workers."
              },
              {
                icon: <VirusIcon />,
                title: "Public Health Risks",
                description: "Untracked health status increases risk of disease outbreaks and compromises community health safety."
              },
              {
                icon: <ScalesIcon />,
                title: "Healthcare Inequity",
                description: "Limited access to healthcare services creates disparities and excludes vulnerable populations from essential care."
              }
            ].map((challenge, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-red-500 mb-6">
                  {challenge.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{challenge.title}</h3>
                <p className="text-slate-600 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Comprehensive Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform provides a complete digital health ecosystem designed specifically for migrant workers and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldPlusIcon />,
                title: "Secure Digital Records",
                description: "Encrypted, blockchain-secured health records accessible anywhere with proper authorization."
              },
              {
                icon: <GlobeIcon />,
                title: "Multilingual Interface",
                description: "Support for Malayalam, Hindi, Tamil, and English to ensure accessibility for all workers."
              },
              {
                icon: <BellIcon />,
                title: "Disease Outbreak Alerts",
                description: "Real-time notifications and contact tracing to prevent disease transmission."
              },
              {
                icon: <SyringeIcon />,
                title: "Vaccination Tracking",
                description: "Complete immunization records and automated reminders for scheduled vaccinations."
              },
              {
                icon: <VideoCameraIcon />,
                title: "Telemedicine Access",
                description: "Remote consultations with certified healthcare providers through secure video calls."
              },
              {
                icon: <ChartIcon />,
                title: "Health Analytics Dashboard",
                description: "Comprehensive insights for health officials to track population health trends."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-teal-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Impact Section */}
      <section id="sdg-impact" className="py-20 bg-gradient-to-r from-teal-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Aligned with UN Sustainable Development Goals</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our initiative directly contributes to achieving global sustainability targets and building a more equitable world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Good Health and Well-being</h3>
              <p className="text-slate-600 leading-relaxed">
                Ensuring healthy lives and promoting well-being for all migrant workers at all ages through accessible healthcare services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">10</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Reduced Inequalities</h3>
              <p className="text-slate-600 leading-relaxed">
                Reducing inequality within Kerala by ensuring equal access to healthcare services for all residents, regardless of origin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">11</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Sustainable Cities</h3>
              <p className="text-slate-600 leading-relaxed">
                Making cities and human settlements inclusive, safe, resilient, and sustainable through comprehensive health monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join us in revolutionizing healthcare for migrant workers. Whether you're a healthcare provider, NGO, or government official, there's a role for you in this transformative initiative.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-teal-400">Email</h3>
                  <p className="text-slate-300">contact@arogyakerala.gov.in</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-400">Phone</h3>
                  <p className="text-slate-300">+91 471 2345 678</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-400">Address</h3>
                  <p className="text-slate-300">Kerala Health Department<br />Thiruvananthapuram, Kerala 695001</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">Kerala Health Dept.</a>
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">WHO Kerala</a>
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">UN SDG Portal</a>
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">NRHM Kerala</a>
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">Kerala Migration Survey</a>
                <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors duration-300">Digital Kerala</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Arogya Kerala. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArogyaKeralaWebsite;