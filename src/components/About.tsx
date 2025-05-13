
import React from 'react';

const About = () => {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
    { category: "Design", items: ["Figma", "Adobe XD", "UI/UX Design", "Prototyping"] },
    { category: "Other", items: ["Git", "CI/CD", "Agile", "Testing"] }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-50">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="animate-fade-in">
            <span className="text-sm text-neutral-500 font-mono mb-4 block">About Me</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Developer with a passion for design and user experience
            </h2>
            
            <div className="space-y-4 text-neutral-700">
              <p>
                I'm a full-stack developer with over 5 years of experience building products for clients
                around the world. I specialize in creating websites and applications that are not only 
                functional but also provide an exceptional user experience.
              </p>
              
              <p>
                My approach to development is centered around solving real problems
                and creating intuitive, accessible interfaces that users love. I'm passionate
                about clean code, performance optimization, and staying up-to-date with the latest
                technologies.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring the outdoors, reading about new technologies,
                or contributing to open-source projects.
              </p>
            </div>
          </div>
          
          <div className="animate-[fade-in_0.5s_0.2s_ease-out_both]">
            <span className="text-sm text-neutral-500 font-mono mb-4 block">Skills & Technologies</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-3">
                  <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="flex items-center">
                        <svg 
                          className="h-5 w-5 mr-2 text-green-500" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
