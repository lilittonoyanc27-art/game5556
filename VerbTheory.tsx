import React from 'react';
import { motion } from 'motion/react';
import { TRANSPORT_DATA } from './verbData';
import { Car, Bike, Train, Plane, Ship, Footprints, ArrowRight } from 'lucide-react';

const icons: Record<string, any> = {
  "el coche": Car,
  "la bicicleta": Bike,
  "el tren": Train,
  "el avión": Plane,
  "el barco": Ship,
  "a pie": Footprints
};

export default function VerbTheory() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <section className="space-y-8">
        <div className="border-l-8 border-indigo-600 pl-6 space-y-2">
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
            Los Medios <br/>
            <span className="text-indigo-600 font-black">de Transporte</span>
          </h2>
          <p className="text-slate-400 font-bold italic uppercase tracking-widest text-sm">Տրանսպորտի տեսակներ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {TRANSPORT_DATA.map((item, idx) => {
             const Icon = icons[item.es] || Car;
             return (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-all group"
               >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                     <Icon size={28} />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xl font-black italic text-slate-900 uppercase tracking-tight">{item.es}</p>
                     <p className="text-slate-400 font-bold italic text-sm">{item.hy}</p>
                  </div>
               </motion.div>
             );
           })}
        </div>
      </section>

      <section className="bg-indigo-600 rounded-[3rem] p-10 sm:p-16 text-white space-y-8">
         <h3 className="text-3xl font-black italic uppercase tracking-tighter text-center">Ինչպես ասել</h3>
         <div className="grid gap-4 max-w-xl mx-auto">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
               <p className="text-sm font-black uppercase tracking-widest opacity-60 mb-2">Գնալ ինչ-որ բանով</p>
               <p className="text-2xl font-black italic">Ir en + տրանսպորտ</p>
               <p className="text-white/60 font-bold italic mt-2 text-sm">Ir en coche, Ir en autobús...</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
               <p className="text-sm font-black uppercase tracking-widest opacity-60 mb-2">Բացառություն</p>
               <p className="text-2xl font-black italic">Ir a pie / Ir andando</p>
               <p className="text-white/60 font-bold italic mt-2 text-sm">Ոտքով գնալիս "en" չենք օգտագործում</p>
            </div>
         </div>
      </section>
    </div>
  );
}
