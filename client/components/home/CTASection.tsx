import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="School Campus"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="absolute inset-0 islamic-pattern opacity-10 z-10" />
      <div className="absolute top-0 right-0 w-full h-full bg-accent/5 blur-[120px] z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">JOIN OUR LEGACY</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Begin Your Journey <br />
              <span className="text-accent italic font-medium">To Excellence</span>
            </h2>
            
            <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-xl font-body">
              Admissions are now open for the upcoming academic session. Take the first step towards a bright and successful future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/admissions">
                <Button className="w-full sm:w-auto h-16 px-10 bg-accent hover:bg-accent/90 text-foreground font-bold text-lg rounded-none gold-gradient border-2 border-primary/20 shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  APPLY ONLINE NOW
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full sm:w-auto h-16 px-10 border-white/30 text-white hover:bg-white/10 font-bold text-lg rounded-none backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1">
                  REQUEST PROSPECTUS
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-8 bg-white/5 backdrop-blur-xl p-10 xl:p-12 border border-white/10 rounded-none shadow-2xl relative"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 islamic-pattern opacity-20 pointer-events-none" />
            
            <h3 className="text-2xl font-heading font-bold mb-8 text-accent border-b border-white/10 pb-4">Contact Admissions</h3>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] tracking-widest font-bold uppercase mb-1">CALL US</p>
                  <p className="text-white text-lg font-heading font-bold">+92 123 4567890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] tracking-widest font-bold uppercase mb-1">EMAIL US</p>
                  <p className="text-white text-lg font-heading font-bold">admissions@tss-college.edu</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] tracking-widest font-bold uppercase mb-1">VISIT US</p>
                  <p className="text-white text-lg font-heading font-bold">Islamic Academic Square, Karachi</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


