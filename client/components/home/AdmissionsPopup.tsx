import React from "react";
import { X } from "lucide-react";

export const AdmissionsPopup = () => {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[520px] overflow-hidden rounded-none bg-card shadow-2xl border border-accent/20"
      >
        <button
          type="button"
          aria-label="Close popup"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md transition hover:bg-accent hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src="/WhatsApp%20Image%202026-02-20%20at%2011.19.48%20PM.jpeg"
          alt="Admissions notice"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};


