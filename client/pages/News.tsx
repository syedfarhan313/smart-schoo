import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, Tag, Share2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "Annual Sports Day Celebration 2024",
    excerpt: "A day filled with energy, sportsmanship, and incredible achievements by our students.",
    date: "MAR 12, 2024",
    author: "ADMINISTRATION",
    category: "EVENT",
    img: "https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Outstanding Matriculation Results 2024",
    excerpt: "The Smart School & Girls College achieves 100% result in Board examinations with top positions.",
    date: "FEB 28, 2024",
    author: "ACADEMICS",
    category: "ACADEMICS",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Islamic Art & Culture Exhibition",
    excerpt: "Exploring the rich heritage of Islamic calligraphy and art through our students' creativity.",
    date: "JAN 15, 2024",
    author: "ARTS DEP",
    category: "EXHIBITION",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Science & Robotics Fair",
    excerpt: "Innovating the future! Our girls showcase their robotics and tech projects at the annual fair.",
    date: "DEC 20, 2023",
    author: "SCIENCE DEP",
    category: "TECHNOLOGY",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function News() {
  return (
    <Layout>
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">STAY UPDATED</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">News & <br /><span className="text-accent italic font-medium">Events</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">Latest stories and announcements from our institution.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2 space-y-16">
              {posts.map((post, i) => (
                <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                  <div className="relative aspect-[16/9] overflow-hidden gold-border mb-8 shadow-2xl">
                    <img src={post.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" alt={post.title} />
                    <div className="absolute top-6 left-6 z-20 bg-accent px-4 py-2 text-[10px] tracking-widest font-bold text-foreground font-heading shadow-xl">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-4 text-accent text-[10px] tracking-[0.2em] font-bold font-heading">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</div>
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</div>
                  </div>
                  
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-accent transition-colors leading-tight">{post.title}</h2>
                  <p className="text-foreground/70 text-lg leading-relaxed mb-8">{post.excerpt}</p>
                  
                  <Button variant="link" className="p-0 h-auto text-foreground font-heading font-bold tracking-widest hover:text-accent transition-colors group/link">
                    READ FULL ARTICLE <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                  </Button>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              <div className="bg-card p-6 sm:p-8 md:p-10 shadow-xl gold-border">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest text-sm text-accent">Search</h3>
                <div className="relative">
                  <Input placeholder="Search news..." className="rounded-none border-accent/20 pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-accent w-4 h-4" />
                </div>
              </div>

              <div className="bg-card p-6 sm:p-8 md:p-10 shadow-xl gold-border">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest text-sm text-accent">Categories</h3>
                <div className="flex flex-col gap-4">
                  {["Academics", "Events", "Sports", "Arts", "Announcements"].map((cat) => (
                    <div key={cat} className="flex justify-between items-center group cursor-pointer border-b border-accent/10 pb-2">
                      <span className="text-foreground font-heading font-medium group-hover:text-accent transition-colors">{cat}</span>
                      <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 font-bold">12</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary p-6 sm:p-8 md:p-10 text-white shadow-xl islamic-pattern relative">
                <div className="absolute inset-0 bg-primary/80 z-0" />
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold text-accent mb-6 uppercase tracking-widest text-sm">Newsletter</h3>
                  <p className="text-white/60 text-sm mb-6">Stay updated with our latest announcements and monthly educational stories.</p>
                  <Input placeholder="Email Address" className="rounded-none border-white/20 bg-white/10 text-white placeholder:text-white/40 mb-4" />
                  <Button className="w-full bg-accent text-foreground font-bold rounded-none gold-gradient transition-all shadow-xl">SUBSCRIBE</Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}



