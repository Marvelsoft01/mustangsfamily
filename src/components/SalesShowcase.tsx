import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";
import coupe1965 from "@/assets/sales-1965-coupe.jpg";
import gt2005 from "@/assets/sales-2005-gt.jpg";
import gt2015 from "@/assets/sales-2015-gt.jpg";
import mache2021 from "@/assets/sales-2021-mache.jpg";
import darkhorse2025 from "@/assets/sales-2025-darkhorse.jpg";

interface TopMustang {
  rank: number;
  model: string;
  sales: string;
  highlight: string;
  image: string;
}

const topMustangs: TopMustang[] = [
  {
    rank: 1,
    model: "1965 Mustang Coupe",
    sales: "~559,451 (first year alone)",
    highlight: "The original icon that started it all.",
    image: coupe1965
  },
  {
    rank: 2,
    model: "2005 Mustang GT",
    sales: "~160,000 units",
    highlight: "The retro revival that reignited Mustang passion.",
    image: gt2005
  },
  {
    rank: 3,
    model: "2015 Mustang EcoBoost / GT",
    sales: "300,000+ (global launch)",
    highlight: "Took Mustang global with modern tech.",
    image: gt2015
  },
  {
    rank: 4,
    model: "2021 Mustang Mach-E",
    sales: "150,000+ (EV sales rising fast)",
    highlight: "The electric evolution of a legend.",
    image: mache2021
  },
  {
    rank: 5,
    model: "2025 Mustang Dark Horse",
    sales: "New icon in the making",
    highlight: "The fiercest naturally aspirated Mustang ever.",
    image: darkhorse2025
  }
];

const SalesCard = ({ mustang, index }: { mustang: TopMustang; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden cinematic-shadow hover:glow-amber transition-all duration-300 hover:-translate-y-2">
        {/* Rank Badge */}
        <div className="absolute top-4 left-4 z-10 h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center cinematic-shadow">
          <span className="text-2xl font-bold text-background">#{mustang.rank}</span>
        </div>

        {/* Car Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={mustang.image} 
            alt={mustang.model}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-gradient-accent transition-all">
            {mustang.model}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-amber" />
            <p className="text-lg font-semibold text-metallic">
              {mustang.sales}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {mustang.highlight}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const SalesShowcase = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Icons That Defined <span className="text-gradient-accent">Generations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most successful Mustangs by global sales volume and cultural influence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topMustangs.slice(0, 3).map((mustang, index) => (
            <SalesCard key={index} mustang={mustang} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {topMustangs.slice(3).map((mustang, index) => (
            <SalesCard key={index + 3} mustang={mustang} index={index + 3} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-metallic italic">
            "Each Mustang tells a story — but some became legends in numbers and hearts alike."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
