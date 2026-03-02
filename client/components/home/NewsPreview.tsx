import React from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, GraduationCap, School, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsItems = [
  {
    date: "MAR 12, 2024",
    title: "ANNUAL SPORTS DAY CELEBRATION",
    category: "EVENT",
    image: "https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    date: "FEB 28, 2024",
    title: "OUTSTANDING MATRICULATION RESULTS 2024",
    category: "ACADEMICS",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    date: "JAN 15, 2024",
    title: "ISLAMIC ART & CULTURE EXHIBITION",
    category: "EXHIBITION",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop"
  }
];

export const NewsPreview = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">STAY UPDATED</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Latest News & <br />
              <span className="text-accent italic font-medium">Events</span>
            </h2>
            <div className="w-24 h-1 bg-accent/30 rounded-full" />
          </motion.div>
          
          <Link to="/news">
            <Button variant="outline" className="h-16 px-10 border-accent/30 text-foreground hover:bg-accent hover:text-white font-bold text-lg rounded-none transition-all duration-300">
              VIEW ALL NEWS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {newsItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-none mb-8 gold-border shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500 z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20 bg-accent px-4 py-2 font-heading text-[10px] tracking-widest font-bold text-foreground shadow-xl">
                  {item.category}
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-accent font-heading text-xs font-bold mb-4 tracking-widest">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6 leading-tight group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              
              <Link to="/news" className="text-foreground font-heading text-sm font-bold tracking-widest hover:text-accent transition-colors group/link flex items-center gap-2">
                READ ARTICLE
                <ChevronRight className="w-5 h-5 transition-transform duration-300 transform group-hover/link:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


