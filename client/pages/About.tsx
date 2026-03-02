import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Target, Eye, Heart, History, UserCheck, Award, MessageCircle } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">OUR STORY</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">About Our <br /><span className="text-accent italic font-medium">Institution</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">Established in 2020 with a commitment to excellence, faith, and modern education.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Our Mission", desc: "To deliver modern, high-quality education grounded in Islamic values, nurturing confident, capable, and compassionate learners." },
              { icon: Eye, title: "Our Vision", desc: "To be a leading institution in Shangla that shapes future-ready students with faith, knowledge, and character." },
              { icon: Heart, title: "Our Values", desc: "Faith, Excellence, Respect, Discipline, and Responsibility guide every decision we make and every student we support." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-6 sm:p-8 md:p-10 border border-accent/10 bg-background text-center shadow-xl">
                <item.icon className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[16/9] gold-border overflow-hidden">
              <img src="/logo.jpeg" className="w-full h-full object-cover grayscale-[30%]" alt="School History" />
            </div>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-8">History of <span className="text-accent italic font-medium">Institution</span></h2>
              <div className="space-y-6 text-white/70 text-lg">
                <p>Established in 2020, The Smart School & Girls College started as a focused initiative to provide quality education to girls in a safe, Islamic environment.</p>
                <p>Over the past years, we have grown into a multi-campus institution recognized for its academic results and character-building programs.</p>
              </div>
              <div className="mt-10 flex gap-12">
                <div><h4 className="text-3xl font-heading font-bold text-accent">2020</h4><p className="text-xs tracking-widest uppercase">Established</p></div>
                <div><h4 className="text-3xl font-heading font-bold text-accent">5000+</h4><p className="text-xs tracking-widest uppercase">Alumnae</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}




