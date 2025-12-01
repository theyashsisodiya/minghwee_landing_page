import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, CheckCircle, Star,
  ShieldCheck, Target, Zap, HeartHandshake,
  Home, Sparkles, Briefcase, TrendingUp, ChevronDown
} from 'lucide-react';
import Lenis from 'lenis';
import { NAV_LINKS, TESTIMONIALS, FAQS } from './constants';
import { Assistant } from './components/Assistant';

// Access global GSAP objects from CDN
const getGsap = () => (window as any).gsap;
const getScrollSmoother = () => (window as any).ScrollSmoother;
const getScrollTrigger = () => (window as any).ScrollTrigger;

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    const ScrollSmoother = getScrollSmoother();
    const ScrollTrigger = getScrollTrigger();
    
    let lenis: Lenis | null = null;
    let rafId: number;

    // PRIMARY: Try to use GSAP ScrollSmoother (CDN)
    if (gsap && ScrollSmoother && ScrollTrigger) {
      console.log("Initializing Primary Scroll: GSAP ScrollSmoother");
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });

      // GSAP Text Reveal
      if (heroTextRef.current) {
         gsap.to(heroTextRef.current, {
          duration: 1.5,
          text: {
            value: 'Where Trust Meets <span class="text-brand-terracotta italic">Care</span> in Domestic Work.',
            delimiter: "" 
          },
          ease: "power2.out",
          delay: 0.2
        });
      }

    } else {
      // SECONDARY: Fallback to Lenis if CDN fails or plugin is locked
      console.log("Initializing Secondary Scroll: Lenis");
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      // Clean up GSAP if needed (optional)
      const st = getScrollTrigger();
      if(st) st.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-gray-800 selection:bg-brand-honey selection:text-brand-burgundy">
      {/* Navigation (Fixed outside smooth wrapper) */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-brand-cream/60 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img 
              src="https://github.com/theyashsisodiya/Minghwee_Job_Portal/blob/main/removed-background.png?raw=true" 
              alt="MingHwee Logo" 
              className="h-12 w-auto object-contain" 
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} className="text-gray-600 hover:text-brand-terracotta font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <button className="bg-brand-terracotta text-white px-6 py-2 rounded-full hover:bg-brand-coral transition-all transform hover:scale-105 shadow-lg shadow-brand-terracotta/20">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Fixed outside smooth wrapper) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-200">
          <button className="absolute top-6 right-6 p-2 text-gray-500 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-brand-burgundy hover:text-brand-terracotta">
              {link.label}
            </a>
          ))}
          <button className="bg-brand-terracotta text-white px-8 py-3 rounded-full text-lg shadow-xl">
            Get Started
          </button>
        </div>
      )}

      {/* Chat Assistant (Fixed outside smooth wrapper) */}
      <Assistant />

      {/* SMOOTH WRAPPER START (Required for GSAP ScrollSmoother) */}
      <div id="smooth-wrapper">
        <div id="smooth-content" className="will-change-transform">

          {/* Hero Section */}
          <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-honey/20 to-transparent -z-10 rounded-l-full blur-3xl" />
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <motion.div style={{ opacity: heroOpacity, y: heroY }} className="space-y-6 max-w-xl">
                <span className="inline-block px-4 py-1 bg-brand-terracotta/10 text-brand-terracotta rounded-full text-sm font-semibold tracking-wide">
                  #1 TRUSTED PLATFORM
                </span>
                {/* Text Reveal Target */}
                <h1 ref={heroTextRef} className="font-serif text-4xl md:text-6xl font-bold text-brand-burgundy leading-tight min-h-[1.2em]">
                  Where Trust Meets <span className="text-brand-terracotta italic">Care</span> in Domestic Work.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connecting families with verified helpers through respect, safety, and heart. We believe every home deserves peace of mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-brand-coral transition-all shadow-lg shadow-brand-terracotta/25 flex items-center justify-center gap-2 group">
                    Find a Helper <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white text-brand-terracotta border-2 border-brand-terracotta/20 px-8 py-4 rounded-full font-medium hover:bg-brand-beige transition-all flex items-center justify-center gap-2">
                    Find a Job
                  </button>
                </div>
                
                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-lg font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-terracotta" />
                    <span className="text-lg">100% Verified Helpers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-6 h-6 text-brand-terracotta" />
                    <span className="text-lg">10,000+ Happy Families</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative will-change-transform"
              >
                <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                  <img 
                    src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641511983161.png?raw=true" 
                    alt="Happy multi-generational family" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* GLASS MORPHISM CARD - No Bounce */}
                <div className="absolute -bottom-10 -left-10 w-48 bg-white/30 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-white/50">
                  <div className="bg-green-100/90 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Verified Match</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          {/* For Employers Section */}
          <section id="employers" className="py-24 bg-brand-beige rounded-t-[3rem] overflow-hidden z-10 relative pb-32">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-16">
                {/* Left Content */}
                <div className="flex-1 space-y-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Your New Family Member Awaits</h2>
                  <p className="text-lg text-gray-600">
                    We connect you with caring, verified domestic helpers who become part of your family. Hire with peace of mind.
                  </p>

                  <div className="space-y-8">
                    {[
                      { Icon: ShieldCheck, title: "Verified & Trusted Helpers", desc: "Pre-screened professionals committed to quality care." },
                      { Icon: Target, title: "Perfect Match Guarantee", desc: "Helpers matched to your household needs and values." },
                      { Icon: Zap, title: "Fast & Seamless Hiring", desc: "Complete the process in weeks, not months." },
                      { Icon: HeartHandshake, title: "Ongoing Support", desc: "We're here to ensure a smooth, successful placement." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-14 h-14 bg-white text-brand-terracotta rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <item.Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-lg mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-all shadow-lg shadow-brand-terracotta/25">
                        Find a Helper
                      </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 relative will-change-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-honey/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <img 
                      src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641512802620.png?raw=true"
                      alt="Caregiver helping elderly"
                      className="rounded-[2rem] shadow-2xl object-cover h-[600px] w-full relative z-10"
                  />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg z-20 max-w-xs border border-white/50">
                      <p className="text-gray-600 italic mb-2 font-medium text-lg">"I found someone my family trusts completely."</p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* For Helpers Section */}
          <section id="helpers" className="py-24 bg-white relative overflow-hidden rounded-t-[3rem] z-20 -mt-12 pb-32">
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-honey/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-6">
              <div className="flex flex-col-reverse md:flex-row items-center gap-16">
                <div className="flex-1 relative will-change-transform">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-terracotta/10 rounded-full z-0" />
                  <img 
                    src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641513130171.png?raw=true"
                    alt="Professional domestic cleaning"
                    className="relative z-10 rounded-[2rem] shadow-2xl object-cover h-[500px] w-full"
                  />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg z-20 max-w-xs">
                    <p className="text-gray-600 italic mb-2 text-lg">"I found a family that respects me."</p>
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Your Next Great Job Awaits</h2>
                  <p className="text-lg text-gray-600">
                    We connect you with families who value your skills and dedication. Build your career with dignity.
                  </p>

                  <div className="space-y-8">
                    {[
                      { Icon: Home, title: "Verified Employers", desc: "Work with families committed to fair treatment." },
                      { Icon: Sparkles, title: "Showcase Your Skills", desc: "Professional profiles that highlight your experience." },
                      { Icon: Briefcase, title: "Fair Opportunities", desc: "Transparent salaries and clear expectations." },
                      { Icon: TrendingUp, title: "Career Growth", desc: "Access training resources and career support." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-14 h-14 bg-brand-cream text-brand-burgundy rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <item.Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-lg mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="bg-brand-honey text-brand-burgundy px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-200/50">
                    Get a Job
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stories Section */}
          <section id="stories" className="py-24 bg-brand-cream rounded-t-[3rem] overflow-hidden z-30 -mt-12 pb-32">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Stories of Trust</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((story) => (
                  <motion.div 
                    key={story.id}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-brand-beige flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-brand-cream">
                      <img src={story.image} alt={story.author} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-600 italic mb-6 text-lg">"{story.quote}"</p>
                    <div>
                      <h4 className="font-bold text-brand-burgundy">{story.author}</h4>
                      <span className="text-sm text-brand-terracotta font-medium uppercase tracking-wide">{story.role}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-white rounded-t-[3rem] overflow-hidden z-40 -mt-12 pb-32">
            <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-brand-burgundy mb-12 text-center">Common Questions</h2>
              <div className="space-y-6">
                {FAQS.map((faq, i) => (
                  <motion.div 
                    key={i} 
                    className={`rounded-2xl p-6 transition-colors cursor-pointer ${openFaqIndex === i ? 'bg-brand-cream' : 'bg-gray-50'}`}
                    onClick={() => toggleFaq(i)}
                    whileHover={{ 
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                  >
                    <div className="flex items-center justify-between font-semibold text-gray-800">
                      {faq.question}
                      <motion.span
                        animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-brand-terracotta" />
                      </motion.span>
                    </div>
                    <AnimatePresence>
                      {openFaqIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-gray-600 leading-relaxed text-lg pb-2">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 bg-brand-terracotta text-white relative overflow-hidden rounded-t-[3rem] z-0 -mt-12 pb-48">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to find your match?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Join thousands of families and helpers building better lives together.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-brand-terracotta px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                  Get Started Today
                </button>
                <button className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-16 rounded-t-[3rem] overflow-hidden z-10 -mt-24 relative">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-12">
                <div className="space-y-4">
                  <span className="font-serif text-2xl font-bold text-white block">MingHwee</span>
                  <p className="text-sm text-gray-400">Restoring dignity and trust to domestic work, one connection at a time.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">For Employers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Browse Helpers</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Safety Guide</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">For Helpers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Find Jobs</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Upload Profile</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Training</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>support@minghwee.com</li>
                    <li>+65 1234 5678</li>
                    <li>123 Orchard Road, Singapore</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; 2024 MingHwee. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white">Privacy</a>
                  <a href="#" className="hover:text-white">Terms</a>
                </div>
              </div>
            </div>
          </footer>

        </div>{/* End of smooth-content */}
      </div>{/* End of smooth-wrapper */}
    </div>
  );
}

export default App;