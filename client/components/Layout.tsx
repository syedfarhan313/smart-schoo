import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, Facebook, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <Link to="/" className={cn("flex flex-col items-center gap-1", className)}>
    <div className="relative">
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-accent flex items-center justify-center bg-primary overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
        <img
          src="/logo.jpeg"
          alt="The Smart School & Girls College logo"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-foreground font-heading font-bold text-lg leading-tight">THE SMART SCHOOL</h1>
      <p className="text-accent font-heading text-[10px] tracking-[0.2em] font-medium">&amp; GIRLS COLLEGE</p>
    </div>
  </Link>
);

const NavLink = ({ to, children, mobile }: { to: string; children: React.ReactNode; mobile?: boolean }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "relative px-2 lg:px-3 py-2 text-[10px] lg:text-[11px] font-semibold tracking-[0.18em] lg:tracking-widest uppercase transition-all rounded-full whitespace-nowrap",
        isActive
          ? "text-foreground bg-accent/20"
          : "text-foreground/70 hover:text-foreground hover:bg-accent/15",
        mobile && "text-base py-4 border-b border-accent/10 w-full rounded-none tracking-[0.2em]"
      )}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Programs", to: "/programs" },
    { label: "Admissions", to: "/admissions" },
    { label: "Facilities", to: "/facilities" },
    { label: "Gallery", to: "/gallery" },
    { label: "Results", to: "/results" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 lg:px-10",
        "py-3 bg-card/90 backdrop-blur-md border-b border-accent/20 shadow-lg",
        isScrolled || !isHome ? "shadow-lg" : "shadow-md"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between lg:justify-center flex-nowrap min-w-0">
        {/* Desktop Nav - Left */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-end mr-6 flex-nowrap whitespace-nowrap">
          {navItems.slice(0, 4).map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logo - Center */}
        <Logo className="mx-auto lg:mx-0" />

        {/* Desktop Nav - Right */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-start ml-6 flex-nowrap whitespace-nowrap">
          {navItems.slice(4).map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/student-portal">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none px-4 py-3 border border-accent/30 shadow-lg whitespace-nowrap text-[10px] lg:text-[11px]">
              STUDENT PORTAL
            </Button>
          </Link>
          <Link to="/teacher-portal">
            <Button className="bg-card hover:bg-accent/10 text-foreground font-bold rounded-none px-4 py-3 border border-accent/30 shadow-lg whitespace-nowrap text-[10px] lg:text-[11px]">
              TEACHER PORTAL
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-accent">
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-0 border-l-accent/20">
              <div className="flex flex-col h-full islamic-pattern">
                <div className="p-8 border-b border-accent/20 flex justify-center">
                  <Logo />
                </div>
                <nav className="flex flex-col p-8 overflow-y-auto">
                  {navItems.map((item) => (
                    <NavLink key={item.to} to={item.to} mobile>
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="mt-8 space-y-4">
                    <Link to="/student-portal">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-none py-6 border-2 border-accent/30 shadow-lg">
                        STUDENT PORTAL
                      </Button>
                    </Link>
                    <Link to="/teacher-portal">
                      <Button className="w-full bg-card hover:bg-accent/10 text-foreground font-bold rounded-none py-6 border-2 border-accent/30 shadow-lg">
                        TEACHER PORTAL
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Info */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center bg-white/10 overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.jpeg"
                  alt="The Smart School & Girls College logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h1 className="text-white font-heading font-bold text-lg leading-tight">THE SMART SCHOOL</h1>
                <p className="text-accent font-heading text-[10px] tracking-[0.2em] font-medium">& GIRLS COLLEGE</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Empowering excellence in girls' education through a perfect blend of modern academic standards and Islamic values.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1Kq4ZVUdzp/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-8 border-b border-accent/20 pb-2 inline-block">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {["About Institution", "Academic Programs", "Campus Facilities", "Fee Structure", "Admissions", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/70 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-8 border-b border-accent/20 pb-2 inline-block">Our Programs</h3>
            <ul className="flex flex-col gap-4">
              {["Pre-School (Montessori)", "Primary School", "Middle School", "Matriculation (SSC)", "Girls College (HSSC)"].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/70 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-8 border-b border-accent/20 pb-2 inline-block">Contact Info</h3>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">Location</p>
                  <p className="text-white/60 text-xs">Baila Baba, Shangla, Pakistan</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">Call Us</p>
                  <p className="text-white/60 text-xs">+92 345 1574784</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">Email Us</p>
                  <p className="text-white/60 text-xs">Schoolsmart84@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs tracking-wider">
            © {new Date().getFullYear()} THE SMART SCHOOL & GIRLS COLLEGE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link to="#" className="text-white/40 text-xs hover:text-accent transition-colors">PRIVACY POLICY</Link>
            <Link to="#" className="text-white/40 text-xs hover:text-accent transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const whatsappMessage = encodeURIComponent("Hello! I am contacting you via the website.");

  return (
    <div className="min-h-screen flex flex-col islamic-pattern overflow-x-hidden">
      <Header />
      <main className={cn("flex-grow", isHome ? "pt-[116px] lg:pt-0" : "pt-[116px] lg:pt-24")}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <a
        href={`https://wa.me/923451574784?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebc5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};



