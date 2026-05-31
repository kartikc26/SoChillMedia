// ============================================================
// SITE DATA — Edit this file to update ALL website content
// ============================================================

export const siteConfig = {
  name: "SoChillMedia",
  tagline: "We make brands go viral, look good, and feel unforgettable.",
  subline: "India's multimedia agency for brands that mean business.",
  description: "Premium multimedia agency delivering social media, video production, branding, and creative design.",
  url: "https://sochillmedia.in",
};

export const contactInfo = {
  phone: "+917249992499",
  email: "aryankapoor@sochillmedia.in",
  instagram: "https://www.instagram.com/sochillmedia.co",
  instagramHandle: "@sochillmedia.co",
  website: "sochillmedia.in",
  whatsapp: "https://wa.me/917249992499",
};

// ============================================================
// SERVICES — Add/remove/reorder services here
// ============================================================
export const services = [
  {
    title: "Social Media Management",
    description: "Instagram, Facebook, YouTube, LinkedIn — we handle your entire presence.",
  },
  {
    title: "Photography & Videography",
    description: "Professional shoots that tell your brand's story with cinematic quality.",
  },
  {
    title: "Reels & Short-Form Content",
    description: "Scroll-stopping content designed to go viral and boost engagement.",
  },
  {
    title: "UGC Videos",
    description: "Authentic user-generated style content that builds trust and converts.",
  },
  {
    title: "Paid Ads & Campaign Optimization",
    description: "Meta, Google, YouTube ads — strategy, creatives, and performance tracking.",
  },
  {
    title: "Graphic Design",
    description: "Creatives, menus, pamphlets, and designs that turn heads.",
  },
  {
    title: "Branding & Identity",
    description: "Logo, color palette, typography — your complete brand universe.",
  },
  {
    title: "Post-Production & Video Editing",
    description: "Color grading, transitions, effects — polished to perfection.",
  },
  {
    title: "Events Coverage",
    description: "Capture every moment of your events with multi-camera setups.",
  },
  {
    title: "Space & Mural Design",
    description: "Transform physical spaces into brand experiences that wow visitors.",
  },
];

// ============================================================
// STATS — Update numbers as your agency grows
// ============================================================
export const stats = [
  { value: "500+", label: "Reels Created" },
  { value: "50+", label: "Brands Served" },
  { value: "100%", label: "Client Retention" },
];

// ============================================================
// TEAM — Add/remove members easily. Just add a new object.
// ============================================================
export const team = [
  {
    name: "Aryan Kapoor",
    role: "Founder & Creative Director",
    vibe: "The one who started it all",
  },
  {
    name: "Charu Kapoor",
    role: "Social Media Manager",
    vibe: "The wizard behind your engagement",
  },
  {
    name: "Priya Chaudhry",
    role: "Lead Graphic Designer",
    vibe: "Turns blank canvases into brand stories",
  },
  {
    name: "Sidharath Maurya",
    role: "Lead Video Editor",
    vibe: "Every cut tells a story",
  },
  {
    name: "Vivek",
    role: "Video Editor",
    vibe: "Turning raw footage into viral gold",
  },
];

// ============================================================
// NAV — Scroll progress (0 to 1) for single-page navigation
// These are percentages of total scroll, works on any device
// ============================================================
export const navScrollProgress: Record<string, number> = {
  services: 0.35,  // Services section
  team: 0.58,      // Team section
  contact: 0.82,   // Contact / Let's Work Together
};

export const navLinks = [
  { label: "Services", key: "services" },
  { label: "Team", key: "team" },
];
