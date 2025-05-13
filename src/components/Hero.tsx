
import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-28">
      <div className="container max-w-7xl">
        <div className="max-w-3xl animate-fade-in">
          <span className="text-sm text-neutral-500 font-mono mb-4 block">Hi there, I'm</span>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Full Stack Developer & Designer
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-2xl">
            I build exceptional digital experiences that are fast, accessible, 
            visually appealing, and responsive. Currently, I'm focused on building 
            products that help people in meaningful ways.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href="#work" 
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-black/80 transition-colors text-sm font-medium"
            >
              View my work
            </a>
            
            <a 
              href="#contact" 
              className="px-6 py-3 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium"
            >
              Contact me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
