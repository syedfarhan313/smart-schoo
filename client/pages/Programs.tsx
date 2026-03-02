import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
const campuses = [
  {
    id: "girls",
    title: "Girls Campus",
    desc: "Dedicated and secure campus for girls with modern classrooms and supportive learning environment."
  },
  {
    id: "boys",
    title: "Boys Campus",
    desc: "Strong academic focus with discipline, character building, and modern learning facilities."
  },
  {
    id: "basi",
    title: "Basi Campus",
    desc: "Community-focused campus delivering quality education with accessible facilities."
  }
];

export default function Programs() {
  return (
    <Layout>
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">OUR ACADEMICS</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">Our Academic <br /><span className="text-accent italic font-medium">Programs</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">From early childhood to higher education, we offer excellence at every step.</p>
          </motion.div>
        </div>
      </section>

      <div className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 lg:space-y-32">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campuses.map((campus, i) => (
                <motion.div
                  key={campus.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-accent/20 shadow-xl p-8 text-center"
                >
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">{campus.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{campus.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}



