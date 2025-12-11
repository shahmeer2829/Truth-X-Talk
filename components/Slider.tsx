import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, ChevronRight, ChevronLeft } from 'lucide-react';

interface SliderProps {
  posts: BlogPost[];
}

export const Slider: React.FC<SliderProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Reset index if posts array shrinks and current index is out of bounds
    if (currentIndex >= posts.length) {
        setCurrentIndex(0);
    }
  }, [posts, currentIndex]);

  useEffect(() => {
    if (isPaused || posts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, posts.length]);

  if (posts.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % posts.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);

  const currentPost = posts[currentIndex];
  // Safety check: if currentPost is undefined (e.g. during state transition), return null or loader
  if (!currentPost) return null; 

  return (
    <div 
      className="relative h-[600px] w-full overflow-hidden bg-gray-900 text-white group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentPost.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
         <div className="container mx-auto px-4 mt-20 md:mt-32">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
               <span className="bg-primary px-4 py-1 text-xs font-bold uppercase rounded-sm mb-4 inline-block shadow-lg">
                {currentPost.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading max-w-5xl leading-tight mb-6 drop-shadow-lg">
                {currentPost.title}
              </h1>
               <div className="flex items-center space-x-6 text-sm md:text-base text-gray-200 mb-8 drop-shadow-md font-semibold">
                 <span className="flex items-center"><User size={16} className="mr-2 text-primary"/> {currentPost.author}</span>
                 <span className="flex items-center"><Clock size={16} className="mr-2 text-primary"/> {currentPost.date}</span>
              </div>
              <Link to={`/post/${currentPost.id}`} className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-xl">
                  Read More <ArrowRight size={18} className="ml-2"/>
              </Link>
            </motion.div>
         </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {posts.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white'}`}
          />
        ))}
      </div>

      {/* Nav Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-primary transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-primary transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};