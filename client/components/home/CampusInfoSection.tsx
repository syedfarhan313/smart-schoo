import React from "react";

export const CampusInfoSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our Campuses
          </h2>
          <p className="text-foreground/70 text-base md:text-lg mt-3 font-body">
            Modern education with strong values and community focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "3 Campus",
            "Girls Campus",
            "Boys Campus",
            "Basi Campus",
            "Modern Education",
            "Beleybaba Alpurai, Dist Shangla"
          ].map((item) => (
            <div
              key={item}
              className="border border-accent/20 bg-card/80 backdrop-blur-md px-4 sm:px-6 py-5 text-center font-heading font-semibold text-foreground shadow-md"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



