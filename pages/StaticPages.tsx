import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const About: React.FC = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <h1 className="text-4xl font-black mb-8 dark:text-white relative">
      <span className="relative z-10">About Truth X Talk</span>
      <span className="absolute bottom-1 left-0 w-24 h-3 bg-primary/30 -z-0"></span>
    </h1>
    <div className="prose dark:prose-invert prose-lg">
      <p className="text-lg mb-6 leading-relaxed">Welcome to <strong>Truth X Talk</strong>, your number one source for all things related to global news and entertainment.</p>
      <p className="mb-6 leading-relaxed">Founded in 2024, Truth X Talk has come a long way from its beginnings. When we first started out, our passion for "Unbiased Truth" drove us to start our own business.</p>
      <p className="leading-relaxed">We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
      
      {/* Contact Info Sidebar */}
      <div className="bg-primary text-white p-10 md:w-1/3 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-black mb-6">Let's Talk</h2>
          <p className="mb-8 opacity-90">Have a story tip, question, or just want to say hi? We'd love to hear from you.</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm uppercase opacity-80 mb-1">Our Office</h4>
                <p className="text-sm">123 Media Street, Global City, NY 10012</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm uppercase opacity-80 mb-1">Email Us</h4>
                <p className="text-sm">contact@truthxtalk.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm uppercase opacity-80 mb-1">Call Us</h4>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-sm opacity-70">
          &copy; Truth X Talk Support Team
        </div>
      </div>

      {/* Form Section */}
      <div className="p-10 md:w-2/3">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Send us a message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">First Name</label>
              <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white" placeholder="John" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Last Name</label>
              <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white" placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
            <input type="email" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Subject</label>
            <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white">
              <option>General Inquiry</option>
              <option>Editorial Tip</option>
              <option>Advertising</option>
              <option>Report a Bug</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
            <textarea rows={5} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white" placeholder="Write your message here..."></textarea>
          </div>
          
          <button className="w-full bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition flex justify-center items-center shadow-lg">
            Send Message <Send size={18} className="ml-2"/>
          </button>
        </form>
      </div>
    </div>
  </div>
);

export const Privacy: React.FC = () => (
   <div className="container mx-auto px-4 py-16 max-w-3xl dark:text-gray-300">
    <h1 className="text-3xl font-bold mb-6 dark:text-white">Privacy Policy</h1>
    <p>This is a demo privacy policy for Truth X Talk. In a real application, this would contain legal text regarding data collection, cookies, and user rights.</p>
   </div>
);

export const Terms: React.FC = () => (
   <div className="container mx-auto px-4 py-16 max-w-3xl dark:text-gray-300">
    <h1 className="text-3xl font-bold mb-6 dark:text-white">Terms & Conditions</h1>
    <p>This is a demo terms page for Truth X Talk. By using this website, you agree to the terms listed here (placeholder).</p>
   </div>
);
