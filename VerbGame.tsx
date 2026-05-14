import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSPORT_DATA } from './verbData';
import { Heart, Trophy, RefreshCw, Play, Volume2, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';

// A simple 3D Background with trees or just green elements
function ForestBackground() {
  return (
    <>
      <color attach="background" args={["#064e3b"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-5, 0, -2]}>
          <coneGeometry args={[2, 5, 8]} />
          <meshStandardMaterial color="#065f46" />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[5, -1, -3]}>
          <coneGeometry args={[1.5, 4, 8]} />
          <meshStandardMaterial color="#065f46" />
        </mesh>
      </Float>
      <Sparkles count={50} scale={10} size={2} speed={0.5} opacity={0.2} color="#fbbf24" />
      <ContactShadows opacity={0.4} scale={20} blur={24} far={10} color="#000000" />
    </>
  );
}

const FALL_DURATION = 8; // Seconds it takes for a word to fall

export default function VerbGame() {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameover' | 'finished'>('lobby');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [fallingProgress, setFallingProgress] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong', text: string } | null>(null);
  
  // Game session words
  const sessionWords = useMemo(() => {
    return [...TRANSPORT_DATA].sort(() => Math.random() - 0.5).slice(0, 30);
  }, [gameState === 'lobby']);

  const currentChallenge = sessionWords[currentIdx];

  const options = useMemo(() => {
    if (!currentChallenge) return [];
    const correct = currentChallenge.es;
    const others = TRANSPORT_DATA
      .filter(t => t.es !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(t => t.es);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }, [currentChallenge]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    setFallingProgress(0);
    if (currentIdx < sessionWords.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setGameState('finished');
    }
  }, [currentIdx, sessionWords.length]);

  const onTimeout = useCallback(() => {
    if (gameState !== 'playing' || feedback) return;
    setLives(prev => {
      const next = prev - 1;
      if (next <= 0) setGameState('gameover');
      return next;
    });
    setFeedback({ type: 'wrong', text: `Ժամանակն սպառվեց! Ճիշտ էր՝ ${currentChallenge.es}` });
    setTimeout(handleNext, 2000);
  }, [gameState, feedback, currentChallenge, handleNext]);

  // Falling animation progress
  useEffect(() => {
    let frame: number;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / FALL_DURATION, 1);
      
      setFallingProgress(progress);

      if (progress < 1) {
        if (gameState === 'playing' && !feedback) {
          frame = requestAnimationFrame(animate);
        }
      } else {
        onTimeout();
      }
    };

    if (gameState === 'playing' && !feedback) {
      frame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frame);
  }, [gameState, feedback, onTimeout]);

  const handleAnswer = (answer: string) => {
    if (feedback || gameState !== 'playing') return;

    if (answer === currentChallenge.es) {
      setScore(prev => prev + 100);
      setFeedback({ type: 'correct', text: 'Ճիշտ է!' });
      setTimeout(handleNext, 1000);
    } else {
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) setGameState('gameover');
        return next;
      });
      setFeedback({ type: 'wrong', text: `Սխալ է! Ճիշտ էր՝ ${currentChallenge.es}` });
      setTimeout(handleNext, 2000);
    }
  };

  if (gameState === 'lobby') {
    return (
      <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden flex items-center justify-center p-6 text-center">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ForestBackground />
          </Canvas>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/10 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/20 shadow-2xl max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-amber-400 rounded-full mx-auto flex items-center justify-center text-white shadow-xl mb-6">
            <Volume2 size={48} />
          </div>
          <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
            Savannah <br/><span className="text-amber-400">Challenge</span>
          </h2>
          <p className="text-white/60 font-medium mb-8">Գուշակիր իսպաներեն թարգմանությունը նախքան բառը կհասնի գետնին:</p>
          <button 
            onClick={() => {
              setLives(5);
              setScore(0);
              setCurrentIdx(0);
              setGameState('playing');
              setFeedback(null);
              setFallingProgress(0);
            }}
            className="w-full py-5 bg-white text-emerald-900 rounded-2xl font-black uppercase italic tracking-widest text-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Play fill="currentColor" /> Սկսել
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'gameover' || gameState === 'finished') {
    return (
      <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden flex items-center justify-center p-6 text-center">
        <div className="absolute inset-0 z-0">
          <Canvas><ForestBackground /></Canvas>
        </div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 bg-white/95 p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full border border-white"
        >
          {gameState === 'finished' ? (
            <Trophy className="mx-auto text-amber-500 w-24 h-24 mb-6" />
          ) : (
            <AlertCircle className="mx-auto text-rose-500 w-24 h-24 mb-6" />
          )}
          <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-2">
            {gameState === 'finished' ? 'Փայլուն աշխատանք!' : 'Խաղն ավարտվեց'}
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">
            Քո արդյունքը՝ <span className="text-emerald-600">{score} միավոր</span>
          </p>
          
          <button 
            onClick={() => setGameState('lobby')}
            className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase italic tracking-widest text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <RefreshCw /> Նորից
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-[650px] sm:h-[750px] w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl">
      {/* Background 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ForestBackground />
        </Canvas>
      </div>

      {/* Top Bar */}
      <div className="absolute top-4 sm:top-8 inset-x-4 sm:inset-x-8 z-20 flex justify-between items-center bg-black/20 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart key={i} fill={i < lives ? "#ef4444" : "none"} color={i < lives ? "#ef4444" : "#ffffff40"} size={16} className="sm:w-5 sm:h-5" />
            ))}
          </div>
          <div className="h-4 sm:h-6 w-px bg-white/20" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[8px] sm:text-[10px] font-black text-white/50 uppercase tracking-widest">Score</span>
            <span className="text-base sm:text-xl font-black text-white tabular-nums">{score}</span>
          </div>
        </div>
        <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-[10px] sm:text-xs font-black text-white italic tracking-widest">{currentIdx + 1} / 30</span>
        </div>
      </div>

      {/* Falling Word Area */}
      <div className="absolute inset-0 z-10 pt-24 sm:pt-32 pb-40 sm:pb-48 flex justify-center overflow-hidden">
        <motion.div
           style={{ top: `${fallingProgress * 60 + 15}%` }}
           className="absolute px-6 sm:px-10 py-3 sm:py-5 bg-white/95 rounded-2xl sm:rounded-[2rem] shadow-2xl border-2 border-white flex flex-col items-center gap-1"
        >
           <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Թարգմանիր</span>
           <span className="text-2xl sm:text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
             {currentChallenge.hy}
           </span>
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 bg-amber-400 rounded-full" />
        </motion.div>
      </div>

      {/* Options Bar - Grid on mobile, horizontal on desktop */}
      <div className="absolute bottom-4 sm:bottom-10 inset-x-2 sm:inset-x-8 z-20 grid grid-cols-2 sm:flex sm:flex-nowrap justify-center gap-2 sm:gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={!!feedback}
            className="group relative flex items-center gap-2 bg-white/95 backdrop-blur hover:bg-white px-3 sm:px-6 py-3 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl border-b-4 border-slate-200 hover:border-emerald-500 hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="text-[9px] sm:text-sm font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-500 shrink-0">{i + 1}</span>
            <span className="text-[10px] sm:text-xl font-black text-slate-900 italic uppercase tracking-tight leading-tight text-left">
              {opt}
            </span>
          </button>
        ))}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm ${feedback.type === 'correct' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
          >
            <div className={`p-10 rounded-[3rem] shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4 bg-white border-2 ${feedback.type === 'correct' ? 'border-emerald-500' : 'border-rose-500'}`}>
               <div className={`w-20 h-20 rounded-full flex items-center justify-center ${feedback.type === 'correct' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {feedback.type === 'correct' ? <CheckCircle2 size={40} /> : <AlertCircle size={40} />}
               </div>
               <p className={`text-2xl font-black italic uppercase tracking-tighter ${feedback.type === 'correct' ? 'text-emerald-600' : 'text-rose-600'}`}>
                 {feedback.text}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
