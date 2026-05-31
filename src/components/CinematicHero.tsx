"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, team, contactInfo, stats } from "@/data/site-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 10) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 8, rotationX: -yVal * 8, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  // Master scroll timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-line-1", { autoAlpha: 0, y: 60, scale: 0.9, filter: "blur(15px)" });
      gsap.set(".text-line-2", { autoAlpha: 0, y: 60, scale: 0.9, filter: "blur(15px)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set([".scene-services", ".scene-team", ".scene-contact"], { autoAlpha: 0 });
      gsap.set([".phone-screen-services", ".phone-screen-team", ".phone-screen-contact"], { autoAlpha: 0 });

      const isMobile = window.innerWidth < 1024;

      // Intro text animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-line-1", { duration: 1.4, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "expo.out" })
        .to(".text-line-2", { duration: 1.4, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "expo.out" }, "-=0.8");

      // Master scroll timeline - pinned for ~14000px
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=14000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      scrollTl
        // PHASE 1: Intro text fades, card rises
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })

        // PHASE 2: Phone + Dashboard scene
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 0.4, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.5"
        )
        .to(".mockup-scroll-wrapper", { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.2)", duration: 1.2 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.0")
        .to(".counter-val", { innerHTML: 50, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge.badge-brands", { y: 100, autoAlpha: 0, scale: 0.7 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1.5 }, "-=1.5")
        .fromTo(".floating-badge.badge-reels", { y: 100, autoAlpha: 0, scale: 0.7 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1.2 }, "-=1.0")
        .fromTo(".scene-dashboard .side-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".scene-dashboard .brand-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2 })

        // PHASE 3: Transition to Services
        .to([".scene-dashboard .side-text", ".scene-dashboard .brand-text", ".floating-badge"], { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" })
        .to(".phone-screen-dashboard", { autoAlpha: 0, duration: 0.8 }, "-=0.5")
        .to(".phone-screen-services", { autoAlpha: 1, duration: 0.8 }, "-=0.3")
        .to(".scene-services", { autoAlpha: 1, duration: 0.8 }, "-=0.8")
        .fromTo(".scene-services .service-item", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "power3.out", duration: 0.8 }, "-=0.3");
      if (isMobile) scrollTl.to(".mockup-scroll-wrapper", { opacity: 0.45, ease: "power2.inOut", duration: 1.2 });
      scrollTl.to({}, { duration: 3 });

      // PHASE 4: Services → Team
      scrollTl
        .to(".scene-services", { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" })
        .to(".phone-screen-services", { autoAlpha: 0, duration: 0.8 }, "-=0.5")
        .to(".phone-screen-team", { autoAlpha: 1, duration: 0.8 }, "-=0.3");
      if (isMobile) scrollTl.to(".mockup-scroll-wrapper", { opacity: 1, duration: 0.4 });
      scrollTl
        .to(".scene-team", { autoAlpha: 1, duration: 0.8 })
        .fromTo(".scene-team .team-card", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, ease: "power3.out", duration: 1 }, "-=0.3");
      if (isMobile) scrollTl.to(".mockup-scroll-wrapper", { opacity: 0.45, ease: "power2.inOut", duration: 1.2 });
      scrollTl.to({}, { duration: 3 });

      // PHASE 5: Team → Contact
      scrollTl
        .to(".scene-team", { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" })
        .to(".phone-screen-team", { autoAlpha: 0, duration: 0.8 }, "-=0.5")
        .to(".phone-screen-contact", { autoAlpha: 1, duration: 0.8 }, "-=0.3");
      if (isMobile) scrollTl.to(".mockup-scroll-wrapper", { opacity: 1, duration: 0.4 });
      scrollTl
        .to(".scene-contact", { autoAlpha: 1, duration: 0.8 })
        .fromTo(".scene-contact .contact-item", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power3.out", duration: 0.8 }, "-=0.3");
      if (isMobile) scrollTl.to(".mockup-scroll-wrapper", { opacity: 0.45, ease: "power2.inOut", duration: 1.2 });
      scrollTl.to({}, { duration: 2.5 });

      // PHASE 6: Exit
      scrollTl.to(".main-card", { scale: 0.9, opacity: 0, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased"
      style={{ perspective: "1500px" }}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* INTRO TEXT */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-line-1 text-3d-matte text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-3">
          We make brands
        </h1>
        <h1 className="text-line-2 text-silver-matte text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter pb-2">
          go viral.
        </h1>
      </div>

      {/* THE CARD */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DASHBOARD SCENE */}
          <div className="scene-dashboard absolute inset-0 flex items-center z-10">
            <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 pt-20 pb-6 lg:py-0">

              {/* Brand Name */}
              <div className="brand-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
                <h2 className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-tighter text-card-silver-matte text-center lg:text-right leading-[0.9]">
                  SoChill<br />Media
                </h2>
              </div>

              {/* PHONE MOCKUP */}
              <div className="mockup-scroll-wrapper order-2 relative w-full h-[360px] lg:h-[580px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
                <div className="relative w-full h-full flex items-center justify-center transform scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100">

                  {/* iPhone Bezel */}
                  <div ref={mockupRef} className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md" style={{ transform: "scaleX(-1)" }} aria-hidden="true" />

                    {/* Screen */}
                    <div className="absolute inset-[7px] bg-[#030812] rounded-[2.5rem] overflow-hidden text-white z-10" style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}>
                      <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
                      {/* Dynamic Island */}
                      <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                      </div>

                      {/* SCREEN: Dashboard */}
                      <div className="phone-screen-dashboard absolute inset-0 pt-12 px-5 pb-8 flex flex-col">
                        <div className="phone-widget flex justify-between items-center mb-5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                              <Image src="/logo.png" alt="" width={18} height={18} className="rounded" />
                            </div>
                            <div>
                              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Dashboard</span>
                              <p className="text-xs font-bold text-white leading-tight">SoChillMedia</p>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-[9px] border border-blue-500/20">AK</div>
                        </div>

                        <div className="phone-widget relative w-36 h-36 mx-auto flex items-center justify-center mb-5">
                          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                            <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="9" />
                            <circle className="progress-ring" cx="72" cy="72" r="58" fill="none" stroke="#0033CC" strokeWidth="9" />
                          </svg>
                          <div className="text-center z-10 flex flex-col items-center">
                            <span className="counter-val text-3xl font-extrabold tracking-tighter text-white">0</span>
                            <span className="text-[7px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">Brands Served</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-700/5 flex items-center justify-center mr-2.5 border border-blue-500/20">
                              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-[10px] font-semibold text-white/90">Reels Production</div>
                              <div className="text-[8px] text-neutral-500">500+ reels delivered</div>
                            </div>
                            <div className="text-[9px] text-green-400 font-bold">+28%</div>
                          </div>
                          <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 flex items-center justify-center mr-2.5 border border-cyan-400/20">
                              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-[10px] font-semibold text-white/90">Brand Design</div>
                              <div className="text-[8px] text-neutral-500">Identity packages</div>
                            </div>
                            <div className="text-[9px] text-blue-400 font-bold">Active</div>
                          </div>
                          <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-2.5 border border-emerald-400/20">
                              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-[10px] font-semibold text-white/90">Growth Analytics</div>
                              <div className="text-[8px] text-neutral-500">Social metrics</div>
                            </div>
                            <div className="text-[9px] text-emerald-400 font-bold">↑ 156%</div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                      </div>

                      {/* SCREEN: Services */}
                      <div className="phone-screen-services absolute inset-0 pt-12 px-5 pb-8 flex flex-col">
                        <div className="phone-widget flex items-center gap-2 mb-5">
                          <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                          </div>
                          <span className="text-xs font-bold text-white">Our Services</span>
                        </div>
                        <div className="space-y-2 overflow-hidden">
                          {services.slice(0, 5).map((s, i) => (
                            <div key={i} className="widget-depth rounded-xl p-2.5 flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/10 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400/60" />
                              </div>
                              <div>
                                <div className="text-[10px] font-semibold text-white/90">{s.title}</div>
                                <div className="text-[8px] text-neutral-500 line-clamp-1">{s.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                      </div>

                      {/* SCREEN: Team */}
                      <div className="phone-screen-team absolute inset-0 pt-12 px-5 pb-8 flex flex-col">
                        <div className="phone-widget flex items-center gap-2 mb-5">
                          <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          </div>
                          <span className="text-xs font-bold text-white">Our Team</span>
                        </div>
                        <div className="space-y-3">
                          {team.map((member, i) => (
                            <div key={i} className="widget-depth rounded-xl p-3 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-800/20 flex items-center justify-center border border-blue-500/20 text-sm font-bold text-blue-300 shrink-0">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold text-white/90">{member.name}</div>
                                <div className="text-[9px] text-neutral-400">{member.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                      </div>

                      {/* SCREEN: Contact */}
                      <div className="phone-screen-contact absolute inset-0 pt-12 px-5 pb-8 flex flex-col">
                        <div className="phone-widget flex items-center gap-2 mb-5">
                          <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <span className="text-xs font-bold text-white">Get In Touch</span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="widget-depth rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                              <div className="text-[9px] text-neutral-500">Phone</div>
                              <div className="text-[11px] font-medium text-white">{contactInfo.phone}</div>
                            </div>
                          </div>
                          <div className="widget-depth rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                              <div className="text-[9px] text-neutral-500">Email</div>
                              <div className="text-[10px] font-medium text-white">{contactInfo.email}</div>
                            </div>
                          </div>
                          <div className="widget-depth rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                              <svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </div>
                            <div>
                              <div className="text-[9px] text-neutral-500">Instagram</div>
                              <div className="text-[11px] font-medium text-white">{contactInfo.instagramHandle}</div>
                            </div>
                          </div>
                          <div className="widget-depth rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
                            </div>
                            <div>
                              <div className="text-[9px] text-neutral-500">Website</div>
                              <div className="text-[11px] font-medium text-white">{contactInfo.website}</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <div className="floating-badge badge-brands absolute flex top-6 lg:top-12 left-[-10px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-4 items-center gap-2.5 lg:gap-4 z-30">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-600/20 to-blue-900/5 flex items-center justify-center border border-blue-500/30">
                      <span className="text-sm lg:text-xl" aria-hidden="true">🎬</span>
                    </div>
                    <div>
                      <p className="text-white text-[11px] lg:text-sm font-bold tracking-tight">500+ Reels</p>
                      <p className="text-blue-200/50 text-[9px] lg:text-xs font-medium">Delivered this year</p>
                    </div>
                  </div>

                  <div className="floating-badge badge-reels absolute flex bottom-10 lg:bottom-20 right-[-10px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-4 items-center gap-2.5 lg:gap-4 z-30">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-cyan-500/20 to-cyan-900/10 flex items-center justify-center border border-cyan-400/30">
                      <span className="text-sm lg:text-lg" aria-hidden="true">📈</span>
                    </div>
                    <div>
                      <p className="text-white text-[11px] lg:text-sm font-bold tracking-tight">50+ Brands</p>
                      <p className="text-blue-200/50 text-[9px] lg:text-xs font-medium">Trusted us</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Side text */}
              <div className="side-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 tracking-tight">
                  Content that performs.
                </h3>
                <p className="hidden md:block text-blue-100/60 text-sm lg:text-base font-normal leading-relaxed max-w-sm lg:max-w-none">
                  <span className="text-white font-semibold">SoChillMedia</span> delivers social media management, cinematic videography, viral reels, and complete brand identity — all under one roof.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICES SCENE */}
          <div className="scene-services absolute inset-0 flex items-center z-10">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <div className="lg:w-1/3 text-center lg:text-left order-2 lg:order-1">
                <p className="text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">What We Do</p>
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 tracking-tight">Everything your brand needs.</h3>
                <div className="space-y-2">
                  {services.map((s, i) => (
                    <div key={i} className="service-item flex items-center gap-3 text-left p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <div>
                        <p className="text-white text-xs sm:text-sm font-medium">{s.title}</p>
                        <p className="text-neutral-500 text-[10px] sm:text-xs hidden lg:block">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/3 order-1 lg:order-2" />
              <div className="lg:w-1/3 order-3 text-center lg:text-right">
                <div className="space-y-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="service-item">
                      <p className="text-3xl lg:text-5xl font-black text-white">{stat.value}</p>
                      <p className="text-neutral-400 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TEAM SCENE */}
          <div className="scene-team absolute inset-0 flex items-center z-10">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <div className="lg:w-1/3 text-center lg:text-left order-2 lg:order-1">
                <p className="text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">Our Team</p>
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 tracking-tight">Built by creatives, for brands.</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  A team of filmmakers, designers, strategists, and social media natives who live and breathe creative culture.
                </p>
              </div>
              <div className="lg:w-1/3 order-1 lg:order-2" />
              <div className="lg:w-1/3 order-3 space-y-3">
                {team.map((member, i) => (
                  <div key={i} className="team-card flex items-center gap-4 p-3 rounded-xl bg-white/[0.08] border border-white/20 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/50 to-blue-800/40 flex items-center justify-center border border-blue-400/40 text-base font-bold text-blue-200 shrink-0">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{member.name}</p>
                      <p className="text-neutral-300 text-xs">{member.role}</p>
                      <p className="text-blue-400 text-[10px] italic">{member.vibe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT SCENE */}
          <div className="scene-contact absolute inset-0 flex items-center z-10">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <div className="lg:w-1/3 text-center lg:text-left order-2 lg:order-1">
                <p className="text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">Get In Touch</p>
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 tracking-tight">Let&apos;s create something epic.</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Ready to elevate your brand? Reach out and let&apos;s make it happen.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-item inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </a>
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="contact-item inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:opacity-90 text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    Instagram
                  </a>
                </div>
              </div>
              <div className="lg:w-1/3 order-1 lg:order-2" />
              <div className="lg:w-1/3 order-3 space-y-3">
                <div className="contact-item p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">{contactInfo.phone}</a>
                </div>
                <div className="contact-item p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">{contactInfo.email}</a>
                </div>
                <div className="contact-item p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">Instagram</p>
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-blue-400 transition-colors">{contactInfo.instagramHandle}</a>
                </div>
                <div className="contact-item p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">Website</p>
                  <p className="text-white text-sm font-medium">{contactInfo.website}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
