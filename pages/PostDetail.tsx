import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts, getComments, addComment, incrementViews } from '../services/storageService';
import { BlogPost, Comment } from '../types';
import { Clock, User, Share2, MessageSquare, Send, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      incrementViews(id);
      // Fetch posts after incrementing to get updated view count
      const posts = getPosts();
      const found = posts.find(p => p.id === id);
      setPost(found || null);
      setComments(getComments(id));
    }
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      postId: id,
      user: 'Guest User',
      text: newComment,
      date: new Date().toLocaleDateString()
    };
    
    addComment(comment);
    setComments([...comments, comment]);
    setNewComment('');
  };

  if (!post) return <div className="text-center py-20">Post not found</div>;

  return (
    <article className="pb-20">
      {/* Featured Header */}
      <div className="h-[400px] w-full relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center space-x-6 text-gray-300 text-sm">
              <span className="flex items-center"><User size={16} className="mr-2"/> {post.author}</span>
              <span className="flex items-center"><Clock size={16} className="mr-2"/> {post.date}</span>
              <span className="flex items-center"><Eye size={16} className="mr-2"/> {post.views?.toLocaleString() || 0} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="prose dark:prose-invert max-w-none mb-12 prose-img:rounded-xl prose-headings:font-heading prose-a:text-primary"
           >
              {/* Render HTML Content from Rich Text Editor */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
           </motion.div>

           {/* Tags */}
           <div className="flex flex-wrap gap-2 mb-12">
             {post.tags.map(tag => (
               <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">#{tag}</span>
             ))}
           </div>

           {/* Share */}
           <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 mb-12 flex justify-between items-center">
             <span className="font-bold dark:text-white">Share this article</span>
             <div className="flex space-x-4">
               <button className="p-2 bg-blue-600 text-white rounded-full hover:opacity-90"><Share2 size={18}/></button>
               {/* Placeholders for other social icons */}
             </div>
           </div>

           {/* Comments */}
           <div>
             <h3 className="text-2xl font-bold mb-8 dark:text-white flex items-center">
               <MessageSquare className="mr-2 text-primary"/> Comments ({comments.length})
             </h3>
             
             <form onSubmit={handleCommentSubmit} className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
               <textarea 
                 className="w-full p-4 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-primary"
                 placeholder="Join the discussion..."
                 rows={3}
                 value={newComment}
                 onChange={(e) => setNewComment(e.target.value)}
               ></textarea>
               <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition flex items-center">
                 Post Comment <Send size={16} className="ml-2"/>
               </button>
             </form>

             <div className="space-y-6">
               {comments.map(comment => (
                 <div key={comment.id} className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                     {comment.user[0]}
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-bold dark:text-white">{comment.user}</span>
                       <span className="text-xs text-gray-500">{comment.date}</span>
                     </div>
                     <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
           <div className="sticky top-24 space-y-8">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
               <h4 className="font-bold text-lg mb-4 dark:text-white">Newsletter</h4>
               <p className="text-sm text-gray-500 mb-4">Get the latest news directly to your inbox.</p>
               <input type="email" placeholder="Email address" className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600" />
               <button className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded font-bold text-sm">Subscribe</button>
             </div>
             
             {/* Related Placeholder */}
             <div>
                <h4 className="font-bold text-lg mb-4 dark:text-white border-b pb-2">Trending Now</h4>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
             </div>
           </div>
        </aside>
      </div>
    </article>
  );
};