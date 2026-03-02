import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PortalStrip = () => {
  return (
    <section className="py-10 bg-card border-y border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4">
        <Link to="/student-portal" className="w-full md:w-auto">
          <Button className="w-full h-12 px-8 bg-primary text-white font-bold rounded-none border border-accent/30 shadow-lg">
            STUDENT PORTAL
          </Button>
        </Link>
        <Link to="/teacher-portal" className="w-full md:w-auto">
          <Button className="w-full h-12 px-8 bg-card text-foreground font-bold rounded-none border border-accent/30 shadow-lg">
            TEACHER PORTAL
          </Button>
        </Link>
        <Link to="/results" className="w-full md:w-auto">
          <Button className="w-full h-12 px-8 bg-accent text-foreground font-bold rounded-none shadow-lg">
            RESULTS
          </Button>
        </Link>
      </div>
    </section>
  );
};

