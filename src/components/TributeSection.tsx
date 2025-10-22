import { motion } from "framer-motion";
import tributeImage from "@/assets/tribute-comparison.jpg";
import { ExternalLink } from "lucide-react";

export const TributeSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for the <span className="text-gradient-accent">Next Generation</span>
          </h2>
        </motion.div>

        {/* Comparison Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden cinematic-shadow"
        >
          <img
            src={tributeImage}
            alt="1967 Mustang vs 2025 Dark Horse Comparison"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        </motion.div>

        {/* Tribute Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <p className="text-2xl font-light text-foreground leading-relaxed">
            Six decades later, the Mustang still unites dreamers, drivers, and doers.
          </p>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is a fan-made tribute — celebrating the story of power, passion, and progress.
          </p>

          <div className="pt-8">
            <motion.a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full glow-blue transition-all duration-300"
            >
              Connect with the Creator
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          </div>

          {/* Legacy Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-12 border-t border-border"
          >
            <p className="text-lg text-metallic italic">
              "The road ahead is long, but the legend is eternal."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
