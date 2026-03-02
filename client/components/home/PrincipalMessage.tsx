import React from "react";
import { motion } from "framer-motion";
import { Quote, GraduationCap, School, BookOpen } from "lucide-react";

export const PrincipalMessage = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square overflow-hidden rounded-full border-[10px] sm:border-[15px] border-accent/30 gold-border shadow-2xl z-20"
            >
              <div className="absolute inset-0 bg-primary/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1544161515-4af6b1d4640d?q=80&w=2070&auto=format&fit=crop"
                alt="Principal"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </motion.div>
            
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-[80px] pointer-events-none z-0" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none z-0" />
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-0 bg-accent p-4 sm:p-6 shadow-2xl z-30 transform -translate-x-8 sm:-translate-x-10"
            >
              <Quote className="text-foreground w-12 h-12 opacity-50 mb-4" />
              <p className="text-foreground font-heading font-bold text-lg italic leading-relaxed max-w-[250px]">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">PRINCIPAL'S MESSAGE</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 leading-tight">
              Our Commitment to <br />
              <span className="text-accent italic font-medium">Shangla</span>
            </h2>
            
            <div className="space-y-5 text-foreground/70 text-lg leading-relaxed font-body">
              <p>
                At The Smart School & Girls College, Shangla, we believe every child deserves a world-class education.
                We were founded to remove regional barriers and bring modern learning to our community.
              </p>
              <p>
                We focus on female empowerment with a dedicated, secure campus for girls from Grade 6 to College.
                Our mission is clear: turn challenges into opportunities for excellence.
              </p>
            </div>
            
            <div className="mt-12 pt-10 border-t border-accent/20">
              <h4 className="text-2xl font-heading font-bold text-foreground mb-1">Dr. Saira Ahmed</h4>
              <p className="text-accent font-heading text-[10px] tracking-widest font-bold uppercase">Ph.D. IN EDUCATION | PRINCIPAL</p>
            </div>

            <div className="mt-6 flex items-center gap-4 text-accent/80 text-[10px] tracking-widest uppercase font-bold">
              <div className="w-12 h-[1px] bg-accent/60" />
              <div className="w-12 h-[1px] bg-accent/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



