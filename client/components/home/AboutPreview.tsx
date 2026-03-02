import React from "react";

export const AboutPreview = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-full border-[10px] sm:border-[15px] border-accent/30 gold-border shadow-2xl z-20">
              <div className="absolute inset-0 bg-primary/20 z-10" />
              <img
                src="/WhatsApp%20Image%202026-02-19%20at%2011.25.32%20PM.jpeg"
                alt="Principal"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-[80px] pointer-events-none z-0" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none z-0" />

          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
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
              <h4 className="text-2xl font-heading font-bold text-foreground mb-1">Muhammad Azizanwar</h4>
              <p className="text-accent font-heading text-[10px] tracking-widest font-bold uppercase">
                Founder The System
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4 text-accent/80 text-[10px] tracking-widest uppercase font-bold">
              <div className="w-12 h-[1px] bg-accent/60" />
              <div className="w-12 h-[1px] bg-accent/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



