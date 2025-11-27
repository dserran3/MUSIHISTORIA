import React from 'react';
import { EraData } from '../types';

interface EraCardProps {
  era: EraData;
  onClick: (era: EraData) => void;
}

export const EraCard: React.FC<EraCardProps> = ({ era, onClick }) => {
  return (
    <div 
      onClick={() => onClick(era)}
      className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${era.image})` }}
      />
      
      {/* Overlay Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t ${era.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
          <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">{era.years}</p>
          <h2 className="text-4xl font-serif font-bold mb-4">{era.title}</h2>
          <p className="text-white/90 line-clamp-3 mb-6 font-light leading-relaxed">
            {era.description}
          </p>
          <div className="flex items-center text-sm font-bold uppercase tracking-wider text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explorar Època <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
