import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowDown, BookOpen, Brain, Check, ChevronLeft, ChevronRight, Clock3, FileCheck2, FileQuestion, Layers3, ListChecks, MonitorSmartphone, SearchCheck, X } from 'lucide-react';
import { content } from './content.js';
import { comercial } from './comercial.js';
import guaranteeSeal from '../img/Selo Dourado de Compra Protegida.png';

const painIcons = [Clock3, Layers3, FileQuestion, BookOpen, Brain, AlertTriangle];
const mechanismIcons = [BookOpen, SearchCheck, Layers3, ListChecks];
const offerDurationMs = 30 * 60 * 1000;
const offerDeadlineStorageKey = 'mapa-aprovacao-offer-deadline';
const offerProlongedStorageKey = 'mapa-aprovacao-offer-prolonged';

function createStoredOfferDeadline(prolonged = false) {
  const nextDeadline = Date.now() + offerDurationMs;
  try {
    window.localStorage.setItem(offerDeadlineStorageKey, String(nextDeadline));
    window.localStorage.setItem(offerProlongedStorageKey, prolonged ? '1' : '0');
  } catch {
    // Ignore storage failures and keep the in-memory deadline for this session.
  }
  return { deadline: nextDeadline, prolonged };
}

function getOfferState() {
  const configuredDeadline = Date.parse(comercial.offerExpiresAt || '');
  if (Number.isFinite(configuredDeadline) && configuredDeadline > Date.now()) {
    return { deadline: configuredDeadline, prolonged: false };
  }
  if (typeof window === 'undefined') return { deadline: Date.now() + offerDurationMs, prolonged: false };

  try {
    const storedDeadline = Number(window.localStorage.getItem(offerDeadlineStorageKey));
    const prolonged = window.localStorage.getItem(offerProlongedStorageKey) === '1';
    if (Number.isFinite(storedDeadline) && storedDeadline > Date.now()) return { deadline: storedDeadline, prolonged };
    return createStoredOfferDeadline(Number.isFinite(storedDeadline) && storedDeadline > 0);
  } catch {
    return { deadline: Date.now() + offerDurationMs, prolonged: false };
  }
}

function formatOfferTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function OfferCountdownBar() {
  const [offerState, setOfferState] = useState(getOfferState);
  const [now, setNow] = useState(() => Date.now());
  const remaining = offerState.deadline - now;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      setOfferState(state => state.deadline <= currentTime ? createStoredOfferDeadline(true) : state);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <header className="brand-bar" aria-live="polite">
    <span className="offer-countdown__copy">{offerState.prolonged ? 'OFERTA PROLONGADA' : 'OFERTA ESPECIAL TERMINA EM'}</span>
    <span className="offer-countdown__timer">{formatOfferTime(remaining)}</span>
  </header>;
}

function CTA({ label = 'QUERO O MAPA DA APROVAÇÃO', href = '#oferta', className = 'btn--primary' }) {
  const showDownArrow = className.includes('btn--primary') || className.includes('btn--bonus');
  return <a className={`btn ${className}`.trim()} href={href}>{label}{showDownArrow && <ArrowDown size={20} aria-hidden="true" />}</a>;
}

function SectionTitle({ children, lead }) {
  return <header className="section-title"><h2>{children}</h2>{lead && <p>{lead}</p>}</header>;
}

function ProductComposition({ compact = false }) {
  return <div className={`product-composition${compact ? ' product-composition--compact' : ''}`} aria-label="Composição da coleção, com capa e páginas reais">
    <img className="product-sheet product-sheet--left" src="/assets/SUS-01-thumb.webp" alt="Mapa real sobre direito à saúde" width="636" height="900" loading={compact ? 'lazy' : 'eager'} />
    <img className="product-sheet product-sheet--middle" src="/assets/FUN-01-thumb.webp" alt="Mapa real sobre processo de Enfermagem" width="636" height="900" loading={compact ? 'lazy' : 'eager'} />
    <img className="product-sheet product-sheet--right" src="/assets/SUS-06-thumb.webp" alt="Mapa real sobre princípios do SUS" width="636" height="900" loading={compact ? 'lazy' : 'eager'} />
    <div className="cover-book"><img src="/assets/capa-enfermagem-v3.webp" alt="Nova capa do Mapa da Aprovação em Enfermagem" width="800" height="1120" loading={compact ? 'lazy' : 'eager'} fetchPriority={compact ? undefined : 'high'} /></div>
    <div className="phone-mockup"><img src="/assets/FUN-05-thumb.webp" alt="Mapa real de Fundamentos exibido no celular" width="636" height="900" loading={compact ? 'lazy' : 'eager'} /></div>
  </div>;
}

