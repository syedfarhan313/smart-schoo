import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, GraduationCap, School, BookOpen } from "lucide-react";

const testimonials = [
  {
    text: "The Smart School & Girls College provided me with an environment that was both academically challenging and spiritually fulfilling. I am now pursuing my medical degree with confidence and clarity.",
    name: "Fatima Khan",
    role: "ALUMNA | PRE-MEDICAL 2022",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  {
    text: "As a parent, I am truly impressed with the personal attention my daughter receives. The faculty goes above and beyond to ensure every student's growth. The integration of Islamic values is exceptional.",
    name: "Dr. Rashid Malik",
    role: "PARENT | GRADE 10",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    text: "The facilities, from the science labs to the library, are world-class. My daughter loves going to school every day. I highly recommend this institution to every parent.",
    name: "Mrs. Amna Siddiqui",
    role: "PARENT | PRIMARY SCHOOL",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />
      
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
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">COMMUNITY VOICES</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Hear From Our <br />
              <span className="text-accent italic font-medium">Families</span>
            </h2>
            <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-6 sm:p-8 lg:p-10 shadow-2xl relative border-t-4 border-accent"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-accent flex items-center justify-center shadow-lg">
                <Quote className="text-foreground w-6 h-6" />
              </div>
              
              <div className="flex gap-1 mb-6 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground/70 text-base leading-relaxed mb-10 font-body italic">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-6 pt-8 border-t border-accent/10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent/20">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-1">{t.name}</h4>
                  <p className="text-accent font-heading text-[10px] tracking-widest font-bold uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



