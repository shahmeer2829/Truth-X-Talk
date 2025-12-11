import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { savePost } from '../services/storageService';
import { generateBlogContent } from '../services/geminiService';
import { BlogPost } from '../types';
import { Wand2, Save, Loader2, Image as ImageIcon, Video, Bold, Italic, List, Type, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export const Editor: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null); // For contentEditable

  // Check Auth
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    category: 'World News',
    content: '',
    excerpt: '',
    tags: [],
    author: 'Admin User',
    imageUrl: ''
  });

  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);

  // Update content state when editable div changes
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormData(prev => ({ ...prev, content: e.currentTarget.innerHTML }));
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
        editorRef.current.focus();
    }
  };

  const validateAndProcessFile = (file: File, callback: (base64: string) => void) => {
    // 500KB limit for local storage based app
    if (file.size > 500 * 1024) {
      alert("File is too large! Please upload an image smaller than 500KB to save storage space.");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file, (base64) => {
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
      });
    }
  };

  const insertLocalImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
         validateAndProcessFile(file, (src) => {
           execCommand('insertImage', src);
         });
      }
    };
    input.click();
  };

  const insertVideo = () => {
    const url = prompt("Enter Video Embed URL (e.g., YouTube embed link):");
    if (url) {
      const html = `<div class="aspect-w-16 aspect-h-9 my-4"><iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-96 rounded-lg"></iframe></div>`;
      document.execCommand('insertHTML', false, html);
    }
  };

  const handleGenerate = async () => {
    if (!formData.title) {
      alert("Please enter a title first so AI knows what to write about!");
      return;
    }
    setLoading(true);
    const result = await generateBlogContent(formData.title);
    
    // Generate AI Image using Pollinations based on prompt
    const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(result.imagePrompt)}?nologo=true&width=1280&height=720&model=flux`;

    setFormData(prev => ({
      ...prev,
      content: result.content,
      excerpt: result.excerpt,
      tags: result.tags,
      imageUrl: aiImageUrl
    }));
    
    setSeoKeywords(result.seoKeywords);
    
    // Update the visual editor
    if (editorRef.current) {
      editorRef.current.innerHTML = result.content;
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: formData.title || 'Untitled',
      content: formData.content || '',
      excerpt: formData.excerpt || '',
      category: formData.category as any,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      imageUrl: formData.imageUrl || 'https://picsum.photos/800/600',
      tags: formData.tags || [],
      featured: false,
      views: 0
    };

    savePost(newPost);
    navigate('/');
  };

  if (!isAdmin) return null; // Logic handled in useEffect, but safe return

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-black font-heading dark:text-white">Create New Post</h1>
           <button 
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition disabled:opacity-50 shadow-lg shadow-purple-500/30"
            >
              {loading ? <Loader2 size={16} className="animate-spin mr-2"/> : <Wand2 size={16} className="mr-2"/>}
              Generate Full SEO Content & Image
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 dark:text-gray-300">Title</label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter an engaging headline..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 dark:text-gray-300">Category</label>
              <select 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Featured Image Section */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
             <label className="block text-sm font-bold mb-3 dark:text-gray-300">Featured Image</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                   <div className="flex gap-2 mb-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded text-sm font-bold dark:text-white hover:bg-gray-300 transition">
                         <Upload size={16}/> Upload Local
                      </button>
                      <input 
                        type="text" 
                        placeholder="Or paste URL..."
                        className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-500 dark:text-white text-sm"
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      />
                   </div>
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                   <p className="text-xs text-gray-500">Supports JPG, PNG (Max 500KB) or AI Generated URL.</p>
                </div>
                {formData.imageUrl && (
                  <div className="relative h-40 rounded-lg overflow-hidden bg-gray-900">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
             </div>
          </div>

          {/* Rich Text Editor */}
          <div>
             <label className="block text-sm font-bold mb-2 dark:text-gray-300">Content</label>
             <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-100 dark:bg-gray-700 p-2 flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-600">
                   <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white" title="Bold"><Bold size={18}/></button>
                   <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white" title="Italic"><Italic size={18}/></button>
                   <button type="button" onClick={() => execCommand('formatBlock', 'H2')} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white font-bold" title="Heading 2">H2</button>
                   <button type="button" onClick={() => execCommand('formatBlock', 'H3')} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white font-bold" title="Heading 3">H3</button>
                   <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white" title="List"><List size={18}/></button>
                   <div className="w-px h-8 bg-gray-300 dark:bg-gray-500 mx-1"></div>
                   <button type="button" onClick={insertLocalImage} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white" title="Insert Image"><ImageIcon size={18}/></button>
                   <button type="button" onClick={insertVideo} className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded dark:text-white" title="Insert Video"><Video size={18}/></button>
                </div>
                
                {/* Editable Area */}
                <div 
                  ref={editorRef}
                  contentEditable
                  onInput={handleContentChange}
                  className="w-full h-96 p-4 dark:bg-gray-800 dark:text-white focus:outline-none overflow-y-auto prose dark:prose-invert max-w-none"
                  style={{ minHeight: '300px' }}
                ></div>
             </div>
          </div>

          {/* Keywords and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-300">Tags (comma separated)</label>
                <input 
                  type="text"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.tags?.join(', ')}
                  onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
                  placeholder="News, Tech, World..."
                />
             </div>
             <div>
                 <label className="block text-sm font-bold mb-2 dark:text-gray-300">Keywords (Internal SEO)</label>
                 <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[50px] flex flex-wrap gap-2">
                    {seoKeywords.length > 0 ? seoKeywords.map(k => (
                       <span key={k} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-bold">{k}</span>
                    )) : <span className="text-gray-400 text-sm">Generated keywords will appear here...</span>}
                 </div>
             </div>
          </div>

          <div className="pt-6 border-t dark:border-gray-700 flex justify-end">
            <button type="submit" className="w-full md:w-auto bg-green-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-green-700 transition flex justify-center items-center shadow-xl transform hover:scale-105">
              <Save size={20} className="mr-2"/> Publish Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};