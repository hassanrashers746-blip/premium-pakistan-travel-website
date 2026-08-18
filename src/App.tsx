import { FormEvent, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "arrow-up-right"
  | "calendar"
  | "camera"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "compass"
  | "facebook"
  | "globe"
  | "heart"
  | "instagram"
  | "layers"
  | "lock"
  | "mail"
  | "map-pin"
  | "menu"
  | "mountain"
  | "phone"
  | "plane"
  | "play"
  | "quote"
  | "shield"
  | "sparkle"
  | "star"
  | "support"
  | "users"
  | "whatsapp"
  | "x";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    "arrow-up-right": <path d="M7 17 17 7m-8 0h8v8" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    camera: <><path d="M4 7h3l1.7-2h6.6L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="3.2" /></>,
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    "chevron-left": <path d="m15 18-6-6 6-6" />,
    "chevron-right": <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    facebook: <path d="M14 8h3V4h-3c-3.2 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" /></>,
    heart: <path d="M20.8 8.6c0 5.6-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.6A4.3 4.3 0 0 1 11 6.1l1 1 1-1a4.3 4.3 0 0 1 7.8 2.5Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".7" fill="currentColor" stroke="none" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    "map-pin": <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    mountain: <path d="m3 20 6.5-12L13 14l2.5-4 5.5 10H3Z" />,
    phone: <path d="M7 3h3l1.4 4.3-2 1.5a15.2 15.2 0 0 0 5.8 5.8l1.5-2L21 14v3c0 1.1-.9 2-2 2C10.2 19 5 13.8 5 5c0-1.1.9-2 2-2Z" />,
    plane: <path d="m21 3-6.8 18-3.4-7.8L3 9.8 21 3Zm-10.2 10.2L15 9" />,
    play: <path d="m9 7 7 5-7 5V7Z" fill="currentColor" stroke="none" />,
    quote: <path d="M8.2 10.2H4.8A4.8 4.8 0 0 1 9.6 5.4v2A2.8 2.8 0 0 0 6.8 10v.2h1.4v5.4H3v-5.4c0-3.8 2.4-6.8 6.6-6.8v2c-1 0-1.4.8-1.4 1.8v3Zm12.8 0h-3.4a4.8 4.8 0 0 1 4.8-4.8v2a2.8 2.8 0 0 0-2.8 2.6v.2H21v5.4h-5.2v-5.4c0-3.8 2.4-6.8 6.6-6.8v2c-1 0-1.4.8-1.4 1.8v3Z" />,
    shield: <path d="M12 3 20 6v5c0 5-3.3 8.4-8 10-4.7-1.6-8-5-8-10V6l8-3Zm-3.5 9 2.2 2.2 4.8-5" />,
    sparkle: <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Zm7 13 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    support: <><path d="M4 14v-2a8 8 0 1 1 16 0v2" /><path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 0 1-1v-4ZM12 20h3" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20" /><path d="M16 5.5a3 3 0 0 1 0 5.8M17 14.3a4.5 4.5 0 0 1 3.5 4.3V20" /></>,
    whatsapp: <><path d="M20.4 11.8a8.1 8.1 0 0 1-11.9 7.1L3.6 20l1.2-4.7a8.1 8.1 0 1 1 15.6-3.5Z" /><path d="M8.5 8.2c.2-.5.4-.5.7-.5h.4c.2 0 .4.1.5.4l.7 1.6c.1.3.1.4 0 .6l-.4.6c-.1.2-.2.3 0 .5.4.7 1.2 1.6 2.1 2.1.2.2.4.1.5 0l.7-.8c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.4.4 0 .3-.1.9-.4 1.2-.3.3-.8.5-1.3.5-.4 0-1.1-.2-1.8-.5-.7-.3-1.6-.9-2.6-1.9-.8-.8-1.4-1.7-1.8-2.5-.4-.8-.6-1.4-.6-1.8 0-.6.2-1.1.5-1.4Z" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const image = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500`;

const imagery = {
  hero: image(19442083),
  hunza: image(35171324),
  skardu: image(35302567),
  fairy: "https://images.pexels.com/photos/4037820/pexels-photo-4037820.png?auto=compress&cs=tinysrgb&fit=crop&w=1500",
  swat: image(37673127),
  naran: image(13087894),
  neelum: image(31756854),
  murree: image(19442077),
  karachi: image(38459971),
  lahore: image(6348640),
  islamabad: image(38019283),
  experience: image(15817299),
  cta: image(27151258),
};

const destinations = [
  { name: "Hunza Valley", region: "Gilgit-Baltistan", description: "Ancient forts, turquoise lakes, and the Karakoram at its most cinematic.", price: "PKR 48,000", image: imagery.hunza },
  { name: "Skardu", region: "Gilgit-Baltistan", description: "A wild plateau of mirror lakes and dramatic, otherworldly peaks.", price: "PKR 55,000", image: imagery.skardu },
  { name: "Fairy Meadows", region: "Diamer", description: "Wake beneath the unmistakable silhouette of Nanga Parbat.", price: "PKR 62,000", image: imagery.fairy },
  { name: "Swat Valley", region: "Khyber Pakhtunkhwa", description: "Emerald rivers, alpine forests, and a gentler side of the north.", price: "PKR 41,000", image: imagery.swat },
  { name: "Naran Kaghan", region: "Khyber Pakhtunkhwa", description: "Glacial waters and open roads through the high Himalaya.", price: "PKR 39,000", image: imagery.naran },
  { name: "Neelum Valley", region: "Azad Kashmir", description: "A slow escape through cedar valleys and cobalt-blue rivers.", price: "PKR 44,000", image: imagery.neelum },
  { name: "Murree", region: "Punjab", description: "Pine-scented hills and heritage retreats, close to the capital.", price: "PKR 28,000", image: imagery.murree },
  { name: "Karachi", region: "Sindh", description: "Sea breezes, street food, and the pulse of Pakistan's coast.", price: "PKR 34,000", image: imagery.karachi },
  { name: "Lahore", region: "Punjab", description: "Mughal grandeur, remarkable cuisine, and generous hospitality.", price: "PKR 31,000", image: imagery.lahore },
  { name: "Islamabad", region: "Islamabad Capital Territory", description: "A polished city set against the quiet curve of Margalla Hills.", price: "PKR 26,000", image: imagery.islamabad },
];

const packages = [
  { title: "Hunza Adventure", duration: "6 days", location: "Hunza & Nagar", price: "PKR 89,000", description: "A considered journey from mountain highways to remote alpine villages.", included: ["Boutique stays", "Private 4x4", "Local guide"], image: imagery.hunza },
  { title: "Skardu Escape", duration: "5 days", location: "Skardu", price: "PKR 95,000", description: "Lakeside stillness, desert horizons, and Balti hospitality at its best.", included: ["4-star hotel", "Airport transfers", "Daily breakfast"], image: imagery.skardu },
  { title: "Northern Pakistan Explorer", duration: "10 days", location: "Hunza, Skardu & Naran", price: "PKR 168,000", description: "The essential north, woven into one seamless and deeply scenic route.", included: ["Premium transport", "Curated dining", "Trip host"], image: imagery.naran },
  { title: "Family Pakistan Tour", duration: "7 days", location: "Islamabad to Naran", price: "PKR 118,000", description: "Easy-paced moments, carefully selected for every generation to enjoy.", included: ["Family rooms", "Flexible pacing", "24/7 support"], image: imagery.islamabad },
  { title: "Luxury Honeymoon Escape", duration: "7 days", location: "Skardu & Hunza", price: "PKR 245,000", description: "Private moments in vast landscapes, shaped around just the two of you.", included: ["Luxury lodges", "Private vehicle", "Romantic dinner"], image: imagery.experience },
  { title: "Corporate & Group Tours", duration: "Tailored", location: "Across Pakistan", price: "On request", description: "Exceptional group travel that carries the detail without the weight.", included: ["Group coordination", "Custom itinerary", "Dedicated manager"], image: imagery.karachi },
];

const benefits: { icon: IconName; title: string; description: string }[] = [
  { icon: "compass", title: "Local travel experts", description: "The people designing your route know every turn, season, and story." },
  { icon: "layers", title: "Customized Packages", description: "Every journey is shaped to your pace, interests, and travel style." },
  { icon: "shield", title: "Trusted & Secure", description: "Vetted partners, transparent booking, and care in the details." },
  { icon: "support", title: "24/7 Customer Support", description: "A real team stays close, from your first question to the final return." },
  { icon: "sparkle", title: "Best Price Guarantee", description: "Thoughtful stays and considered moments instead of rushed checklists." },
  { icon: "lock", title: "Hassle-Free Travel", description: "Every permit, transfer, and private escort planned carefully for you." },
];

const experiences = [
  { number: "01", title: "Choose your destination", body: "Start with a place that pulls you in. We will help you find its best season and rhythm.", image: imagery.naran },
  { number: "02", title: "Customize your journey", body: "We pair beautiful stays, local encounters, and the right pace into one considered route.", image: imagery.hunza },
  { number: "03", title: "Travel with confidence", body: "From airport arrivals to high passes, every logistical detail is quietly handled.", image: imagery.skardu },
  { number: "04", title: "Create unforgettable memories", body: "Leave with more than photographs: the kind of stories that stay with you for years.", image: imagery.experience },
];

const testimonials = [
  { name: "Areeba Khalid", location: "Hunza Valley Tour", review: "Every detail felt intentional, from our gorgeous Karimabad stay to the guide who knew exactly when to stop for the light. It was Pakistan, but seen differently.", avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Bilal Ahmed", location: "Skardu Escape", review: "We booked for the landscapes and came home talking about the people. The route was beautifully paced and not once did we have to think about logistics.", avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Sara & Hamza", location: "Luxury Honeymoon", review: "A truly personal honeymoon. Quiet rooms with enormous views, unhurried drives, and small surprises throughout. We could not have asked for more.", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function CountUp({ end, suffix = "+" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1600, 1);
          setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`max-w-2xl ${light ? "text-white" : "text-[#122636]"}`}>
      <div className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] ${light ? "text-[#e8bd78]" : "text-[#9b6b27]"}`}>
        <span className="h-px w-8 bg-current opacity-75" /> {eyebrow}
      </div>
      <h2 className="font-display text-3xl leading-[1.05] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl">{title}</h2>
      {copy && <p className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base sm:leading-7 ${light ? "text-white/70" : "text-[#5b6872]"}`}>{copy}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const destinationScrollRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const navigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const planFor = (destination = "") => {
    setSelectedDestination(destination);
    setFormSubmitted(false);
    navigate("planner");
  };

  const submitPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const traveller = form.querySelector<HTMLInputElement>('input[placeholder="Full name"]')?.value || "A traveller";
    const dest = selectedDestination || form.querySelector<HTMLSelectElement>("select")?.value || "Pakistan";
    const budget = form.querySelector<HTMLSelectElement>('select[defaultValue="Per person, PKR"]')?.value || "Not specified";
    const message = `Hello Aabshar, I am ${traveller} and would like to plan an extraordinary journey to ${dest} (Budget: ${budget}).`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormSubmitted(true);
  };

  const scrollDestinations = (direction: "left" | "right") => {
    const el = destinationScrollRef.current;
    if (el) {
      const scrollAmount = 340;
      el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const currentReview = testimonials[activeTestimonial];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f4ef] text-[#122636] selection:bg-[#bf8d42] selection:text-white">
      {/* Sticky Header with perfect Mobile responsiveness */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "border-b border-white/10 bg-[#081923]/95 shadow-[0_12px_40px_rgba(3,12,18,0.2)] backdrop-blur-xl" : "bg-gradient-to-b from-[#071822]/85 to-transparent"}`}>
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <button onClick={() => navigate("home")} className="group flex items-center gap-2.5 text-left" aria-label="Aabshar Journeys home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5aa64]/60 bg-[#081923]/50 text-[#e8bd78] transition-transform duration-500 group-hover:rotate-12">
              <Icon name="mountain" className="h-4.5 w-4.5" />
            </span>
            <span className="font-display text-xl font-semibold leading-none tracking-[-0.04em] text-white">
              Aabshar<span className="text-[#e8bd78]">.</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {[
              ["Home", "home"],
              ["Destinations", "destinations"],
              ["Packages", "packages"],
              ["About", "about"],
              ["Experiences", "experiences"],
              ["Contact", "planner"]
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-[#e8bd78]"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTAs and Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => planFor()}
              className="hidden h-10 items-center gap-2 rounded-full bg-[#e8bd78] px-5 text-[11px] font-bold uppercase tracking-[0.13em] text-[#102532] shadow-sm transition hover:bg-white sm:flex"
            >
              Book now <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </button>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <Icon name={menuOpen ? "x" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Overlay with smooth styling */}
        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#081923] px-4 py-6 shadow-2xl lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-[1440px] gap-1">
              {[
                ["Home", "home"],
                ["Destinations", "destinations"],
                ["Packages", "packages"],
                ["About", "about"],
                ["Experiences", "experiences"],
                ["Contact", "planner"]
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className="border-b border-white/5 py-3 text-left text-sm font-medium text-white/80 transition hover:text-[#e8bd78]"
                >
                  {label}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => planFor()}
                  className="flex w-full h-11 items-center justify-center gap-2 rounded-full bg-[#e8bd78] text-[11px] font-bold uppercase tracking-[0.13em] text-[#102532]"
                >
                  Book your journey <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION with Tasteful 3D Cards and Fluid Typography */}
        <section id="home" className="relative flex h-[100svh] min-h-[660px] sm:min-h-[760px] lg:min-h-[820px] items-center overflow-hidden bg-[#071923]" aria-labelledby="hero-heading">
          {/* Background image & cinematic gradient treatment */}
          <img
            src={imagery.hero}
            alt="Sunlight falling across the Hunza Valley, Pakistan"
            className="hero-image absolute inset-0 h-full w-full scale-105 object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,23,0.92)_0%,rgba(6,19,27,0.65)_45%,rgba(4,14,21,0.3)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,15,22,0.82)_0%,transparent_50%)]" />
          
          {/* Atmospheric 3D details: Clouds & Mountains */}
          <div className="hero-cloud hero-cloud-one" aria-hidden="true" />
          <div className="hero-cloud hero-cloud-two" aria-hidden="true" />
          <div className="mountain-range absolute bottom-0 left-0 right-0 h-[23%] opacity-40 pointer-events-none" aria-hidden="true" />
          
          {/* Abstract cosmic orbits */}
          <div className="absolute right-[-9rem] top-[22%] hidden h-72 w-72 rounded-full border border-white/10 lg:block pointer-events-none" aria-hidden="true" />
          <div className="orbit-slow absolute right-[5%] top-[31%] hidden h-36 w-36 rounded-full border border-[#e8bd78]/20 lg:block pointer-events-none" aria-hidden="true">
            <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 rounded-full bg-[#e8bd78] shadow-[0_0_15px_4px_rgba(232,189,120,0.35)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-14 pt-28 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-7">
                <div className="hero-enter flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#e8bd78]">
                  <span className="h-px w-9 bg-[#e8bd78]" /> Unforgettable Pakistan travel experiences
                </div>
                
                <h1 id="hero-heading" className="hero-enter-delay-1 mt-6 max-w-3xl font-display text-[clamp(2.1rem,6.8vw,6.5rem)] leading-[1.02] tracking-[-0.055em] text-white">
                  Discover Pakistan.<br />
                  Experience the <span className="font-normal italic text-[#e8bd78]">extraordinary.</span>
                </h1>
                
                <p className="hero-enter-delay-2 mt-6 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base sm:leading-7">
                  Aabshar Journeys crafts luxury adventures from high Karakoram peaks to historic city landmarks. We shape every private route around your ultimate comfort, security, and travel aspirations.
                </p>
                
                <div className="hero-enter-delay-3 mt-8 flex flex-wrap gap-3.5">
                  <button
                    onClick={() => navigate("destinations")}
                    className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#e8bd78] px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#102532] shadow-lg transition duration-300 hover:bg-white"
                  >
                    Explore destinations <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => planFor()}
                    className="inline-flex h-12 items-center gap-3 rounded-full border border-white/35 px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:border-white hover:bg-white/10"
                  >
                    Plan your trip <Icon name="arrow-up-right" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Floating 3D-style luxury travel cards (Visible on Desktop / Laptops) */}
              <div className="relative lg:col-span-5 hidden lg:flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[380px] h-[410px] perspective-container">
                  
                  {/* Decorative golden ambient backglow */}
                  <div className="absolute inset-0 bg-[#e8bd78]/8 rounded-3xl blur-[60px] pointer-events-none" />
                  
                  {/* Main 3D Card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0c2230]/95 to-[#05131c]/95 border border-white/10 p-5 shadow-[0_30px_70px_rgba(3,12,18,0.45)] backdrop-blur-md transform hover:rotate-x-3 hover:rotate-y-[-5deg] transition-all duration-700 float-card">
                    <div className="relative h-44 overflow-hidden rounded-xl">
                      <img src={imagery.skardu} alt="Shangrila Resort Skardu" className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#e8bd78] text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        ★ 4.9 Rating
                      </div>
                    </div>
                    
                    <div className="mt-5 text-left">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#e8bd78]">
                        <Icon name="map-pin" className="h-3 w-3" /> Gilgit-Baltistan
                      </div>
                      <h3 className="font-display text-2xl text-white mt-1">Skardu Escape</h3>
                      <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
                        A premium 5-day journey designed around pristine alpine lakes, cold deserts, and mountain stillness.
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                        <div>
                          <span className="text-[9px] text-white/40 block uppercase tracking-wider">Starting Price</span>
                          <span className="text-sm font-semibold text-[#e8bd78]">PKR 95,000</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase text-[#e8bd78] flex items-center gap-1.5">
                          Active Route <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping badge 1 */}
                  <div className="absolute -left-10 bottom-6 w-[210px] rounded-xl bg-[#081923]/90 border border-[#e8bd78]/20 p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md transform -rotate-6 hover:-rotate-3 transition duration-500 float-badge">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8bd78] text-[#071923]">
                        <Icon name="compass" className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Local Experts</p>
                        <p className="text-[11px] font-semibold text-white">Certified Mountain Guides</p>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping badge 2 */}
                  <div className="absolute -right-6 top-1/3 w-[170px] rounded-xl bg-gradient-to-br from-[#071923] to-[#0a202c] border border-white/10 p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] transform rotate-6 hover:rotate-3 transition duration-500 float-badge-delay">
                    <div className="flex items-center gap-2">
                      <Icon name="shield" className="h-4 w-4 text-[#e8bd78]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white">100% Secure</span>
                    </div>
                    <p className="text-[10px] text-white/70 mt-1 leading-snug text-left">Hassle-free transfers and top security.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROMISE STATEMENTS */}
        <section className="bg-[#0a202c] py-7 text-white" aria-label="Aabshar travel promise">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-8 lg:px-12">
            <p className="font-display text-lg tracking-[-0.03em] text-white/90 sm:text-xl md:text-2xl">
              The country you know. <em className="font-normal text-[#e8bd78]">Like you have never felt it.</em>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              <span>Private</span>
              <span className="h-1 w-1 rounded-full bg-[#e8bd78]" />
              <span>Considered</span>
              <span className="h-1 w-1 rounded-full bg-[#e8bd78]" />
              <span>Local</span>
            </div>
          </div>
        </section>

        {/* DESTINATIONS with horizontal scrolling and scroll arrow navigation */}
        <section id="destinations" className="scroll-mt-20 bg-[#f6f4ef] py-20 sm:py-28" aria-labelledby="destinations-heading">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="The map opens"
                title="Places with a pull of their own."
                copy="From high mountain silence to historic city streets, find a Pakistan worth lingering in."
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="max-w-xs border-l border-[#cda867] pl-4 text-sm leading-relaxed text-[#6b7272]">
                  Select a destination below to request an itinerary beautifully crafted for you.
                </div>
                {/* Scroll Arrow Buttons */}
                <div className="flex gap-2 self-start sm:self-center">
                  <button
                    onClick={() => scrollDestinations("left")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cbd2ce] text-[#122636] transition hover:bg-[#122636] hover:text-white"
                    aria-label="Scroll left"
                  >
                    <Icon name="chevron-left" className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollDestinations("right")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cbd2ce] text-[#122636] transition hover:bg-[#122636] hover:text-white"
                    aria-label="Scroll right"
                  >
                    <Icon name="chevron-right" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Destination horizontal swipe viewport (Guaranteed no overflow layout break) */}
          <div
            ref={destinationScrollRef}
            className="destination-scroll mt-12 flex gap-5 overflow-x-auto px-4 pb-5 sm:px-8 lg:px-12 scroll-smooth"
            aria-label="Destination gallery"
          >
            {destinations.map((destination, index) => (
              <article
                key={destination.name}
                className="destination-card group relative h-[470px] w-[285px] sm:w-[340px] flex-none overflow-hidden bg-[#102532] shadow-[0_20px_45px_rgba(22,36,43,0.14)]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <img
                  src={destination.image}
                  alt={`${destination.name}, ${destination.region}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,17,24,0.96)_0%,rgba(5,17,24,0.15)_60%)] pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8bd78]">{destination.region}</p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-[-0.04em]">{destination.name}</h3>
                  <p className="mt-2 max-w-[280px] text-xs sm:text-sm leading-relaxed text-white/75">{destination.description}</p>
                  
                  <div className="mt-5 flex items-end justify-between border-t border-white/20 pt-4">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">Starting package</span>
                      <span className="mt-1 block text-sm font-semibold text-white">{destination.price}</span>
                    </div>
                    <button
                      onClick={() => planFor(destination.name)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition duration-300 hover:border-[#e8bd78] hover:bg-[#e8bd78] hover:text-[#102532]"
                      aria-label={`Explore ${destination.name}`}
                    >
                      <Icon name="arrow-up-right" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-2 flex max-w-[1440px] items-center gap-3 px-4 sm:px-8 lg:px-12">
            <span className="h-px w-16 bg-[#d5cfc4]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c827f]">
              Swipe or use controls to view all 10 destinations
            </span>
          </div>
        </section>

        {/* TRAVEL PACKAGES with responsive structures */}
        <section id="packages" className="scroll-mt-20 bg-[#eae7e0] py-20 sm:py-28" aria-labelledby="packages-heading">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            
            <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Journeys, considered"
                title="Curated travel packages."
                copy="Carefully chosen paths made to be taken as they are, or used as inspiration for a custom tour."
              />
              <button
                onClick={() => planFor()}
                className="group inline-flex items-center gap-3 self-start text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6226] lg:self-auto"
              >
                View all custom tours{" "}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c7a56e] transition-transform group-hover:translate-x-1">
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            {/* Packages Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {packages.map((pack, index) => (
                <article
                  key={pack.title}
                  className="reveal group flex flex-col bg-white/40 p-4 rounded-xl border border-white/20 transition-all hover:bg-white/60 shadow-[0_15px_35px_rgba(18,38,54,0.04)]"
                  style={{ transitionDelay: `${Math.min(index, 2) * 80}ms` }}
                >
                  {/* Photo area */}
                  <div className="package-photo relative h-60 w-full overflow-hidden bg-[#102532] rounded-lg">
                    <img
                      src={pack.image}
                      alt={pack.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,20,28,0.52))]" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 bg-[#102532]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm rounded">
                      <Icon name="clock" className="h-3.5 w-3.5 text-[#e8bd78]" /> {pack.duration}
                    </div>
                  </div>

                  {/* Text Details Area */}
                  <div className="flex flex-col flex-grow pt-5">
                    
                    {/* Responsive title / price lockup */}
                    <div className="flex flex-col gap-2 border-b border-[#cbc5bb]/65 pb-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#93692d]">{pack.location}</p>
                        <h3 className="mt-1 font-display text-2xl tracking-[-0.04em] text-[#122636]">{pack.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#717b7c] uppercase tracking-wider">Starts at:</span>
                        <span className="text-base font-bold text-[#122636]">{pack.price}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#637078] flex-grow">
                      {pack.description}
                    </p>

                    {/* Included tags */}
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                      {pack.included.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#536269]">
                          <Icon name="check" className="h-3.5 w-3.5 text-[#9b6b27]" />
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#cbc5bb]/30">
                      <button
                        onClick={() => planFor(pack.title)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#122636] py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a1702e]"
                      >
                        Plan this journey <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US with elegant layout and glassmorphism styling */}
        <section id="about" className="scroll-mt-20 bg-[#102b3a] py-20 text-white sm:py-28" aria-labelledby="why-heading">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="reveal grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              
              <div>
                <SectionHeading
                  light
                  eyebrow="The Aabshar way"
                  title="Uncompromising detail. Absolute trust."
                  copy="We combine deep local connections across Swat, Skardu, and Hunza with premium travel pacing to deliver a completely worry-free expedition."
                />
                <div className="mt-8">
                  <button
                    onClick={() => planFor()}
                    className="inline-flex h-12 items-center gap-3 rounded-full border border-[#e8bd78]/60 px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8bd78] transition hover:bg-[#e8bd78] hover:text-[#102532]"
                  >
                    Custom plan your trip <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Redesigned grid with cohesive glassmorphic cards */}
              <div className="grid gap-6 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <article
                    key={benefit.title}
                    className="group reveal rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-[#e8bd78]/30 hover:bg-white/[0.05]"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8bd78]/35 text-[#e8bd78] transition duration-500 group-hover:rotate-[12deg] group-hover:bg-[#e8bd78] group-hover:text-[#102532]">
                      <Icon name={benefit.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.035em] text-white">{benefit.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/70">{benefit.description}</p>
                  </article>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* EXPERIENCE STORY SECTION ("From Mountains to Memories" timeline) */}
        <section id="experiences" className="scroll-mt-20 bg-[#f6f4ef] py-20 sm:py-28" aria-labelledby="experience-heading">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            
            <div className="reveal grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <SectionHeading
                eyebrow="A journey unfolds"
                title="From Mountains to Memories."
                copy="An elevated, stress-free path designed to bring the incredible landscapes of Pakistan within your reach."
              />
              <p className="max-w-md border-l border-[#c69d61] pl-5 text-sm leading-relaxed text-[#68757a] lg:justify-self-end">
                Our bespoke travel advisory handles every logistics, stay, and permit requirement, ensuring you have space to fully connect with the experience.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative mt-16">
              {/* Central connecting line */}
              <div className="absolute left-[21px] top-6 hidden h-[calc(100%-48px)] w-px bg-[#d6d0c6] md:block" aria-hidden="true" />
              
              <div className="space-y-12 md:space-y-0">
                {experiences.map((item, index) => (
                  <article
                    key={item.number}
                    className={`reveal relative grid gap-6 md:grid-cols-[70px_1.2fr_1fr] md:items-center md:py-8 ${index !== experiences.length - 1 ? "md:border-b md:border-[#d6d0c6]/70" : ""}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Step badge */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#b48b51] bg-[#f6f4ef] text-xs font-bold tracking-[0.08em] text-[#8d642b] shadow-sm">
                        {item.number}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b6b27] md:hidden">Step {item.number}</span>
                    </div>

                    {/* Content text */}
                    <div>
                      <h3 className="font-display text-2xl tracking-[-0.04em] text-[#122636] sm:text-3xl md:text-4xl">{item.title}</h3>
                      <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-[#68757a]">{item.body}</p>
                    </div>

                    {/* High quality photo representation */}
                    <div className="experience-photo h-44 overflow-hidden rounded-xl shadow-sm md:ml-auto md:w-[90%] lg:w-[82%]">
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL with dynamic heights */}
        <section className="overflow-hidden bg-[#dce2df] py-20 sm:py-28" aria-labelledby="reviews-heading">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            
            <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Guest notes"
                title="The kind of stories we live for."
                copy="Read experiences from families, solo explorers, and couples who traversed the mountains with us."
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9a9f9c] text-[#122636] transition hover:border-[#122636] hover:bg-[#122636] hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <Icon name="chevron-left" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9a9f9c] text-[#122636] transition hover:border-[#122636] hover:bg-[#122636] hover:text-white"
                  aria-label="Next testimonial"
                >
                  <Icon name="chevron-right" className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Testimonial detail - Natural vertical padding to prevent mobile text overflows */}
            <div className="reveal relative mt-12 border-t border-[#bfc7c3] pt-9 pb-2">
              <span className="absolute right-0 top-3 font-display text-[7rem] md:text-[13rem] leading-none text-[#cbd2ce] opacity-50 pointer-events-none" aria-hidden="true">
                &ldquo;
              </span>
              
              <div key={currentReview.name} className="testimonial-in relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
                <div>
                  <Icon name="quote" className="h-7 w-7 text-[#a0702d]" />
                  <blockquote className="mt-5 max-w-3xl font-display text-xl leading-relaxed tracking-[-0.03em] text-[#16303e] sm:text-2xl md:text-3xl lg:text-4xl">
                    &ldquo;{currentReview.review}&rdquo;
                  </blockquote>
                </div>

                <div className="flex flex-col justify-end border-t border-[#bfc7c3] pt-5 lg:border-0 lg:pt-0">
                  <div className="flex items-center gap-4">
                    <img src={currentReview.avatar} alt={currentReview.name} className="h-12 w-12 rounded-full object-cover border border-white/20" />
                    <div>
                      <p className="font-semibold text-[#132f3d]">{currentReview.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#91703c]">{currentReview.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4 lg:mt-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3.5 w-3.5 fill-[#b07d30] text-[#b07d30]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Read testimonial page ${index + 1}`}
                  className={`h-1.5 transition-all rounded-full ${index === activeTestimonial ? "w-10 bg-[#9b6b27]" : "w-4 bg-[#aeb6b2]"}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* TRUST STATISTICS counters in clean responsive layouts */}
        <section className="bg-[#102b3a] py-14 sm:py-20" aria-label="Aabshar statistics">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-8 lg:grid-cols-4 lg:px-12">
            {[
              [12, "Years of experience"],
              [8000, "Happy travellers"],
              [40, "Destinations covered"],
              [1000, "Successful trips"]
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`reveal ${index !== 0 ? "lg:border-l lg:border-white/10 lg:pl-9" : ""}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="font-display text-4xl font-semibold tracking-tight text-[#e8bd78] sm:text-5xl">
                  <CountUp end={Number(number)} />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRIP PLANNER / BOOKING FORM (Completely Responsive) */}
        <section id="planner" className="scroll-mt-20 bg-[#f6f4ef] py-20 sm:py-28" aria-labelledby="planner-heading">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-12">
            
            {/* Left information */}
            <div className="reveal lg:pt-4">
              <SectionHeading
                eyebrow="Begin with a conversation"
                title="Tell us where the feeling takes you."
                copy="Share your ideal timeline, guest count, and pacing style. An expert Pakistan travel planner will map out options and contact you."
              />
              
              <div className="mt-10 space-y-6 border-t border-[#d8d1c7] pt-8">
                <a href="tel:+923001234567" className="group flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#caa76d] text-[#8e6328] transition group-hover:bg-[#8e6328] group-hover:text-white">
                    <Icon name="phone" className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#8e8073]">Call our karcahi  office</span>
                    <span className="mt-0.5 block text-sm font-semibold text-[#193342] transition hover:text-[#b37e34]">This is a demo website by Nexora Digital</span>
                  </div>
                </a>
                
                <a href="mailto:hello@nexoradigital.com" className="group flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#caa76d] text-[#8e6328] transition group-hover:bg-[#8e6328] group-hover:text-white">
                    <Icon name="mail" className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#8e8073]">Email our team</span>
                    <span className="mt-0.5 block text-sm font-semibold text-[#193342] transition hover:text-[#b37e34]">hello@nexoradigital.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Form layout */}
            <form
              onSubmit={submitPlan}
              className="reveal border-t-2 border-[#b37e34] bg-white px-5 py-8 shadow-[0_20px_60px_rgba(31,45,43,0.06)] sm:px-8 sm:py-9 rounded-b-xl"
              aria-label="Trip planning form"
            >
              <div className="mb-7 flex flex-wrap items-center justify-between gap-2 border-b border-[#e7e0d7] pb-5">
                <p className="font-display text-2xl tracking-[-0.03em] text-[#132e3c]">Plan My Journey</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a6a2c] bg-[#fdfaf2] px-2.5 py-1 rounded border border-[#caa76d]/10">
                  No Commitment Required
                </span>
              </div>

              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <label className="form-field sm:col-span-2">
                  <span>Destination *</span>
                  <select
                    value={selectedDestination}
                    onChange={(event) => setSelectedDestination(event.target.value)}
                    required
                  >
                    <option value="">Where would you like to go?</option>
                    {destinations.map((destination) => (
                      <option key={destination.name} value={destination.name}>
                        {destination.name} ({destination.region})
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet / Multiple regions</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Travel dates *</span>
                  <input type="text" placeholder="e.g. October 15-25" required />
                </label>

                <label className="form-field">
                  <span>Travellers *</span>
                  <select required defaultValue="">
                    <option value="" disabled>Select guest count</option>
                    <option value="1 traveller">1 Solo Explorer</option>
                    <option value="2 travellers">2 Travellers (Couple)</option>
                    <option value="3 - 5 travellers">3 - 5 Travellers (Family)</option>
                    <option value="6+ travellers">6+ Travellers (Group)</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Trip style *</span>
                  <select required defaultValue="">
                    <option value="" disabled>Select pacing</option>
                    <option value="Adventure">High Adventure & Trekking</option>
                    <option value="Family">Relaxed Family Vacation</option>
                    <option value="Honeymoon">Luxury Honeymoon Escape</option>
                    <option value="Culture & food">Culture, History & Culinary</option>
                    <option value="Corporate / group">Corporate Retreat</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Estimated budget *</span>
                  <select required defaultValue="">
                    <option value="" disabled>Per person, PKR</option>
                    <option value="Under 75,000">Under 75,000 PKR</option>
                    <option value="75,000 - 125,000">75,000 - 125,000 PKR</option>
                    <option value="125,000 - 200,000">125,000 - 200,000 PKR</option>
                    <option value="200,000+">Premium Custom Unlimited</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>Your full name *</span>
                  <input type="text" placeholder="Full name" autoComplete="name" required />
                </label>

                <label className="form-field">
                  <span>Email address *</span>
                  <input type="email" placeholder="you@example.com" autoComplete="email" required />
                </label>

                <label className="form-field">
                  <span>WhatsApp number *</span>
                  <input type="tel" placeholder="+92 300 0000000" autoComplete="tel" required />
                </label>

                <label className="form-field">
                  <span>How did you hear about us?</span>
                  <select defaultValue="">
                    <option value="" disabled>Select source</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google search">Google Search</option>
                    <option value="Friend or family">Friend / Family Recommendation</option>
                    <option value="Travel blog">Travel Blog / Article</option>
                  </select>
                </label>

                <label className="form-field sm:col-span-2">
                  <span>Special requirements / Private Requests</span>
                  <textarea rows={3} placeholder="Dietary rules, photography requirements, helicopter requests, or private stays." />
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-[#e7e0d7] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[11px] leading-relaxed text-[#758084]">
                  * Your details are held securely and never shared with third parties.
                </p>
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#102b3a] px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#b37e34] w-full sm:w-auto shrink-0"
                >
                  Plan My Journey <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {formSubmitted && (
                <div className="mt-5 flex items-center gap-3 border-l-2 border-[#b37e34] bg-[#fdf9f0] p-4 text-xs text-[#384b51] rounded-r" role="status">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-[#9b6b27]" />
                  <span>
                    <strong>Inquiry Sent!</strong> WhatsApp has opened with your trip details. Our designer is active.
                  </span>
                </div>
              )}
            </form>

          </div>
        </section>

        {/* DRAMATIC CTA SECTION */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden bg-[#0a202c] py-20 sm:py-24" aria-labelledby="cta-heading">
          <img
            src={imagery.cta}
            alt="Scenic cold desert and mountain mountain peaks in Skardu, Pakistan"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,22,31,0.94),rgba(6,22,31,0.65)_65%,rgba(6,22,31,0.35))]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,26,0.65),transparent_60%)] pointer-events-none" />
          
          <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="reveal max-w-2xl text-white">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8bd78]">
                <span className="h-px w-8 bg-current" /> Pakistan travel advisor
              </div>
              
              <h2 id="cta-heading" className="mt-5 font-display text-3xl leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                Your Next Adventure <span className="font-normal italic text-[#e8bd78]">Starts Here.</span>
              </h2>
              
              <p className="mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-white/85">
                Explore the snow peaks, rich local culture, and high turquoise lakes of Pakistan with a journey custom-made for your peace of mind.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => planFor()}
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-[#e8bd78] px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#102532] shadow-md transition hover:bg-white"
                >
                  Start Planning Now
                </button>
                <a
                  href="https://wa.me/This is a demo website by Nexora Digital
Get your custom website today?text=Hello%20Aabshar%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20luxury%20custom%20tour."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-3 rounded-full border border-white/30 px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white/10"
                >
                  <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#071923] pt-16 text-white sm:pt-20" aria-label="Footer">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          
          <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.85fr_0.95fr] lg:gap-10">
            
            {/* Branding column */}
            <div>
              <button onClick={() => navigate("home")} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5aa64]/60 bg-white/5 text-[#e8bd78]">
                  <Icon name="mountain" className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                  Aabshar<span className="text-[#e8bd78]">.</span>
                </span>
              </button>
              
              <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-white/60">
                Crafting considered, private travel across northern and ancient Pakistan. Registered travel agency with local hosts in Hunza, Swat and Skardu.
              </p>
              
              <div className="mt-6 flex items-center gap-2">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-link animate-none" aria-label="Instagram">
                  <Icon name="instagram" className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-link animate-none" aria-label="Facebook">
                  <Icon name="facebook" className="h-4 w-4" />
                </a>
                <a href="https://wa.me/ demo website " target="_blank" rel="noreferrer" className="social-link animate-none" aria-label="WhatsApp">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Links column 1 */}
            <div>
              <h3 className="footer-label">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/70">
                <li><button onClick={() => navigate("destinations")} className="footer-link text-left">Browse Destinations</button></li>
                <li><button onClick={() => navigate("packages")} className="footer-link text-left">Travel Packages</button></li>
                <li><button onClick={() => navigate("experiences")} className="footer-link text-left">The Aabshar Experience</button></li>
                <li><button onClick={() => navigate("about")} className="footer-link text-left">Why Choose Us</button></li>
              </ul>
            </div>

            {/* Links column 2 */}
            <div>
              <h3 className="footer-label">Popular Destinations</h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/70">
                <li><button onClick={() => planFor("Hunza Valley")} className="footer-link text-left">Hunza Valley Expedition</button></li>
                <li><button onClick={() => planFor("Skardu")} className="footer-link text-left">Skardu Wilderness Escape</button></li>
                <li><button onClick={() => planFor("Fairy Meadows")} className="footer-link text-left">Fairy Meadows & Nanga Parbat</button></li>
                <li><button onClick={() => planFor("Swat Valley")} className="footer-link text-left">Swat Valley & Kalam</button></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="footer-label">Get your custom website today</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-white/70">
                <li className="flex gap-2.5">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#e8bd78]" />
                  <span>Get your custom website today, Pakistan</span>
                </li>
                <li className="flex gap-2.5">
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-[#e8bd78]" />
                  <a href="mailto:hello@nexoradigital.com" className="footer-link">hello@nexoradigital.com</a>
                </li>
                <li className="flex gap-2.5">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-[#e8bd78]" />
                  <a href="tel:This is a demo website by Nexora Digital" className="footer-link">This is a demo website by Nexora Digital</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col gap-3 py-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40 sm:flex-row sm:justify-between">
            <span>© 2026 Aabshar Journeys (Pvt) Ltd. All rights reserved.</span>
            <span className="text-[#e8bd78]/60">Certified Luxury Pakistan Travel Partner</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
