import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/storageService';
import { BlogPost } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Play, Eye } from 'lucide-react';
import { Slider } from '../components/Slider';
import { CATEGORIES } from '../constants';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [sliderPosts, setSliderPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const allPosts = getPosts();
    setPosts(allPosts);

    // Get the latest post from each category for the slider
    const latestFromCategories: BlogPost[] = [];
    CATEGORIES.forEach(cat => {
      const post = allPosts.find(p => p.category === cat);
      if (post) latestFromCategories.push(post);
    });
    setSliderPosts(latestFromCategories);

  }, []);

  const worldNews = posts.filter(p => p.category === 'World News').slice(0, 4);
  const entertainment = posts.filter(p => ['Movies', 'Series', 'Anime'].includes(p.category)).slice(0, 6);

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in pb-12">
      {/* Dynamic Slider */}
      <Slider posts={sliderPosts} />

      {/* Dynamic Trending Ticker */}
      <div className="bg-primary text-white py-3 overflow-hidden whitespace-nowrap border-b-4 border-black/20 flex relative z-10">
        <div className="animate-marquee flex items-center">
          {/* We duplicate the posts list to ensure a seamless loop */}
          {[...posts, ...posts].slice(0, 20).map((post, index) => (
             <React.Fragment key={`${post.id}-${index}`}>
                <span className="font-bold uppercase text-xs mx-2 bg-black/20 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm font-semibold mr-8">
                  {post.title}
                </span>
                <span className="mx-4 opacity-50">///</span>
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-12">
        
        {/* World News Section */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
             <h2 className="text-3xl font-black font-heading dark:text-white relative pl-4">
               <span className="absolute left-0 top-1 w-2 h-8 bg-primary"></span>
               World News
             </h2>
             <Link to="/category/world-news" className="text-sm font-bold text-gray-500 hover:text-primary uppercase flex items-center">View All <ArrowRight size={14} className="ml-1"/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {worldNews.map((post) => (
              <motion.div 
                key={post.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Link to={`/post/${post.id}`}>
                  <div className="relative h-48 overflow-hidden rounded-lg mb-4 shadow-sm">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 uppercase rounded">{post.category}</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors dark:text-gray-100">{post.title}</h3>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center"><Clock size={12} className="mr-1"/> {post.date}</span>
                    <span className="flex items-center"><Eye size={12} className="mr-1"/> {post.views?.toLocaleString() || 0}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Entertainment / Movies / Anime */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
             <h2 className="text-3xl font-black font-heading dark:text-white relative pl-4">
               <span className="absolute left-0 top-1 w-2 h-8 bg-accent"></span>
               Entertainment Hub
             </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {entertainment.slice(0, 4).map((post) => (
                <div key={post.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
                  <Link to={`/post/${post.id}`} className="relative h-48 block overflow-hidden group">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                    <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80 group-hover:scale-110 transition" size={40} fill="white" />
                  </Link>
                  <div className="p-4 flex-grow flex flex-col">
                    <Link to={`/post/${post.id}`}><h3 className="font-bold text-lg mb-2 dark:text-white hover:text-primary transition line-clamp-2">{post.title}</h3></Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center"><Clock size={12} className="mr-1"/> {post.date}</span>
                      <span className="flex items-center"><Eye size={12} className="mr-1"/> {post.views?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sidebar / Top Reviews */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl h-fit">
              <h3 className="font-bold text-xl mb-6 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Top Reviews
              </h3>
              <div className="space-y-6">
                {posts.filter(p => p.category === 'Reviews').slice(0, 3).map((post, index) => (
                  <div key={post.id} className="flex gap-4 items-start border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0 group">
                    <span className="text-4xl font-black text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">{index + 1}</span>
                    <div className="w-full">
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                      <Link to={`/post/${post.id}`}>
                        <h4 className="font-bold text-sm leading-snug hover:text-primary transition dark:text-gray-200 mt-1">{post.title}</h4>
                      </Link>
                      <div className="flex items-center justify-end mt-1 text-[10px] text-gray-500">
                         <span className="flex items-center"><Eye size={10} className="mr-1"/> {post.views?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};