import React from "react";
import { motion } from "framer-motion";
import { Laptop, Microscope, BookOpen, Utensils, ShieldCheck, Bus, Volleyball, Star, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const facilities = [
  { icon: Laptop, title: "SMART CLASSROOMS", description: "Interactive boards and modern learning tools in every room." },
  { icon: Microscope, title: "SCIENCE LABS", description: "State-of-the-art equipment for Physics, Chemistry, and Biology." },
  { icon: BookOpen, title: "DIGITAL LIBRARY", description: "Access to thousands of books and online academic resources." },
  { icon: Volleyball, title: "SPORTS COMPLEX", description: "Premium sports areas designed for physical excellence." },
  { icon: Utensils, title: "HYGIENIC CAFETERIA", description: "Quality nutrition provided in a clean, modern environment." },
  { icon: ShieldCheck, title: "SECURE CAMPUS", description: "24/7 CCTV surveillance and dedicated security personnel." },
  { icon: Bus, title: "TRANSPORT FLEET", description: "Safe and comfortable transportation for all students." },
  { icon: Star, title: "ISLAMIC CENTER", description: "Dedicated spaces for prayer and spiritual growth." },
  { icon: GraduationCap, title: "MODERN EDUCATION", description: "Updated curriculum with modern teaching methods." }
];

export const FacilitiesSection = () => {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      
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
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">CAMPUS EXCELLENCE</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              World-Class <br />
              <span className="text-accent italic font-medium">Campus Facilities</span>
            </h2>
            <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-12">
          {facilities.map((facility, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-500 mb-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <facility.icon className="w-10 h-10 relative z-10" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3 tracking-widest group-hover:text-accent transition-colors">
                {facility.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-[200px] group-hover:text-white/80 transition-colors">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link to="/facilities">
            <Button className="h-16 px-12 bg-accent text-foreground hover:bg-accent/90 font-bold text-lg rounded-none gold-gradient transition-all duration-300 transform hover:-translate-y-1 border-2 border-primary shadow-2xl">
              EXPLORE OUR CAMPUS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
import { Link } from "react-router-dom";


