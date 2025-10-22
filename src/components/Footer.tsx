import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border bg-card">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-amber fill-amber animate-pulse" />
            <span>for Mustang enthusiasts worldwide</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Mustang's Family — A Creative Tribute
          </p>

          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            This is a fan-made tribute website celebrating the Ford Mustang legacy.
            Not affiliated with or endorsed by Ford Motor Company.
            All trademarks and copyrights belong to their respective owners.
          </p>

          <div className="pt-6 text-xs text-muted-foreground">
            <p>Designed for mustangsfamily.com</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
