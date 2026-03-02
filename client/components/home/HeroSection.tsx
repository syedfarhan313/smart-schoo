import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[100svh] min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-primary/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury School Building"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-10 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent font-heading tracking-[0.3em] text-sm uppercase font-bold">ESTABLISHED SINCE 2020</span>
            <div className="w-12 h-[1px] bg-accent" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight drop-shadow-2xl">
            Welcome to <br />
            <span className="text-accent italic font-medium">The Smart School</span>
            <br />& Girls College
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/80 font-body font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering Excellence in Girls' Education with a perfect blend of modern academic standards and Islamic values.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/admissions" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-16 px-10 bg-accent hover:bg-accent/90 text-foreground font-bold text-lg rounded-none gold-gradient border-2 border-primary/20 shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                ADMISSIONS OPEN
              </Button>
            </Link>
            <Link to="/programs" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-16 px-10 border-white bg-card text-foreground hover:bg-accent hover:text-foreground font-bold text-lg rounded-none transition-all duration-300 transform hover:-translate-y-1">
                EXPLORE PROGRAMS
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="text-accent w-10 h-10 cursor-pointer" />
      </motion.div>
    </section>
  );
};


