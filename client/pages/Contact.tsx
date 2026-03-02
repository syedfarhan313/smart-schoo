import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">GET IN TOUCH</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">Contact <br /><span className="text-accent italic font-medium">Us</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">We are here to answer your questions and welcome you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8 border-b border-accent/20 pb-4 tracking-widest uppercase text-sm text-accent">Office Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300 flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-foreground/70 text-[10px] tracking-widest font-bold uppercase mb-1">CALL US</p>
                      <p className="text-foreground text-lg font-heading font-bold">+92 345 1574784</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300 flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-foreground/70 text-[10px] tracking-widest font-bold uppercase mb-1">EMAIL US</p>
                      <p className="text-foreground text-lg font-heading font-bold">Schoolsmart84@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 sm:p-8 md:p-12 shadow-2xl gold-border relative">
                <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-10 pointer-events-none" />
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8 border-b border-accent/20 pb-4 uppercase tracking-widest text-sm text-accent">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="font-heading font-bold text-[10px] tracking-widest uppercase text-foreground/70">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" className="rounded-none border-accent/20 h-14" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-heading font-bold text-[10px] tracking-widest uppercase text-foreground/70">Email Address</Label>
                      <Input id="email" type="email" placeholder="example@mail.com" className="rounded-none border-accent/20 h-14" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-heading font-bold text-[10px] tracking-widest uppercase text-foreground/70">Phone Number</Label>
                      <Input id="phone" placeholder="+92 300 1234567" className="rounded-none border-accent/20 h-14" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-heading font-bold text-[10px] tracking-widest uppercase text-foreground/70">Subject</Label>
                      <Input id="subject" placeholder="General Inquiry" className="rounded-none border-accent/20 h-14" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-heading font-bold text-[10px] tracking-widest uppercase text-foreground/70">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="rounded-none border-accent/20 min-h-[200px]" />
                  </div>

                  <div className="pt-4">
                    <Button className="w-full h-16 bg-accent text-foreground font-bold text-lg rounded-none gold-gradient shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                      SEND MESSAGE
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="h-[360px] sm:h-[420px] md:h-[500px] w-full bg-primary/10 relative overflow-hidden">
        <iframe
          title="Beleybaba Alpurai, Dist Shangla"
          src="https://www.google.com/maps?q=Beleybaba%20Alpurai%2C%20District%20Shangla&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </Layout>
  );
}



