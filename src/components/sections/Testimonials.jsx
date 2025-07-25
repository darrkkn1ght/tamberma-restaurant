import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya S.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Absolutely the best Indian food in the city! The cocktails are creative and the ambiance is stunning.',
  },
  {
    name: 'James L.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'A perfect spot for date night. The staff is attentive and the flavors are unforgettable.',
  },
  {
    name: 'Aisha K.',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    quote: 'Loved the modern vibe and the spicy mains! Will definitely be back with friends.',
  },
  {
    name: 'Carlos M.',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    quote: 'The glassmorphism design and warm colors make this place feel so premium. 10/10 experience.',
  },
  {
    name: 'Emily R.',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    quote: 'Signature cocktails are a must-try! The desserts are heavenly too.',
  },
];

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } },
  },
  exit: (dir) => ({
    x: dir < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
};

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const Testimonials = () => {
  const [[page, dir], setPage] = useState([0, 0]);
  const index = ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = (newDir) => setPage([page + newDir, newDir]);

  // Auto-slide logic
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [page]);

  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-neutral-100 p-8 animate-fade-in">
        <h2 className="font-display text-3xl md:text-4xl text-primary-500 mb-8 text-center tracking-tight">What Our Guests Say</h2>
        <div className="relative flex items-center justify-center min-h-[320px]">
          <button
            aria-label="Previous testimonial"
            onClick={() => paginate(-1)}
            className="absolute left-0 z-10 p-2 rounded-full bg-white/70 hover:bg-primary-400 hover:text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <span aria-hidden>‹</span>
          </button>
          <div className="w-full flex justify-center relative min-h-[260px]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                className="w-full max-w-md mx-auto bg-white/90 rounded-2xl p-8 shadow-lg border border-neutral-100 flex flex-col items-center gap-4 animate-glass-morph"
                style={{ position: 'absolute', left: 0, right: 0 }}
              >
                <img
                  src={testimonials[index].avatar}
                  alt={testimonials[index].name}
                  className="w-16 h-16 rounded-full border-4 border-primary-400 shadow-md mb-2"
                />
                <blockquote className="font-sans text-lg text-neutral-800 italic text-center">“{testimonials[index].quote}”</blockquote>
                <span className="font-display text-primary-500 font-semibold text-base mt-2">{testimonials[index].name}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => paginate(1)}
            className="absolute right-0 z-10 p-2 rounded-full bg-white/70 hover:bg-primary-400 hover:text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${i === index ? 'bg-primary-400 scale-110' : 'bg-neutral-300'}`}
              aria-label={i === index ? 'Current testimonial' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