function ProductBundleMockup() {
  return <div className="bundle-composition" aria-label="Capas do produto principal e dos bônus">
    <img className="bundle-cover bundle-cover--bonus bundle-cover--questions" src="/assets/bonus-gabarito-cover-thumb.webp" alt="Capa do bônus Questões da Aprovação com gabarito comentado" width="636" height="900" loading="lazy" />
    <img className="bundle-cover bundle-cover--bonus bundle-cover--calculos" src="/assets/bonus-calculos-cover-thumb.webp" alt="Capa do bônus Treino de Cálculos de Enfermagem" width="636" height="900" loading="lazy" />
    <img className="bundle-cover bundle-cover--bonus bundle-cover--edital" src="/assets/bonus-edital-cover-thumb.webp" alt="Capa do bônus Do Edital ao Estudo" width="636" height="900" loading="lazy" />
    <img className="bundle-cover bundle-cover--main" src="/assets/capa-enfermagem-v3.webp" alt="Capa do Mapa da Aprovação em Enfermagem" width="800" height="1120" loading="lazy" />
    <img className="bundle-devices" src="/assets/mockup-tablet-celular-cutout.png" alt="Tablet e celular exibindo mapas mentais" width="1536" height="1024" loading="lazy" />
  </div>;
}

const bonusCovers = {
  questions: ['/assets/bonus-gabarito-cover-thumb.webp', 'Capa do bônus Questões da Aprovação com gabarito comentado'],
  notebook: ['/assets/bonus-calculos-cover-thumb.webp', 'Capa do bônus Treino de Cálculos de Enfermagem'],
  spreadsheet: ['/assets/bonus-edital-cover-thumb.webp', 'Capa do bônus Do Edital ao Estudo']
};

function BonusMockup({ type }) {
  const [src, alt] = bonusCovers[type] || bonusCovers.questions;
  return <div className={`bonus-mockup bonus-mockup--${type}`} aria-hidden="true">
    <img className="bonus-cover" src={src} alt={alt} width="636" height="900" loading="lazy" />
  </div>;
}

