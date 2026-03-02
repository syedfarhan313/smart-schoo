import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Laptop, Microscope, BookOpen, Utensils, ShieldCheck, Bus, Volleyball, Star, GraduationCap } from "lucide-react";

const facilities = [
  { icon: Laptop, title: "SMART CLASSROOMS", desc: "Interactive boards and modern learning tools in every room for immersive education." },
  { icon: Microscope, title: "SCIENCE LABS", desc: "State-of-the-art equipment for Physics, Chemistry, and Biology to foster inquiry." },
  { icon: BookOpen, title: "DIGITAL LIBRARY", desc: "Access to thousands of books and online academic resources for lifelong learning." },
  { icon: Volleyball, title: "SPORTS COMPLEX", desc: "Premium sports areas designed for physical excellence and teamwork skills." },
  { icon: Utensils, title: "HYGIENIC CAFETERIA", desc: "Quality nutrition provided in a clean, modern environment for students." },
  { icon: ShieldCheck, title: "SECURE CAMPUS", desc: "24/7 CCTV surveillance and dedicated security personnel for total peace of mind." },
  { icon: Bus, title: "TRANSPORT FLEET", desc: "Safe and comfortable transportation for all students across the city." },
  { icon: Star, title: "ISLAMIC CENTER", desc: "Dedicated spaces for prayer and spiritual growth for every student." },
  { icon: GraduationCap, title: "MODERN EDUCATION", desc: "Updated curriculum with modern teaching methods for future-ready students." }
];

export default function Facilities() {
  return (
    <Layout>
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">OUR CAMPUS</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">World-Class <br /><span className="text-accent italic font-medium">Facilities</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">Designed for excellence and comfort.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card border border-accent/20 shadow-xl p-8 flex flex-col gap-5"
              >
                <div className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground tracking-widest group-hover:text-accent transition-colors">
                  {f.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}



