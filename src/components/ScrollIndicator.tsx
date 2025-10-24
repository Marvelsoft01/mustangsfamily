import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import mustangTopView from "@/assets/mustang-top-view.png";

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else if (scrollTop < lastScrollTop) {
        setScrollDirection('up');
      }
      
      setLastScrollTop(scrollTop);
      setScrollProgress(Math.min(progress, 100));
      setIsAtBottom(progress >= 95);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed left-4 top-0 h-screen flex items-center z-50 pointer-events-none">
      {/* Race Track Bar */}
      <div className="relative h-[calc(100vh-8rem)] w-2 my-16">
        {/* Track Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-border via-muted to-border rounded-full opacity-50" />
        
        {/* Track Progress */}
        <div 
          className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-accent to-orange rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
        
        {/* Finish Line at Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/80" />
        
        {/* Mustang Icon */}
        <div
          className="absolute -left-8 -translate-y-1/2 transition-all duration-100 pointer-events-auto cursor-pointer group"
          style={{ top: `${scrollProgress}%` }}
          onClick={isAtBottom ? scrollToTop : undefined}
        >
          {/* 3D Shadow Effect */}
          <div className="absolute inset-0 blur-xl bg-yellow-500/40 scale-110 group-hover:scale-125 transition-transform" />
          
          {/* Mustang Car Image */}
          <div className="relative w-20 h-20">
            <img 
              src={mustangTopView}
              alt="Mustang"
              className={`w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ${
                isAtBottom 
                  ? "group-hover:scale-125 group-hover:-translate-y-1 animate-pulse" 
                  : ""
              }`}
              style={{
                filter: "drop-shadow(0 0 16px rgba(234, 179, 8, 0.9)) drop-shadow(0 0 8px rgba(239, 68, 68, 0.6)) brightness(1.15) contrast(1.1)",
                mixBlendMode: "normal",
                transform: scrollDirection === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
            
            {/* Up Arrow when at bottom */}
            {isAtBottom && (
              <ChevronUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-bounce drop-shadow-lg" />
            )}
          </div>
          
          {/* Exhaust Effect */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-2 bg-gradient-to-r from-orange/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
        </div>
      </div>
    </div>
  );
};
