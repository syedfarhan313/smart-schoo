import React from "react";
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

type Photo = {
  id: number;
  category: string;
  title: string;
  img: string;
};

const photoFiles = [
  "494914995_1046600330861961_5519507507231874295_n.jpg",
  "495368776_1046117937576867_3139793369839317412_n.jpg",
  "495374392_1053059856882675_5787215443264803284_n.jpg",
  "499822957_1059007092954618_333023046234850185_n.jpg",
  "513063364_1087271010128226_6386257588309769480_n.jpg",
  "528198158_1116170323904961_5406180686041810816_n.jpg",
  "533019342_1123767366478590_8775226249524606051_n.jpg",
  "533100595_1123763726478954_3396976630509669617_n.jpg",
  "533165128_1123441669844493_7370164653527209552_n.jpg",
  "542760657_1141185654736761_4084939810593647046_n.jpg",
  "558473135_1165049409017052_6918039193539217942_n.jpg",
  "560917957_1170624805126179_7446352536680653786_n.jpg",
  "593473299_1211796561009003_4848851454985197275_n.jpg",
  "597756188_1218941640294495_5364604859173209314_n.jpg",
  "597820343_1218941763627816_3967156629348652174_n.jpg",
  "608184025_1233344115520914_1572439778223849759_n.jpg",
  "608954350_1234525845402741_5072339689257521060_n.jpg",
  "612153884_1238721248316534_751529786847275741_n.jpg",
  "612175902_1238721378316521_6868568338926667526_n.jpg",
  "612234080_1238721118316547_3009135403591281243_n.jpg"
];

const photos: Photo[] = photoFiles.map((file, index) => ({
  id: index + 1,
  category: "GALLERY",
  title: `Campus Photo ${String(index + 1).padStart(2, "0")}`,
  img: `/gallrey/${file}`
}));

export default function Gallery() {
  const [selectedImg, setSelectedImg] = React.useState<null | Photo>(null);
  const loopPhotos = React.useMemo(() => [...photos, ...photos], []);

  return (
    <Layout>
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">VISUAL JOURNEY</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">Our Photo <br /><span className="text-accent italic font-medium">Gallery</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-body">Capturing excellence in every frame.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="overflow-hidden">
            <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
              {loopPhotos.map((photo, i) => (
                <button
                  key={`${photo.id}-${i}`}
                  type="button"
                  onClick={() => setSelectedImg(photo)}
                  className="group relative h-36 w-56 md:h-44 md:w-72 overflow-hidden gold-border shadow-xl"
                  aria-label={`Open ${photo.title}`}
                >
                  <img
                    src={photo.img}
                    className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    alt={photo.title}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div key={photo.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }} className="group relative aspect-square overflow-hidden gold-border shadow-2xl cursor-pointer" onClick={() => setSelectedImg(photo)}>
                  <img src={photo.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" alt={photo.title} />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center p-6 text-center">
                    <Maximize2 className="text-accent w-10 h-10 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform" />
                    <p className="text-white font-heading font-bold tracking-widest text-xs uppercase">{photo.category}</p>
                    <h3 className="text-white font-heading font-bold text-lg mt-2">{photo.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 lg:p-24" onClick={() => setSelectedImg(null)}>
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-accent transition-colors z-[110]" onClick={() => setSelectedImg(null)}>
              <X className="w-10 h-10" />
            </button>
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.5 }} className="relative max-w-7xl w-full aspect-[16/9] overflow-hidden gold-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImg.img} className="w-full h-full object-cover" alt={selectedImg.title} />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-primary/80 to-transparent">
                <p className="text-accent font-heading font-bold tracking-[0.3em] text-[10px] uppercase mb-2">{selectedImg.category}</p>
                <h3 className="text-white text-3xl font-heading font-bold">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}