function ScrollRail({ children, label, className = '', interval = 1500, auto = false }) {
  const ref = useRef(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const resumeTimer = useRef(null);
  const normalizeTimer = useRef(null);
  const resizeFrame = useRef(null);
  const metrics = useRef({ cycleWidth: 0, itemStep: 0 });
  const items = Children.toArray(children);
  const loopCopies = auto ? 3 : 1;
  const middleCopy = Math.floor(loopCopies / 2);
  const duplicated = auto ? Array.from({ length: loopCopies }, (_, copyIndex) =>
    items.map((child, index) => cloneElement(child, { key: `loop-${copyIndex}-${index}` }))
  ).flat() : items;

  const measure = () => {
    const rail = ref.current;
    if (!rail || !items.length) return metrics.current;
    const firstIndex = auto ? items.length * middleCopy : 0;
    const first = rail.children[firstIndex];
    const second = rail.children[firstIndex + 1];
    const nextCycle = rail.children[firstIndex + items.length];
    metrics.current = {
      cycleWidth: first && nextCycle ? nextCycle.offsetLeft - first.offsetLeft : 0,
      itemStep: first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth * .82
    };
    return metrics.current;
  };
  const cycleWidth = () => {
    const width = metrics.current.cycleWidth;
    return width || measure().cycleWidth;
  };
  const itemStep = () => {
    const step = metrics.current.itemStep;
    return step || measure().itemStep;
  };
  const normalize = () => {
    const rail = ref.current;
    const width = cycleWidth();
    if (!rail || !width) return;
    const min = width * middleCopy;
    const max = width * (middleCopy + 1);
    if (rail.scrollLeft >= max || rail.scrollLeft < min) {
      const offset = ((rail.scrollLeft - min) % width + width) % width;
      rail.scrollLeft = min + offset;
    }
  };
  const pauseTemporarily = () => {
    paused.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { paused.current = false; }, 4200);
  };
  const scheduleNormalize = () => {
    window.clearTimeout(normalizeTimer.current);
    normalizeTimer.current = window.setTimeout(normalize, 700);
  };
  const move = direction => {
    const rail = ref.current;
    if (!rail) return;
    pauseTemporarily();
    const width = cycleWidth();
    if (width) normalize();
    rail.scrollBy({ left: direction * itemStep(), behavior: 'smooth' });
    scheduleNormalize();
  };

  useEffect(() => {
    const rail = ref.current;
    if (!rail || !auto) return undefined;
    const setMiddleCycle = () => {
      const width = measure().cycleWidth;
      if (width && rail.scrollLeft < width * middleCopy) rail.scrollLeft = width * middleCopy;
    };
    setMiddleCycle();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: .18 });
    observer.observe(rail);
    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame.current);
      resizeFrame.current = window.requestAnimationFrame(() => {
        measure();
        setMiddleCycle();
        normalize();
      });
    });
    resizeObserver.observe(rail);
    const timer = window.setInterval(() => {
      if (reduced.matches || paused.current || !visible.current || document.hidden) return;
      normalize();
      rail.scrollBy({ left: itemStep(), behavior: 'smooth' });
      scheduleNormalize();
    }, interval);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.clearInterval(timer);
      window.cancelAnimationFrame(resizeFrame.current);
      window.clearTimeout(resumeTimer.current);
      window.clearTimeout(normalizeTimer.current);
    };
  }, [auto, interval, items.length]);

  return <div className={`rail-stage ${className}`}>
    <button type="button" className="rail-arrow rail-arrow--left" onClick={() => move(-1)} aria-label={`Ver anteriores em ${label}`}><ChevronLeft /></button>
    <div className="rail rail--loop" ref={ref} tabIndex="0" aria-label={label}
      onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }} onBlur={() => { paused.current = false; }}
      onPointerDown={() => { paused.current = true; }} onPointerUp={pauseTemporarily} onTouchEnd={pauseTemporarily}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}
    >{duplicated}</div>
    <button type="button" className="rail-arrow rail-arrow--right" onClick={() => move(1)} aria-label={`Ver próximos em ${label}`}><ChevronRight /></button>
  </div>;
}

