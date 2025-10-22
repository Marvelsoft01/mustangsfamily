import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gen1 from "@/assets/mustang-gen1.jpg";
import gen2 from "@/assets/mustang-gen2.jpg";
import gen3 from "@/assets/mustang-gen3.jpg";
import gen4 from "@/assets/mustang-gen4.jpg";
import gen5 from "@/assets/mustang-gen5.jpg";
import gen6 from "@/assets/mustang-gen6.jpg";
import gen7 from "@/assets/mustang-gen7.jpg";

interface Era {
  generation: string;
  years: string;
  tagline: string;
  models: string[];
  image: string;
}

const eras: Era[] = [
  {
    generation: "First Generation",
    years: "1965–1973",
    tagline: "The birth of the pony car.",
    models: [
      "1964½ Mustang Hardtop & Convertible",
      "1967–68 Shelby GT350 & GT500",
      "1969 Mach 1, Boss 302, Boss 429",
      "1971–73 Mach 1 & Boss 351"
    ],
    image: gen1
  },
  {
    generation: "Second Generation",
    years: "1974–1978",
    tagline: "Smaller, smarter, and shaped by the times.",
    models: [
      "Mustang II Mach 1",
      "Mustang II King Cobra"
    ],
    image: gen2
  },
  {
    generation: "Third Generation",
    years: "1979–1993",
    tagline: "The Fox Body years — born for the streets.",
    models: [
      "Mustang GT",
      "Mustang SVO (Turbocharged 4-cylinder)",
      "1993 Mustang Cobra R"
    ],
    image: gen3
  },
  {
    generation: "Fourth Generation",
    years: "1994–2004",
    tagline: "Modern muscle with attitude.",
    models: [
      "1994 Mustang GT",
      "2001 Bullitt",
      "2003–04 Mach 1",
      "2003–04 Cobra \"Terminator\""
    ],
    image: gen4
  },
  {
    generation: "Fifth Generation",
    years: "2005–2014",
    tagline: "Retro reborn.",
    models: [
      "2005 Mustang GT",
      "2008 Bullitt",
      "2012 Boss 302 Laguna Seca",
      "2013 Shelby GT500"
    ],
    image: gen5
  },
  {
    generation: "Sixth Generation",
    years: "2015–2023",
    tagline: "Global power, electric beginnings.",
    models: [
      "Mustang GT",
      "Shelby GT350 & GT500",
      "Bullitt (2019)",
      "Mach 1 (2021)",
      "Mustang Mach-E (2021–Present)"
    ],
    image: gen6
  },
  {
    generation: "Seventh Generation",
    years: "2024–Present",
    tagline: "The modern masterpiece.",
    models: [
      "2024 Mustang GT",
      "Mustang Dark Horse & Dark Horse Premium",
      "Mustang EcoBoost",
      "Mustang Convertible"
    ],
    image: gen7
  }
];

const EraCard = ({ era, index }: { era: Era; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden cinematic-shadow hover:glow-blue transition-all duration-300 group">
        {/* Car Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={era.image} 
            alt={`${era.generation} Mustang`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center cinematic-shadow">
            <span className="text-background font-bold text-lg">{index + 1}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-gradient-accent mb-2">
              {era.generation}
            </h3>
            <p className="text-xl font-semibold text-metallic">{era.years}</p>
          </div>
          
          <p className="text-lg italic text-muted-foreground mb-6">
            "{era.tagline}"
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-metallic uppercase tracking-wide">
              Key Models:
            </p>
            <ul className="space-y-2">
              {era.models.map((model, idx) => (
                <li key={idx} className="text-foreground flex items-start">
                  <span className="text-amber mr-2">▸</span>
                  <span>{model}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TimelineSection = () => {
  return (
    <section id="timeline" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-spotlight opacity-20" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Driving Through <span className="text-gradient-accent">Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seven generations. Six decades. One unstoppable legend.
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {eras.map((era, index) => (
            <EraCard key={index} era={era} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl font-light text-metallic italic">
            The 2025 Mustang Dark Horse drives off into a futuristic night,
            <br />
            leaving a glowing trail that forms the iconic pony logo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
