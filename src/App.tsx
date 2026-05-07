/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star, Calendar, Flower2, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showMiddlePopup, setShowMiddlePopup] = useState(false);
  const [thankYouClicked, setThankYouClicked] = useState(false);
  const [responseType, setResponseType] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    const middlePopupTimer = setTimeout(() => setShowMiddlePopup(true), 4000); 
    const popupTimer = setTimeout(() => setShowPopup(true), 25000); 
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(middlePopupTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleResponse = (response: 'yes' | 'no') => {
    setResponseType(response);
    setTimeout(() => setShowPopup(false), 4000);
  };

  // Optimized: Reduced count to 16 for better performance
  const decorativeElements = [...Array(16)].map((_, i) => ({
    id: i,
    delay: Math.random() * 20,
    duration: 25 + Math.random() * 20, // Slower is smoother
    size: 8 + Math.random() * 24,
    left: Math.random() * 100,
    type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'flower' : i % 4 === 2 ? 'petal' : 'star',
    rotation: Math.random() * 360,
    wind: (Math.random() - 0.5) * 200
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex items-center justify-center p-4">
      {/* Background Atmospheric Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-10%] w-[80%] h-[80%] rounded-full bg-rose-50/60 blur-[80px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] left-[-10%] w-[80%] h-[80%] rounded-full bg-amber-50/60 blur-[80px]" 
        />
      </div>

      {/* Blowing Elements with More Variety */}
      <AnimatePresence>
        {decorativeElements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ y: -60, opacity: 0, x: el.left + '%' }}
            animate={{
              y: '110vh',
              opacity: [0, 0.8, 0.8, 0.6, 0],
              x: `calc(${el.left}% + ${el.wind}px)`,
              rotate: el.rotation + 1080
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear"
            }}
            className="absolute z-10 text-rose-200/40 select-none pointer-events-none will-change-transform"
          >
            {el.type === 'heart' ? (
              <Heart size={el.size} fill="currentColor" className="text-rose-300/30" />
            ) : el.type === 'flower' ? (
              <Flower2 size={el.size} strokeWidth={1} />
            ) : el.type === 'petal' ? (
              <motion.div 
                style={{ width: el.size, height: el.size * 0.7 }} 
                className="bg-rose-100/40 rounded-[20%_80%_20%_80%]" 
              />
            ) : (
              <Sparkles size={el.size} strokeWidth={1} className="text-amber-300/40" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Middle Birthday Message Popup - Refined */}
      <AnimatePresence>
        {showMiddlePopup && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#1a0101]/20 backdrop-blur-sm">
            {/* Ambient Floating Elements for Popup - Optimized */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`popup-el-${i}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0 
                }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1, 0.8],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 180
                }}
                transition={{ 
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute text-rose-200/30 pointer-events-none will-change-transform"
              >
                {i % 2 === 0 ? <Leaf size={24} /> : <Flower2 size={24} />}
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-rose-100/30 text-center relative max-w-sm w-full mx-auto overflow-hidden will-change-transform"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500" />
              
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ 
                    rotate: [0, 8, -8, 8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="text-rose-500 p-4 rounded-full bg-rose-50/50"
                >
                  <Flower2 size={56} strokeWidth={1} />
                </motion.div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif italic text-rose-900 mb-8 leading-tight font-light">
                Happy birthday my beautiful Wife
              </h3>

              <button
                onClick={() => {
                  setThankYouClicked(true);
                  setTimeout(() => setShowMiddlePopup(false), 2500);
                }}
                className={`w-full py-5 rounded-2xl font-bold tracking-wider uppercase text-sm transition-all duration-700 relative overflow-hidden group ${
                  thankYouClicked 
                    ? 'bg-rose-50 text-rose-600' 
                    : 'bg-rose-600 text-white shadow-2xl shadow-rose-200 hover:bg-rose-700'
                }`}
              >
                {!thankYouClicked && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                )}
                <div className="flex items-center justify-center gap-3">
                  <AnimatePresence mode="wait">
                    {!thankYouClicked ? (
                      <motion.span
                        key="thankyou"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Accept with Love <Heart size={16} fill="white" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="pleasure"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 italic tracking-widest"
                      >
                        My Pleasure <Sparkles size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Luxury Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative z-20 w-full max-w-2xl rounded-[3rem] p-10 md:p-16 text-center border-white/40 overflow-hidden"
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-rose-100 rounded-tl-[3rem] m-4 opacity-50" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-rose-100 rounded-br-[3rem] m-4 opacity-50" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          className="relative z-10"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-6 mb-10">
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-rose-200" />
            <div className="flex gap-4 text-rose-400">
               <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Heart fill="rgba(244, 63, 94, 0.1)" size={24} />
              </motion.div>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
                <Sparkles size={24} />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}>
                <Heart fill="rgba(244, 63, 94, 0.1)" size={24} />
              </motion.div>
            </div>
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-rose-200" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="font-serif italic text-rose-400/80 text-sm tracking-[0.3em] uppercase mb-4"
          >
            A Message from My Heart
          </motion.h2>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-elegant-gradient mb-6 font-bengali tracking-tight"
          >
            শুভ জন্মদিন জিনু!
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2 bg-rose-50/50 text-rose-500 rounded-full text-sm font-medium border border-rose-100/50 mb-12"
          >
            <Calendar size={15} />
            <span className="tracking-wide">৮ই মে, ২০২৬</span>
          </motion.div>

          {/* Message Content */}
          <div className="space-y-8 text-gray-700 text-lg md:text-xl leading-[1.8] font-bengali text-center max-w-xl mx-auto">
            <motion.div variants={itemVariants} className="relative py-4">
              <p className="italic text-rose-800/90 font-medium text-xl md:text-2xl">
                আমার <span className="text-rose-600 font-bold decoration-rose-200/50 underline underline-offset-8">প্রিয়তমা স্ত্রী</span> জিনু এবং আমাদের কলিজার টুকরো <span className="text-rose-500 font-bold decoration-rose-200/50 underline underline-offset-8">আরিবার আম্মু</span>
              </p>
            </motion.div>

            <motion.p variants={itemVariants}>
              আজকের এই বিশেষ দিনে তোমার জন্য আমার মনে যে ভালোবাসা আর কৃতজ্ঞতা জমেছে, তা ভাষায় প্রকাশ করা সত্যিই কঠিন। আমার জীবনের সবচেয়ে মূল্যবান এবং সুন্দর উপহার হচ্ছ তুমি। আল্লাহ তাআলার কাছে আমি চিরঋণী যে তিনি তোমাকে আমার জীবনসঙ্গিনী হিসেবে পছন্দ করেছেন। 
            </motion.p>

            <motion.p variants={itemVariants}>
              আমাদের সংসারকে তুমি যেভাবে ভালোবাসা, মমতা আর ধৈর্য দিয়ে গুছিয়ে রেখেছো, তার কোনো তুলনা হয় না। একজন অসাধারণ স্ত্রী এবং একজন মমতাময়ী মা হিসেবে তুমি আমাদের জীবনকে ধন্য করেছো। আমি সারাটা জীবন তোমাকে এভাবেই আমার পাশে, আমার হৃদয়ের খুব কাছে দেখতে চাই। 
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="py-10 px-8 rounded-3xl bg-gradient-to-br from-rose-50/40 to-amber-50/40 border border-white shadow-sm relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-rose-100/40">
                <Heart size={120} fill="currentColor" />
              </div>
              <p className="font-semibold text-rose-900/90 relative z-10">
                আল্লাহর কাছে আমার আন্তরিক দোয়া, তিনি যেন তোমাকে সবসময় ঈমানের সাথে সুস্থ এবং পরম শান্তিতে রাখেন। আল্লাহ তোমার শরীর ও মন ভালো রাখুক। আমাদের এই মধুর সম্পর্ককে দুনিয়া এবং আখিরাতে চিরস্থায়ী করুক। আমিন। 🤲
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8">
              <p className="text-3xl md:text-4xl font-bold text-rose-600 leading-tight mb-8">
                তোমাকে জানাই জন্মদিনের অনেক অনেক শুভ কামনা! 🌸🎂
              </p>
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl md:text-3xl text-amber-600 font-bold">
                  আমি তোমাকে অনেক অনেক ভালোবাসি। ❤️
                </p>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                    >
                      <Heart size={16} fill="#be123c" fillOpacity={0.6 + (i * 0.2)} className="text-rose-600" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Signature */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-6" />
            <p className="font-serif italic text-rose-300 text-sm mb-2 tracking-[0.4em] uppercase">Infinity & Beyond</p>
            <p className="font-bold text-rose-600 tracking-widest uppercase text-xs">তোমার স্বামী</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Surprise Feedback Popup - Refined */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-6 right-6 md:left-auto md:right-10 z-[70] md:w-80"
          >
            <div className="bg-white/90 backdrop-blur-2xl border border-rose-100 shadow-[0_20px_50px_-12px_rgba(190,18,60,0.1)] rounded-[2rem] p-7 relative overflow-hidden">
              {!responseType ? (
                <div className="relative z-10">
                  <p className="text-rose-950 font-bengali font-bold text-lg mb-5 text-center leading-relaxed">
                    তোমার কি আমাদের ছোট্ট এই সারপ্রাইজ পছন্দ হয়েছে?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleResponse('yes')}
                      className="py-3 px-4 bg-rose-600 text-white rounded-xl font-bengali font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all"
                    >
                      হ্যা
                    </button>
                    <button
                      onClick={() => handleResponse('no')}
                      className="py-3 px-4 bg-white border border-rose-100 text-rose-400 rounded-xl font-bengali font-bold transition-all hover:bg-rose-50"
                    >
                      না
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10 py-6 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-rose-500 mb-3 block"
                  >
                    <Heart fill="currentColor" size={32} className="mx-auto" />
                  </motion.div>
                  <p className="text-rose-600 font-bengali font-bold text-xl leading-relaxed">
                    {responseType === 'yes' ? 'তোমাকে পেয়ে আমি ধন্য! ❤️' : 'যাহ দুষ্টমি করিও না!'}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

