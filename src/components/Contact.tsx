
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="text-sm text-neutral-500 font-mono mb-4 block">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-neutral-700 mb-8 max-w-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be 
              part of your vision. Fill out the form and I'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>New York, USA</span>
              </div>
            </div>
          </div>
          
          <div className="animate-[fade-in_0.5s_0.3s_ease-out_both]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                  <input 
                    id="email" 
                    type="email"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
                <input 
                  id="subject" 
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-black/80 transition-colors text-sm font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
