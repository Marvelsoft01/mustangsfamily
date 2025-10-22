import { motion } from "framer-motion";
import mustangLogo from "@/assets/mustang-logo.jpg";

export const DesignDNA = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-timeline opacity-30" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Design <span className="text-gradient-accent">DNA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            What makes a Mustang a Mustang?
          </p>
        </motion.div>

        {/* Logo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-2xl mx-auto mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden cinematic-shadow">
            <img
              src={mustangLogo}
              alt="Mustang Pony Emblem"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-spotlight opacity-40" />
          </div>
        </motion.div>

        {/* Design Elements Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <span className="text-4xl">🏁</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Iconic Grille</h3>
            <p className="text-muted-foreground">
              The galloping pony and tri-bar design — unmistakable from every generation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Signature Lights</h3>
            <p className="text-muted-foreground">
              From sequential turn signals to LED tri-bars — lighting that tells a story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <span className="text-4xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Muscular Profile</h3>
            <p className="text-muted-foreground">
              Long hood, short deck — the silhouette that defined American muscle.
            </p>
          </motion.div>
        </div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="border-l-4 border-amber pl-6 py-4">
            <p className="text-2xl font-light text-foreground italic mb-2">
              "Design evolves. Spirit endures."
            </p>
            <p className="text-lg text-muted-foreground">
              Six decades of innovation, yet the DNA remains unmistakable —
              powerful, elegant, and forever recognizable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
