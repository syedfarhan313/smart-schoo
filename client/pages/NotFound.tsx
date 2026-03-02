import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-40 bg-background relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 sm:px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent font-heading tracking-[0.2em] text-sm uppercase font-bold">ERROR 404</span>
            <div className="w-12 h-[1px] bg-accent" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-foreground mb-8">
            Page Not <br />
            <span className="text-accent italic font-medium">Found</span>
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-12 font-body">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link to="/">
            <Button className="h-16 px-12 bg-primary text-accent hover:bg-primary/90 font-bold text-lg rounded-none border border-accent/30 shadow-2xl transition-all duration-300">
              RETURN TO HOME
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};

export default NotFound;



