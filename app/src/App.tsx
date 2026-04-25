import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { label: "L'Esperienza", id: "esperienza-live" },
    { label: "I Casi", id: "i-casi" },
    { label: "Il Kit", id: "il-kit" },
    { label: "Contatti", id: "prezzo" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] border-b transition-all duration-500"
      style={{
        borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
        background: scrolled ? 'rgba(10, 10, 12, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        height: 64,
      }}
    >
      <div className="content-max flex items-center justify-between h-full">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-sm tracking-[3px] text-[#F2EBE1]">
          BIBLIOTHECA
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-[13px] font-body font-normal transition-colors duration-300 hover:text-[#F2EBE1]"
              style={{ color: 'rgba(242, 235, 225, 0.6)' }}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('prezzo')} className="cta-primary text-[13px] py-2.5 px-6">
            Acquista Ora
          </button>
        </div>
        <button className="md:hidden text-[#F2EBE1]" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full py-6 px-10 flex flex-col gap-4" style={{ background: 'rgba(10, 10, 12, 0.97)' }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-base" style={{ color: 'rgba(242,235,225,0.7)' }}>{l.label}</button>
          ))}
          <button onClick={() => scrollTo('prezzo')} className="cta-primary text-center mt-2">Acquista Ora</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO — Video background (lightweight)
   ═══════════════════════════════════════════ */
function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      .to(headRef.current, { opacity: 1, y: 0, duration: 1.0 }, '-=0.4')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="images/vid-hero-ink.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.6) 60%, rgba(10,10,12,0.95) 100%)' }} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span ref={labelRef} className="label-faded mb-6 opacity-0 translate-y-5">ARCHIVIO CASI IRRISOLTI</span>
        <h1 ref={headRef} className="heading-display opacity-0 translate-y-5 max-w-4xl" style={{ whiteSpace: 'pre-line' }}>
          {"Il gioco si gioca\nnegli scaffali."}
        </h1>
        <p ref={subRef} className="body-text text-lg mt-6 max-w-2xl opacity-0 translate-y-5" style={{ whiteSpace: 'pre-line' }}>
          {"Un dossier fisico. Una libreria vera. Un forziere da aprire.\nNiente app. Niente QR. Solo tu, i libri e il mistero."}
        </p>
        <button
          ref={ctaRef}
          onClick={() => document.getElementById('esperienza-live')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta-outline mt-12 opacity-0 translate-y-5"
        >
          Scopri come funziona
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ESPERIENZA LIVE — The core differentiator
   ═══════════════════════════════════════════ */
function EsperienzaLive() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.live-text', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.live-img', { scale: 1.05, opacity: 0, duration: 1.0, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.from('.live-step', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.live-steps', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: "Ritira il dossier in libreria", desc: "Ricevi la busta sigillata al banco. Dentro: la mappa, gli indizi, il primo enigma." },
    { num: '02', title: "Esplora gli scaffali reali", desc: "ISBN, autori e dorsi dei libri in vendita diventano il tuo campo di indagine." },
    { num: '03', title: "Risolvi gli enigmi fisici", desc: "Griglia di Cardano, filtri ottici, codici nascosti — tutto materiale, tutto tangibile." },
    { num: '04', title: "Apri il forziere", desc: "La combinazione finale sblocca il lucchetto. Il caso si chiude. Il ricordo resta." },
  ];

  return (
    <section id="esperienza-live" ref={sectionRef} className="bg-primary-dark" style={{ padding: '160px 0' }}>
      <div className="content-max">
        {/* Header */}
        <div className="live-text text-center mb-16">
          <span className="label-accent">L&apos;ESPERIENZA</span>
          <h2 className="heading-section mt-4 mx-auto" style={{ whiteSpace: 'pre-line', maxWidth: 700 }}>
            {"Non un gioco da tavolo.\nUna caccia al tesoro tra i libri."}
          </h2>
          <p className="body-text mt-6 mx-auto max-w-2xl">
            Bibliotheca trasforma ogni libreria partner in una scena del crimine vivente. I giocatori si muovono tra gli scaffali reali, sfogliano volumi veri, e scoprono indizi nascosti tra le pagine di libri che possono poi acquistare. Nessuno schermo, nessuna app — solo l'intuito, il dialogo e l'atmosfera di una libreria che diviene palcoscenico.
          </p>
        </div>

        {/* Hero image of live gameplay */}
        <div className="live-img w-full overflow-hidden rounded-lg mb-20" style={{ aspectRatio: '16/9' }}>
          <img
            src="images/img-live-experience.jpg"
            alt="Giocatori che cercano indizi tra gli scaffali della libreria"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4 Steps */}
        <div className="live-steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="live-step p-6 rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)]" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="font-display text-4xl font-light" style={{ color: '#B8973D' }}>{s.num}</span>
              <h3 className="font-display text-xl font-normal text-[#F2EBE1] mt-4">{s.title}</h3>
              <p className="body-text text-sm mt-3">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Drive-to-store callout */}
        <div className="live-text mt-16 p-10 rounded-lg text-center" style={{ background: 'rgba(155, 45, 76, 0.08)', border: '1px solid rgba(155, 45, 76, 0.2)' }}>
          <h3 className="font-display text-2xl text-[#F2EBE1]">Un gioco che vende libri</h3>
          <p className="body-text mt-3 max-w-xl mx-auto">
            Durante una partita, i giocatori sfogliano in media 15-20 volumi. Il 40% acquista almeno un libro reale. Per le librerie, Bibliotheca è un ponte tra esperienza e vendita — non concorrenza, ma alleato.
          </p>
          <button onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })} className="cta-primary mt-6 text-sm">
            Diventa Libreria Partner
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COME FUNZIONA — Mechanics detail
   ═══════════════════════════════════════════ */
