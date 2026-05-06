/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star, Calendar, Flower2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [responseType, setResponseType] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    const popupTimer = setTimeout(() => setShowPopup(true), 20000); // 20 seconds
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleResponse = (response: 'yes' | 'no') => {
    setResponseType(response);
    setTimeout(() => setShowPopup(false), 3000); // Slightly longer to read the msg
  };

  // Generate more varied decorative elements for the "blowing" effect
  const decorativeElements = [...Array(24)].map((_, i) => ({
    id: i,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 20,
    size: 10 + Math.random() * 25,
    left: Math.random() * 100,
    type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'flower' : 'star',
    rotation: Math.random() * 360,
    wind: (Math.random() - 0.5) * 200 // horizontal drift
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff5f5] flex items-center justify-center p-4">
      {/* Background Atmospheric Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-full h-full md:w-[50%] md:h-[50%] rounded-full bg-rose-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-full h-full md:w-[50%] md:h-[50%] rounded-full bg-orange-100/50 blur-[100px]" />
      </div>

      {/* Blowing Flowers/Petals Effect */}
      <AnimatePresence>
        {decorativeElements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ y: -50, opacity: 0, x: el.left + '%' }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0.8, 0],
              x: `calc(${el.left}% + ${el.wind}px)`,
              rotate: el.rotation + 720
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear"
            }}
            className="absolute z-10 text-rose-300/30 select-none pointer-events-none"
          >
            {el.type === 'heart' ? (
              <Heart size={el.size} fill="currentColor" />
            ) : el.type === 'flower' ? (
              <Flower2 size={el.size} />
            ) : (
              <Sparkles size={el.size} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={showContent ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] p-8 md:p-12 text-center"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-4 mb-6 text-rose-500">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Heart fill="currentColor" size={28} />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
              <Sparkles size={28} />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
              <Heart fill="currentColor" size={28} />
            </motion.div>
          </div>
          
          <h2 className="font-serif italic text-rose-600 text-sm md:text-base tracking-[0.2em] uppercase mb-3 opacity-80">
            To My Dearest Wife
          </h2>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-4 font-bengali">
            শুভ জন্মদিন জিনু!
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-500 rounded-full text-sm font-medium border border-rose-100">
            <Calendar size={14} />
            <span>৮ই মে, ২০২৬</span>
          </div>
        </motion.div>

        {/* Message Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed font-bengali text-justify max-w-prose mx-auto"
        >
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 to-orange-300 rounded-full opacity-60" />
            <p className="pl-4 italic text-rose-800 font-medium">
              আমার <span className="text-rose-600 font-bold underline decoration-rose-200 underline-offset-4">প্রিয়তমা স্ত্রী</span> জিনু এবং আমাদের কলিজার টুকরো <span className="text-rose-500 font-bold underline decoration-rose-200 underline-offset-4">আরিবার আম্মু</span>,
            </p>
          </div>

          <p>
            আজকের এই বিশেষ দিনে তোমার জন্য আমার মনে যে ভালোবাসা আর কৃতজ্ঞতা জমেছে, তা ভাষায় প্রকাশ করা সত্যিই কঠিন। আমার জীবনের সবচেয়ে মূল্যবান এবং সুন্দর উপহার হচ্ছে তুমি। আল্লাহ তাআলার কাছে আমি চিরঋণী যে তিনি তোমাকে আমার জীবনসঙ্গিনী হিসেবে পছন্দ করেছেন। 
          </p>

          <p>
            আমাদের সংসারকে তুমি যেভাবে ভালোবাসা, মমতা আর ধৈর্য দিয়ে গুছিয়ে রেখেছো, তার কোনো তুলনা হয় না। একজন অসাধারণ স্ত্রী এবং একজন মমতাময়ী মা হিসেবে তুমি আমাদের জীবনকে ধন্য করেছো। আমি সারাটা জীবন তোমাকে এভাবেই আমার পাশে, আমার হৃদয়ের খুব কাছে দেখতে চাই। তোমার হাসিখুশি মুখটাই আমার জীবনের সব সুখের উৎস।
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/80 to-orange-50/80 border border-white">
            <p className="font-medium text-rose-900 flex flex-col items-center gap-3">
              <Star className="text-orange-400" fill="currentColor" size={24} />
              আল্লাহর কাছে আমার আন্তরিক দোয়া, তিনি যেন তোমাকে সবসময় ঈমানের সাথে সুস্থ এবং পরম শান্তিতে রাখেন। আল্লাহ তোমার শরীর ও মন ভালো রাখুক। আমাদের এই মধুর সম্পর্ককে দুনিয়া এবং আখিরাতে চিরস্থায়ী করুক। আমিন। 🤲
            </p>
          </div>

          <div className="pt-6">
            <p className="text-2xl md:text-3xl font-bold text-rose-600 leading-tight">
              তোমাকে জানাই জন্মদিনের অনেক অনেক শুভ কামনা! 🌸🎂
            </p>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-xl md:text-2xl mt-6 text-orange-600 font-bold flex items-center justify-center gap-2"
            >
              আমি তোমাকে অনেক অনেক ভালোবাসি। ❤️
            </motion.div>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 md:mt-14 flex flex-col items-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-4" />
          <p className="font-serif italic text-rose-400 text-sm mb-1 tracking-widest">Forever Yours,</p>
          <p className="font-bold text-rose-600 tracking-widest uppercase text-xs">তোমার স্বামী</p>
        </motion.div>
      </motion.div>

      {/* Surprise Feedback Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 left-4 right-4 md:left-auto md:right-8 z-50 md:w-80"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-rose-100 shadow-2xl rounded-3xl p-6 relative overflow-hidden">
              {/* Decorative background for popup */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-rose-50/50">
                <Heart size={80} fill="currentColor" />
              </div>

              {!responseType ? (
                <div className="relative z-10">
                  <p className="text-rose-900 font-bengali font-bold text-lg mb-4 text-center">
                    তোমার কি সারপ্রাইজ পছন্দ হয়েছে?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleResponse('yes')}
                      className="py-2.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-bengali font-bold shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-transform"
                    >
                      হ্যা
                    </button>
                    <button
                      onClick={() => handleResponse('no')}
                      className="py-2.5 px-4 bg-white border-2 border-rose-100 text-rose-400 rounded-2xl font-bengali font-bold hover:bg-rose-50 transition-colors"
                    >
                      না
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 py-4 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block text-rose-500 mb-2"
                  >
                    <Heart fill="currentColor" size={32} />
                  </motion.div>
                  <p className="text-rose-600 font-bengali font-bold text-xl">
                    {responseType === 'yes' ? 'তোমাকে পেয়ে আমি ধন্য! ❤️' : 'যাহ দুষ্টমি করিও না'}
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

