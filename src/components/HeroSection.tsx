import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroClassic from "@/assets/hero-classic-mustang.jpg";
import heroDarkHorse from "@/assets/hero-dark-horse.jpg";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Transition */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src={heroClassic}
            alt="Classic 1965 Ford Mustang"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 3 }}
          className="absolute inset-0"
        >
          <img
            src={heroDarkHorse}
            alt="2025 Mustang Dark Horse"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-gradient-accent">Mustang's</span>
            <br />
            <span className="text-foreground">Family</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl font-light text-metallic">
            Power Through Generations
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From the roar of 1964 to the hum of 2025 — a legacy that redefined performance.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground italic">
            Welcome to the Mustang Family.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12"
        >
          <Button
            onClick={scrollToTimeline}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-full glow-blue transition-all duration-300 hover:scale-105"
          >
            Start the Journey
            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="h-8 w-8 text-metallic animate-bounce" />
      </motion.div>
    </section>
  );
};