function ComeFunziona() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mech-left', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.mech-card', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const mechanics = [
    {
      title: 'Ricerca Bibliografica',
      desc: 'I codici ISBN, i nomi degli autori e persino i colori dei dorsi dei libri sugli scaffali diventano sequenze da decifrare. Ogni sezione della libreria nasconde un pezzo del puzzle.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
      ),
    },
    {
      title: 'Griglia di Cardano',
      desc: 'Una scheda forata da sovrapporre a pagine specifiche di libri presenti in libreria. Attraverso i fori, parole nascoste emergono dal testo sottostante.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
      ),
    },
    {
      title: 'Filtri Ottici',
      desc: 'La lente in acetato rosso inclusa nel kit rivela messaggi scritti con inchiostro invisibile. Ciò che appare bianco sulla carta, diventa prova sotto il filtro.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      ),
    },
    {
      title: 'Il Forziere Fisico',
      desc: 'Ogni kit contiene un forziere in legno con un lucchetto a combinazione. La soluzione finale del caso apre la serratura e rivela il finale della storia.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="bg-secondary-dark section-padding">
      <div className="content-max">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          <div className="lg:w-[40%] mech-left">
            <span className="label-accent">LE MECCANICHE</span>
            <h2 className="heading-section mt-4" style={{ whiteSpace: 'pre-line' }}>{"Strumenti da\ndetective vero."}</h2>
            <p className="body-text mt-6">
              Ogni meccanica è progettata per interagire con l&apos;ambiente fisico della libreria. Non decifri un codice sul telefono: lo costruisci con le tue mani sfogliando libri veri.
            </p>
          </div>
          <div className="lg:w-[60%] flex flex-col">
            {mechanics.map((m, i) => (
              <div key={i} className="mech-card py-8 flex items-start gap-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="mt-1 flex-shrink-0" style={{ color: '#B8973D' }}>{m.icon}</span>
                <div>
                  <h3 className="font-display text-2xl font-normal text-[#F2EBE1]">{m.title}</h3>
                  <p className="body-text mt-2 text-[15px]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   I TRE CASI
   ═══════════════════════════════════════════ */
function ITreCasi() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-header', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.case-card', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.case-grid', start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cases = [
    { color: '#4A7C59', num: 'CASO 001', title: 'Il Giardino di Carta', diff: 'Facile — 60 min', desc: 'Romance vittoriano tra gli scaffali. Cercate tra le edizioni di Austen e le Brontë. Per librerie di quartiere e prime investigazioni. Adatto anche a gruppi di neofiti.', img: '/images/img-case-green.jpg' },
    { color: '#B8973D', num: 'CASO 002', title: "L'Inchiostro Nero", diff: 'Medio — 90-120 min', desc: 'Thriller contemporaneo, indagine notturna. Il settore Gialli diventa un labirinto di sospetti. Per medie librerie e lettori coraggiosi. Atmosfera da noir.', img: '/images/img-case-yellow.jpg' },
    { color: '#9B2D4C', num: 'CASO 003', title: "L'Eredità degli Alchimisti", diff: 'Difficile — 3h+', desc: 'Fantasy alchemico e stregoneria tra i tomi di esoterismo. Per flagship store e cacciatori di verità. Un test per detective esperti.', img: '/images/img-case-red.jpg' },
  ];

  return (
    <section id="i-casi" ref={sectionRef} className="bg-primary-dark" style={{ padding: '160px 0' }}>
      <div className="content-max">
        <div className="case-header text-center mb-16">
          <span className="label-accent">I CAPI DELL&apos;ARCHIVIO</span>
          <h2 className="heading-section mt-4 mx-auto" style={{ whiteSpace: 'pre-line', maxWidth: 600 }}>{"Tre gradi di\nsegretezza."}</h2>
        </div>
        <div className="case-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="case-card overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="w-full h-1 mb-4" style={{ background: c.color }} />
                <span className="font-display italic text-sm" style={{ color: 'rgba(242,235,225,0.4)' }}>{c.num}</span>
                <h3 className="font-display text-2xl font-normal text-[#F2EBE1] mt-2">{c.title}</h3>
                <span className="font-body text-sm mt-1 block" style={{ color: 'rgba(242,235,225,0.5)' }}>{c.diff}</span>
                <p className="body-text text-[15px] mt-4">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   IL KIT
   ═══════════════════════════════════════════ */
function IlKit() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.kit-item', { y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { title: 'La Busta Sigillata', desc: 'Carta kraft con sigillo in ceralacca borgogna. Dentro: la lettera d\'incarico, la narrazione introduttiva e il primo indizio. Rompere il sigillo è il primo atto del mistero.', img: '/images/img-kit-envelope.jpg' },
    { title: 'La Mappa della Libreria', desc: 'Cartografia cartacea standardizzata per settori: Classici, Gialli, Saggi, Fantasy. Le coordinate nascoste nei documenti indirizzano i giocatori verso gli scaffali giusti.', img: '/images/img-kit-map.jpg' },
    { title: 'Il Forziere', desc: 'In legno scuro con lucchetto fisico a combinazione. La soluzione finale sblocca l\'apertura. Dentro, la risoluzione del caso — e una sorpresa per i detective più perspicaci.', img: '/images/img-kit-strongbox.jpg' },
  ];

  return (
    <section id="il-kit" ref={sectionRef} className="bg-secondary-dark section-padding">
      <div className="content-max">
        <div className="text-center mb-16">
          <span className="label-accent">CONTENUTO DEL DOSSIER</span>
          <h2 className="heading-section mt-4">Tutto ciò che serve. Niente di più.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="kit-item group">
              <div className="w-full overflow-hidden rounded-lg mb-5" style={{ aspectRatio: '3/2' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl font-normal text-[#F2EBE1]">{item.title}</h3>
              <p className="body-text text-[15px] mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <button onClick={() => document.getElementById('prezzo')?.scrollIntoView({ behavior: 'smooth' })} className="cta-primary">Ordina Ora</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIANZE
   ═══════════════════════════════════════════ */
function Testimonianze() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testim-card', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const quotes = [
    { text: "Abbiamo aperto la busta alle 14. Alle 16:30 eravamo ancora a cercare tra i gialli di Simenon. Mai dipendenza fu più nobile.", auth: "Giulia M., Roma" },
    { text: "Il forziere si è aperto con un click che ancora sento. Giocato in tre, discusso in cinque, ricordato per sempre.", auth: "Marco e Sara, Milano" },
    { text: "Ho comprato tre libri veri mentre cercavo l'indizio. È la missione del gioco, ovviamente.", auth: "Leo T., Firenze" },
  ];

  return (
    <section ref={sectionRef} className="bg-primary-dark section-padding">
      <div className="content-max">
        <div className="text-center mb-16">
          <span className="label-accent">TESTIMONIANZE</span>
          <h2 className="heading-section mt-4">Voci dall&apos;archivio.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div key={i} className="testim-card p-8 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-display italic text-lg leading-relaxed" style={{ color: 'rgba(242,235,225,0.8)' }}>&ldquo;{q.text}&rdquo;</p>
              <p className="font-body text-sm mt-6" style={{ color: 'rgba(242,235,225,0.4)' }}>{q.auth}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PREZZO
   ═══════════════════════════════════════════ */
function Prezzo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [price, setPrice] = useState(0);
  const countedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (countedRef.current) return;
          countedRef.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 29.90,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => setPrice(parseFloat(obj.val.toFixed(2))),
          });
        },
      });
      gsap.from('.price-el', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prezzo" ref={sectionRef} className="bg-secondary-dark" style={{ padding: '160px 0' }}>
      <div className="content-max text-center" style={{ maxWidth: 600 }}>
        <span className="label-accent price-el">INVESTIMENTO</span>
        <div className="price-el mt-6">
          <span className="font-display font-light" style={{ fontSize: 96, letterSpacing: '-2px', color: '#F2EBE1', lineHeight: 1 }}>{price.toFixed(2)}&euro;</span>
        </div>
        <p className="price-el font-body text-base mt-3" style={{ color: 'rgba(242,235,225,0.5)' }}>per dossier completo</p>
        <p className="price-el body-text mt-6">
          Giocabile da 3 a 6 persone. Costo per persona: 5-10&euro;. Un&apos;esperienza da 60 a 180 minuti tra gli scaffali della tua libreria.
        </p>
        <button className="price-el cta-primary mt-10 text-base" style={{ padding: '18px 48px' }}>Prenota il Tuo Caso</button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NEWSLETTER / LIBRERIE
   ═══════════════════════════════════════════ */
function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-el', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contatti" ref={sectionRef} className="bg-primary-dark" style={{ padding: '140px 0' }}>
      <div className="content-max flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="lg:w-1/2 news-el">
          <span className="label-accent">RIMANI AGGIORNATO</span>
          <h2 className="heading-section mt-4">Ricevi i nuovi casi.</h2>
          <p className="body-text mt-4">Ogni stagione, un nuovo caso. Iscriviti per essere avvisato quando l&apos;archivio si arricchisce di nuovi misteri.</p>
        </div>
        <div className="lg:w-1/2 w-full news-el">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="la-tua-email@archivio.it"
              className="flex-1 rounded-lg px-5 py-4 font-body text-base text-[#F2EBE1] placeholder:text-[rgba(242,235,225,0.3)] outline-none focus:border-[#B8973D] transition-colors duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button type="submit" className="rounded-lg px-8 py-4 font-body text-sm font-semibold transition-all duration-300 hover:brightness-110" style={{ background: '#B8973D', color: '#0A0A0C' }}>
              Iscriviti
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-secondary-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="content-max py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-base tracking-[3px] text-[#F2EBE1]">BIBLIOTHECA</span>
            <p className="font-body text-sm mt-2" style={{ color: 'rgba(242,235,225,0.4)' }}>Archivio Casi Irrisolti</p>
          </div>
          {[
            { title: 'Il Prodotto', links: ['Come Funziona', 'I Tre Casi', 'Il Kit', 'Prezzi'] },
            { title: 'Librerie', links: ['Diventa Partner', 'Lista Librerie', 'Eventi'] },
            { title: 'Supporto', links: ['FAQ', 'Contatti', 'Privacy', 'Termini'] },
          ].map((c, i) => (
            <div key={i}>
              <h4 className="font-body text-sm font-medium text-[#F2EBE1] mb-4">{c.title}</h4>
              <ul className="flex flex-col gap-2">
                {c.links.map((l, j) => (
                  <li key={j}>
                    <span className="font-body text-sm font-light cursor-pointer transition-colors duration-300 hover:text-[#F2EBE1]" style={{ color: 'rgba(242,235,225,0.5)' }}>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-14 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-body text-[13px]" style={{ color: 'rgba(242,235,225,0.3)' }}>&copy; 2025 Bibliotheca. Tutti i diritti riservati.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="cursor-pointer transition-colors duration-300 hover:text-[#F2EBE1]" style={{ color: 'rgba(242,235,225,0.4)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </span>
            <span className="cursor-pointer transition-colors duration-300 hover:text-[#F2EBE1]" style={{ color: 'rgba(242,235,225,0.4)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger after images load
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      lenis.destroy();
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Navigation />
      <Hero />
      <EsperienzaLive />
      <ComeFunziona />
      <ITreCasi />
      <IlKit />
      <Testimonianze />
      <Prezzo />
      <Newsletter />
      <Footer />
    </div>
  );
}
