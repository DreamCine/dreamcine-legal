import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    fetch('/loop-header.lottie').then(response => response.json()).then(data => setLottieData(data)).catch(error => console.error("Error loading Lottie animation:", error));
  }, []);
  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  return <section className="overflow-hidden relative z-10" id="hero" style={{
    padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
  }}>
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-gradient-to-br from-orange-500 to-yellow-500 opacity-30 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            
            
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in text-white" style={{
            animationDelay: "0.3s"
          }}>
              DreamCine: Where Your<br className="hidden sm:inline" />Stories Come Alive
            </h1>
            
            <p style={{
            animationDelay: "0.5s"
          }} className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-white font-normal text-base sm:text-lg text-left">
              Share an idea, and we'll turn it into a film or series. Here, anyone can become a creator, while audiences discover unique movies made by people from around the world. The future of cinema starts here.
            </p>
            
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
              style={{
                animationDelay: "0.7s",
              }}
            >
              <a
                href="#" // TODO: replace with real App Store link
                className="group relative flex w-full sm:w-auto items-center gap-4 rounded-xl border border-white/15 bg-[#0f0f10] px-5 py-4 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-black/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2b6cff] via-[#2f8fff] to-[#5bb9ff] p-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                    alt="App Store icon"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-wide text-white/60">
                    Download on the
                  </span>
                  <span className="text-lg font-semibold text-white">
                    App Store
                  </span>
                </span>
                <ArrowRight className="ml-auto hidden h-5 w-5 text-white/60 transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                <span className="pointer-events-none absolute inset-0 rounded-xl border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <a
                href="#"
                className="group relative flex w-full sm:w-auto items-center gap-4 rounded-xl border border-emerald-200/20 bg-[#0f0f10] px-5 py-4 shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/40 hover:shadow-emerald-900/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00e676] via-[#00c853] to-[#1de9b6] p-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Play_2022_icon.svg"
                    alt="Google Play icon"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-wide text-white/80">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold text-white">
                    Google Play
                  </span>
                </span>
                <ArrowRight className="ml-auto hidden h-5 w-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                <span className="pointer-events-none absolute inset-0 rounded-xl border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {lottieData ? <div className="relative z-10 animate-fade-in" style={{
            animationDelay: "0.9s"
          }}>
                <LottieAnimation animationPath={lottieData} className="w-full h-auto max-w-lg mx-auto" loop={true} autoplay={true} />
              </div> : <>
              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <img ref={imageRef} src="/main2.png" alt="Atlas Robot" className="w-full h-auto object-cover transition-transform duration-500 ease-out" style={{
                transformStyle: 'preserve-3d'
              }} />
                <div className="absolute inset-0" style={{
                // backgroundImage: 'url("/main2.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'overlay',
                opacity: 0.5
              }}></div>
              </div>
              </>}
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
