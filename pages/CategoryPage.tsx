import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/storageService';
import { Clock, Star, Eye } from 'lucide-react';
import { Slider } from '../components/Slider';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // Basic normalization for matching (url slug to Title Case)
  const normalizedCategory = category
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  const allPosts = getPosts();
  const posts = allPosts.filter(p => p.category.toLowerCase() === normalizedCategory.toLowerCase());

  // Slider Content: Top 3 newest/highest rated (simulated by Views or Featured)
  const sliderPosts = posts
    .sort((a, b) => ((b.views || 0) - (a.views || 0)))
    .slice(0, 5);

  return (
    <div className="animate-fade-in">
      {posts.length > 0 && (
         <div className="mb-12">
            {/* Added key={category} to force the Slider to reset its internal state (currentIndex) when changing categories */}
            <Slider key={category} posts={sliderPosts} />
         </div>
      )}

      <div className="container mx-auto px-4 py-8 pb-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-1 bg-primary rounded-full"></div>
          <div>
            <h1 className="text-4xl font-black font-heading dark:text-white">{normalizedCategory}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Browsing all articles in {normalizedCategory}</p>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link to={`/post/${post.id}`} key={post.id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700">
                  <div className="h-56 overflow-hidden relative">
                     <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                     {post.featured && (
                       <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded flex items-center">
                         <Star size={10} className="mr-1 fill-black"/> Featured
                       </span>
                     )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                     <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                       <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.date}</span>
                       <span className="flex items-center"><Eye size={12} className="mr-1" /> {post.views?.toLocaleString() || 0} views</span>
                     </div>
                     <h2 className="text-xl font-bold mb-3 dark:text-white group-hover:text-primary transition leading-tight">{post.title}</h2>
                     <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                     <div className="mt-auto">
                        <span className="text-primary text-sm font-bold uppercase tracking-wide border-b-2 border-transparent group-hover:border-primary transition-all">Read Story</span>
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">No posts found in this category yet.</h3>
            <Link to="/" className="text-primary mt-4 inline-block font-bold hover:underline">Go Back Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};