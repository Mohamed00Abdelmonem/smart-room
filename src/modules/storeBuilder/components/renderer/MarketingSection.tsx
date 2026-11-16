import React, { useState } from 'react';
import { StoreSection, GlobalThemeSettings, DeviceViewport } from '../../types';
import { Star, ChevronDown, Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

interface MarketingSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  viewport?: DeviceViewport;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({
  section,
  theme,
  viewport = 'desktop',
}) => {
  const { content, design, type, variant } = section;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  // 0A. ARCHITECTURAL FEATURES STRIP
  if (type === 'features') {
    const featGrid = isMobile
      ? 'grid grid-cols-1 gap-4'
      : isTablet
      ? 'grid grid-cols-2 gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6';

    return (
      <section
        className={`w-full ${isMobile ? 'py-10' : 'py-14 sm:py-20'} transition-colors border-y`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.background,
          color: design.textColor || theme.colors.text,
          borderColor: theme.colors.border,
        }}
      >
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
          style={{
            maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
          }}
        >
          {content.title && (
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              {content.tag && (
                <span className="text-[10px] tracking-[0.22em] font-bold uppercase block" style={{ color: theme.colors.accent }}>
                  {content.tag}
                </span>
              )}
              <h2
                className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold tracking-tight`}
                style={{ fontFamily: theme.typography.headingFont }}
              >
                {content.title}
              </h2>
            </div>
          )}

          <div className={`${featGrid} text-start`}>
            {(content.items || []).map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 rounded-2xl border space-y-2 transition-all"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <span className="text-xs font-mono font-bold block" style={{ color: theme.colors.accent }}>
                  {item.tag || `0${idx + 1}`}
                </span>
                <h4 className="font-bold text-sm" style={{ color: theme.colors.text }}>
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: theme.colors.mutedText }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 0B. ASYMMETRICAL LOOKBOOK GALLERY MOSAIC
  if (type === 'gallery') {
    const galleryItems = content.items || [];
    return (
      <section
        className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-22'} transition-colors`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.surface,
          color: design.textColor || theme.colors.text,
        }}
      >
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
          style={{
            maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5" style={{ borderColor: theme.colors.border }}>
            <div className="text-start space-y-1">
              {content.tag && (
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase block" style={{ color: theme.colors.accent }}>
                  {content.tag}
                </span>
              )}
              <h2
                className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'} font-bold tracking-tight`}
                style={{ fontFamily: theme.typography.headingFont }}
              >
                {content.title || 'Editorial Interior Lookbook'}
              </h2>
            </div>
            {content.subtitle && (
              <p className="text-xs sm:text-sm max-w-md text-start" style={{ color: theme.colors.mutedText }}>
                {content.subtitle}
              </p>
            )}
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-12 gap-5'}`}>
            {galleryItems.map((imgItem, idx) => {
              const spanClass =
                !isMobile && idx === 0
                  ? 'md:col-span-7 aspect-[16/10]'
                  : !isMobile && idx === 1
                  ? 'md:col-span-5 aspect-[16/10] md:aspect-auto'
                  : 'md:col-span-4 aspect-[4/3]';
              return (
                <div
                  key={imgItem.id || idx}
                  className={`relative overflow-hidden rounded-3xl border group ${spanClass}`}
                  style={{ borderColor: theme.colors.border }}
                >
                  <img
                    src={imgItem.imageUrl}
                    alt={imgItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-start text-white">
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-80 block">
                      {imgItem.subtitle || 'CURATED SPACE'}
                    </span>
                    <span className="font-bold text-sm sm:text-base block" style={{ fontFamily: theme.typography.headingFont }}>
                      {imgItem.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 1. TESTIMONIALS SECTION
  if (type === 'testimonials') {
    const testimonialGrid = isMobile
      ? 'grid grid-cols-1 gap-4'
      : isTablet
      ? 'grid grid-cols-2 gap-6'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8';

    return (
      <section 
        className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-24'} transition-colors`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.surface,
          color: design.textColor || theme.colors.text,
        }}
      >
        <div 
          className="mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
          }}
        >
          {content.tag && (
            <span 
              className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase block mb-2"
              style={{ color: theme.colors.accent }}
            >
              {content.tag}
            </span>
          )}

          <h2 
            className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'} font-bold tracking-tight mb-8 sm:mb-12`}
            style={{ fontFamily: theme.typography.headingFont }}
          >
            {content.title || 'Client Perspectives & Interior Reviews'}
          </h2>

          <div className={`${testimonialGrid} text-start`}>
            {(content.items || []).map((t, idx) => (
              <div 
                key={t.id || idx}
                className="p-5 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-4 shadow-2xs"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed italic" style={{ color: theme.colors.text }}>
                  "{t.description}"
                </p>

                <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: theme.colors.border }}>
                  <div>
                    <h4 className="font-bold text-xs" style={{ color: theme.colors.text }}>{t.title}</h4>
                    <span className="text-[10px] text-stone-500">{t.subtitle}</span>
                  </div>
                  {t.tag && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {t.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. FAQ ACCORDION SECTION
  if (type === 'faq') {
    return (
      <section 
        className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-24'} transition-colors`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.background,
          color: design.textColor || theme.colors.text,
        }}
      >
        <div 
          className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"
        >
          <div className="text-center mb-8 sm:mb-12">
            {content.tag && (
              <span 
                className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase block mb-2"
                style={{ color: theme.colors.accent }}
              >
                {content.tag}
              </span>
            )}
            <h2 
              className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'} font-bold tracking-tight mb-3`}
              style={{ fontFamily: theme.typography.headingFont }}
            >
              {content.title || 'Frequently Asked Questions'}
            </h2>
            {content.subtitle && (
              <p className="text-xs sm:text-sm text-stone-500">{content.subtitle}</p>
            )}
          </div>

          <div className="space-y-3">
            {(content.items || []).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div 
                  key={faq.id || idx}
                  className="rounded-2xl border transition-all overflow-hidden"
                  style={{ borderColor: theme.colors.border }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer gap-3"
                  >
                    <span className="font-bold text-xs sm:text-sm" style={{ color: theme.colors.text }}>
                      {faq.title}
                    </span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : 'text-stone-400'}`} />
                  </button>

                  {isOpen && (
                    <div 
                      className="px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 animate-fadeIn"
                      style={{ 
                        borderColor: theme.colors.border,
                        color: theme.colors.mutedText 
                      }}
                    >
                      {faq.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 3. NEWSLETTER VIP CLUB SECTION
  if (type === 'newsletter') {
    return (
      <section 
        className={`w-full ${isMobile ? 'py-12' : 'py-16 sm:py-24'} transition-colors`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.surface,
          color: design.textColor || theme.colors.text,
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center space-y-4 sm:space-y-6">
          {content.tag && (
            <span 
              className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase inline-block"
              style={{ color: theme.colors.accent }}
            >
              {content.tag}
            </span>
          )}

          <h2 
            className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold tracking-tight`}
            style={{ fontFamily: theme.typography.headingFont }}
          >
            {content.title || 'Join the Private Collector Circle'}
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed max-w-lg mx-auto" style={{ color: theme.colors.mutedText }}>
            {content.description || 'Receive curated exhibition catalogues, architectural previews, and exclusive invitations to private salon viewings in Cairo & Giza.'}
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you. Your atelier welcome dossier has been dispatched.</span>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setSubscribed(true);
              }}
              className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-2.5 max-w-md mx-auto pt-2`}
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your VIP email..."
                className="w-full px-4 py-3 rounded-full border text-xs text-stone-900 bg-white dark:bg-[#1E1C1A] dark:text-white focus:outline-hidden"
                style={{ borderColor: theme.colors.border }}
              />
              <button
                type="submit"
                className={`w-full ${isMobile ? '' : 'sm:w-auto'} px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90`}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }

  // 4. CONTACT ATELIER SECTION
  return (
    <section 
      className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-24'} transition-colors`}
      style={{
        backgroundColor: design.backgroundColor || theme.colors.background,
        color: design.textColor || theme.colors.text,
      }}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
        }}
      >
        <div className={`grid ${
          isMobile 
            ? 'grid-cols-1 gap-8' 
            : isTablet 
            ? 'grid-cols-1 md:grid-cols-2 gap-8' 
            : 'grid-cols-1 lg:grid-cols-12 gap-12'
        }`}>
          {/* Left Contact Info */}
          <div className={`${!isMobile && !isTablet ? 'lg:col-span-5' : ''} space-y-6 text-start`}>
            {content.tag && (
              <span 
                className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase block"
                style={{ color: theme.colors.accent }}
              >
                {content.tag}
              </span>
            )}
            <h2 
              className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold tracking-tight`}
              style={{ fontFamily: theme.typography.headingFont }}
            >
              {content.title || 'Schedule a Private Showroom Consultation'}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.colors.mutedText }}>
              {content.description || 'Our interior consultants and master spatial architects are available for private appointments at our Cairo showroom or on-site at your residence.'}
            </p>

            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold">Flagship Showroom</div>
                  <div className="text-stone-500">Plot 14, Commercial District, Sheikh Zayed City, Egypt</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold">Direct Line & WhatsApp</div>
                  <div className="text-stone-500">+20 (2) 3851 9900 · Daily 10 AM — 9 PM</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold">Architectural Inquiries</div>
                  <div className="text-stone-500">concierge@palazzofurniture.eg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div
            className={`${!isMobile && !isTablet ? 'lg:col-span-7' : ''} p-5 sm:p-8 rounded-2xl border shadow-xs text-start`}
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            {contactSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg">Inquiry Confirmed</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  A senior design advisor will contact you within 4 business hours to finalize your private showroom appointment.
                </p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Tarek Mansour"
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-hidden bg-stone-50 dark:bg-stone-900"
                      style={{ borderColor: theme.colors.border }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+20 10..."
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-hidden bg-stone-50 dark:bg-stone-900"
                      style={{ borderColor: theme.colors.border }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="tarek@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-hidden bg-stone-50 dark:bg-stone-900"
                    style={{ borderColor: theme.colors.border }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Project Details or Furniture Needs</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us about your space dimensions or desired collections..."
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-hidden bg-stone-50 dark:bg-stone-900 resize-none"
                    style={{ borderColor: theme.colors.border }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition shadow-md cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  Send Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