export default function App() {
  const checkoutEnabled = comercial.productReady && Boolean(comercial.checkoutUrl) && !comercial.price.startsWith('[') && !comercial.guarantee.startsWith('[');
  const heroHighlight = '240 mapas mentais';
  const heroHeadlineRest = content.hero.headline.startsWith(heroHighlight) ? content.hero.headline.slice(heroHighlight.length) : content.hero.headline;
  const [activePreviewIndex, setActivePreviewIndex] = useState(null);
  const activePreview = activePreviewIndex === null ? null : content.gallery[activePreviewIndex];
  const showPreview = direction => {
    setActivePreviewIndex(index => {
      const current = index === null ? 0 : index;
      return (current + direction + content.gallery.length) % content.gallery.length;
    });
  };

  useEffect(() => {
    if (activePreviewIndex === null) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') setActivePreviewIndex(null);
      if (event.key === 'ArrowLeft') showPreview(-1);
      if (event.key === 'ArrowRight') showPreview(1);
    };
    document.body.classList.add('preview-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('preview-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activePreviewIndex]);

  return <>
    <OfferCountdownBar />
    <main>
      <section className="hero"><div className="content content--860 hero-flow">
        <h1 className="hero-title"><span className="question-ribbon">{content.hero.question}</span><span className="hero-title-main"><strong>{heroHighlight}</strong>{heroHeadlineRest}</span></h1>
        <div className="hero-media"><ProductComposition /></div>
        <p className="hero-sub">{content.hero.subheadline}</p>
        <CTA href="#previas" label="QUERO VER O MATERIAL" />
        <ul className="hero-bullets">{content.hero.bullets.map(item => <li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
        <p className="avatar-proof">{content.hero.amplitude}</p>
      </div></section>

      <section className="section pain"><div className="content content--880 section-flow">
        <SectionTitle lead={content.pain.lead}>{content.pain.title} <span className="pain-title-accent">{content.pain.emphasis}</span></SectionTitle>
        <div className="pain-grid">{content.pain.chips.map((item, index) => { const Icon = painIcons[index]; return <div className="pain-chip" key={item}><Icon size={18}/><span>{item}</span></div>; })}</div>
      </div></section>

      <section className="section section--tint gallery" id="previas"><div className="content content--1180 section-flow">
        <SectionTitle lead="Conheça o produto de perto e veja alguns exemplos dos mapas mentais que fazem parte da coleção.">Navegue por Dentro do Material</SectionTitle>
        <ScrollRail label="Páginas reais do material" className="gallery-rail" auto>{content.gallery.map(([src, title], index) => <figure className="gallery-card" key={src}><button type="button" className="gallery-preview-trigger" onClick={() => setActivePreviewIndex(index)} aria-label={`Abrir mapa completo de ${title} em tela cheia`}><img src={src} alt={`Mapa real de ${title}`} width="636" height="900" loading="lazy"/></button></figure>)}</ScrollRail>
        <p className="gallery-hint">Deslize para ver mais. Toque na página para ampliar.</p>
        <CTA />
      </div></section>

      <section className="section mechanism"><div className="content content--1120 section-flow">
        <SectionTitle lead="São 240 mapas mentais distribuídos entre as principais áreas de conhecimento da enfermagem para você encontrar os conteúdos de forma organizada durante sua preparação.">Uma coleção completa, organizada em <span className="section-title-accent">9 módulos de enfermagem</span></SectionTitle>
        <ul className="modules-list">{content.mechanism.map(([title, amount]) => <li key={title}><span className="module-check"><Check size={17}/></span><span className="module-name">{title}</span><span className="module-count">{amount}</span></li>)}</ul>
      </div></section>

      <section className="section mid-pitch"><div className="content content--1120 mid-bonus-layout">
        <header className="mid-pitch-copy mid-bonus-header"><h2>{content.midPitch.title} <strong className="bonus-title-accent">{content.midPitch.emphasis}</strong></h2></header>
        <div className="bonus-showcase">{content.midPitch.bonuses.map(([title, text, type]) => <article className="bonus-item" key={title}><BonusMockup type={type}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <CTA className="btn--bonus" />
      </div></section>

      <section className="section offer" id="oferta"><div className="content content--720 section-flow">
        <article className="plan-card" id="checkout"><p className="plan-badge">240 MAPAS · 9 MÓDULOS</p><p className="plan-kicker">OFERTA ESPECIAL</p><h3>Mapa da Aprovação em Enfermagem</h3>
          <div className="plan-mockup"><ProductBundleMockup /></div>
          <ul>{content.included.map(item => <li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
          <div className="price"><span className="price-label">de</span><s className="price-original">R$ 97,90</s><span className="price-label">por</span><strong className="price-placeholder">{comercial.price.startsWith('[') ? 'Preço a definir' : comercial.price}</strong></div>
          {checkoutEnabled ? <CTA href={comercial.checkoutUrl} className="btn--offer-cta" label="QUERO O MEU MAPA AGORA" /> : <button type="button" className="btn btn--disabled btn--offer-cta" disabled>QUERO O MEU MAPA AGORA</button>}
        </article>
      </div></section>

      {/* <section className="section audiences"><div className="content content--1040 section-flow">
        <SectionTitle>Para a sua rotina de revisão.</SectionTitle>
        <div className="audience-grid">{content.audiences.map(([title, text]) => <article key={title}><span><Check size={17}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section> */}

      {/* <section className="section section--tint receive"><div className="content content--1000 section-flow">
        <SectionTitle>A revisão de Enfermagem organizada por tema.</SectionTitle>
        <div className="receive-media collection-fan" aria-label="Páginas reais de SUS e Fundamentos"><img src="/assets/SUS-20-thumb.webp" alt="Mapa real de SUS" width="636" height="900" loading="lazy"/><img src="/assets/FUN-01-thumb.webp" alt="Mapa real do Processo de Enfermagem" width="636" height="900" loading="lazy"/><img src="/assets/SUS-01-thumb.webp" alt="Mapa real sobre direito à saúde" width="636" height="900" loading="lazy"/></div>
        <article className="receive-card"><p className="access-badge">240 MAPAS · 9 MÓDULOS</p><h3>Mapa da Aprovação em Enfermagem</h3><p>Encontre o tema. Revise os pontos-chave. Teste sua memória.</p><ul>{content.benefits.map(item => <li key={item}><Check size={20}/><span>{item}</span></li>)}</ul></article>
      </div></section> */}

      <section className="section purchase-safety"><div className="content content--1000 safety-layout">
        <article className="guarantee-card"><img className="guarantee-seal" src={guaranteeSeal} alt="Selo de compra protegida" width="1254" height="1254"/><h2>7 DIAS DE GARANTIA.</h2><p>Você pode adquirir os Mapas Mentais hoje, acessar todo o conteúdo e conhecer o material com total tranquilidade.</p><p>Se por qualquer motivo não gostar ou sentir que não era o que esperava, basta solicitar o reembolso em até 7 dias diretamente pela plataforma de pagamento parceira.</p><p>Sem complicações, sem perguntas e com 100% do seu dinheiro de volta.</p></article>
        <div className="safety-cards"><article><FileCheck2 size={30}/><div><h3>Fontes indicadas</h3><p>Os mapas mostram as referências consultadas no rodapé da página.</p></div></article><article><MonitorSmartphone size={30}/><div><h3>Material digital</h3><p>As páginas estão em PDF A4 para consulta digital ou impressão.</p></div></article></div>
      </div></section>

      <section className="section faq"><div className="content content--780 section-flow"><SectionTitle>Perguntas frequentes</SectionTitle><div className="faq-list">{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    </main>
    {activePreview && <div className="preview-modal" role="dialog" aria-modal="true" aria-label={`Mapa completo de ${activePreview[1]}`} onClick={() => setActivePreviewIndex(null)}>
      <button type="button" className="preview-close" onClick={() => setActivePreviewIndex(null)} aria-label="Fechar visualização"><X size={24}/></button>
      <button type="button" className="preview-nav preview-nav--left" onClick={event => { event.stopPropagation(); showPreview(-1); }} aria-label="Ver mapa anterior"><ChevronLeft size={30}/></button>
      <img src={activePreview[0].replace('-thumb', '')} alt={`Mapa completo de ${activePreview[1]}`} onClick={event => event.stopPropagation()} />
      <button type="button" className="preview-nav preview-nav--right" onClick={event => { event.stopPropagation(); showPreview(1); }} aria-label="Ver próximo mapa"><ChevronRight size={30}/></button>
    </div>}
    <footer className="footer"><div className="footer-inner">
      <div className="footer-brand"><BookOpen size={18} aria-hidden="true"/><strong>{content.productName}</strong></div>
      <p>Material digital complementar com mapas mentais para apoiar a revisão de concursos de Enfermagem.</p>
      <nav aria-label="Links legais e contato"><a href="#contato">Contato</a><a href="#termos">Termos de Uso</a><a href="#privacidade">Política de Privacidade</a><a href="#reembolso">Reembolso</a></nav>
      <p className="footer-legal">Material complementar. O uso do conteúdo não garante aprovação, classificação ou convocação em concursos.</p>
      <p>© 2026 {content.productName}. Todos os direitos reservados.</p>
    </div></footer>
  </>;
}
