import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Info, 
  ChevronRight, 
  BookOpen,
  Layers,
  Trophy,
  Navigation
} from 'lucide-react';
import VerbTheory from './VerbTheory';
import VerbGame from './VerbGame';

export type AppScreen = 'menu' | 'theory' | 'game';

function NavButton({ active, icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group relative transition-all ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-all ${active ? 'bg-rose-600 text-white shadow-xl shadow-rose-100' : 'text-slate-600'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-rose-600' : 'text-slate-400'}`}>
        {label}
      </span>
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <motion.div 
            key="menu" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-40 space-y-24"
          >
            <div className="space-y-12 text-center sm:text-left">
              <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex p-4 bg-rose-500/10 rounded-3xl text-rose-600 shadow-inner border border-rose-500/20"
              >
                 <Layers className="w-12 h-12" />
              </motion.div>
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
                  Transport <br/><span className="text-rose-600">& Travel</span>
                </h1>
                <p className="text-[10px] sm:text-xl font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.4em] pt-4">
                  Spanish Academy • Los Medios de Transporte
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-32">
              {/* Theory Card */}
              <motion.button 
                whileHover={{ y: -10 }}
                onClick={() => setScreen('theory')}
                className="group bg-slate-900 p-8 sm:p-14 rounded-[4rem] shadow-2xl text-left space-y-6 relative overflow-hidden text-white"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
                <div className="w-16 h-16 bg-rose-600/20 rounded-3xl flex items-center justify-center text-rose-400 shadow-xl rotate-3 group-hover:rotate-12 transition-all">
                   <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-rose-400">Դասեր և Կանոններ</h3>
                  <p className="text-white/60 font-bold italic leading-tight text-base sm:text-lg">Իմացիր տրանսպորտի տեսակները իսպաներենով։</p>
                </div>
                <div className="flex items-center gap-2 text-rose-400 font-black uppercase text-xs tracking-widest pt-4">
                   Սովորել <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>

              {/* Game Card */}
              <motion.button 
                whileHover={{ y: -10 }}
                onClick={() => setScreen('game')}
                className="group bg-white p-8 sm:p-14 rounded-[4rem] border-2 border-slate-100 shadow-xl text-left space-y-6 relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-rose-600/20 rounded-3xl flex items-center justify-center text-rose-600 shadow-xl -rotate-3 group-hover:rotate-6 transition-all">
                   <Trophy className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900">Savannah Challenge</h3>
                  <p className="text-slate-400 font-bold italic leading-tight text-base sm:text-lg">Ընտրիր ճիշտ թարգմանությունը նախքան բառը կհասնի գետնին:</p>
                </div>
                <div className="flex items-center gap-2 text-rose-600 font-black uppercase text-xs tracking-widest pt-4">
                   Խաղալ <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {screen === 'theory' && (
          <motion.div key="theory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div className="pt-24 pb-8 text-center sm:text-left max-w-4xl mx-auto px-4 sm:px-6">
                <button 
                  onClick={() => setScreen('menu')}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-xs tracking-widest transition-colors mb-4"
                >
                   ← Վերադառնալ
                </button>
                <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">Տրանսպորտի <br/><span className="text-rose-600">Տեսակներ</span></h2>
             </div>
             <VerbTheory />
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div className="pt-24 pb-8 text-center sm:text-left max-w-4xl mx-auto px-4 sm:px-6">
                <button 
                  onClick={() => setScreen('menu')}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-xs tracking-widest transition-colors mb-4"
                >
                   ← Վերադառնալ
                </button>
                <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">3D Բառախաղ <br/><span className="text-rose-600">Մրցույթ</span></h2>
             </div>
             <VerbGame />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl border border-rose-50 shadow-2xl rounded-full px-8 py-4 flex items-center gap-10">
        <NavButton active={screen === 'menu'} icon={<Home />} onClick={() => setScreen('menu')} label="Մենյու" />
        <NavButton active={screen === 'theory'} icon={<BookOpen />} onClick={() => setScreen('theory')} label="Տեսություն" />
        <NavButton active={screen === 'game'} icon={<Trophy />} onClick={() => setScreen('game')} label="Խաղ" />
      </nav>

      <footer className="py-20 text-center pb-32">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-black uppercase text-[10px] tracking-[0.4em]">
           <Info className="w-4 h-4" /> SPANISH ACADEMY • 2026
        </div>
      </footer>
    </div>
  );
}
