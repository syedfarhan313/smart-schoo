import React from "react";
import { motion } from "framer-motion";

export const ProgramsSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">ACADEMIC EXCELLENCE</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Our Educational <br />
              <span className="text-accent italic font-medium">Pathways</span>
            </h2>
            <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {["3 Campus", "Girls Campus", "Boys Campus", "Basi Campus"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-accent/20 shadow-xl p-8 text-center font-heading font-semibold text-foreground"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



