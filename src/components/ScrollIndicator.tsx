import { useState, useEffect } from "react";
import { Car, ChevronUp } from "lucide-react";

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setIsAtBottom(progress >= 95);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          className="absolute -left-6 -translate-y-1/2 transition-all duration-100 pointer-events-auto cursor-pointer group"
          style={{ top: `${scrollProgress}%` }}
          onClick={isAtBottom ? scrollToTop : undefined}
        >
          {/* 3D Shadow Effect */}
          <div className="absolute inset-0 blur-lg bg-destructive/40 rounded-full scale-110 group-hover:scale-125 transition-transform" />
          
          {/* Mustang Car Icon */}
          <div className="relative">
            <Car 
              className={`w-12 h-12 text-destructive drop-shadow-lg transform transition-all duration-300 ${
                isAtBottom 
                  ? "group-hover:scale-125 group-hover:-translate-y-1 animate-pulse" 
                  : ""
              }`}
              fill="currentColor"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--destructive)))",
                transform: `rotateY(${scrollProgress % 2 === 0 ? "0deg" : "5deg"})`
              }}
            />
            
            {/* Up Arrow when at bottom */}
            {isAtBottom && (
              <ChevronUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-bounce" />
            )}
          </div>
          
          {/* Exhaust Effect */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-1 bg-gradient-to-r from-orange/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};
