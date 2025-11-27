import React from 'react';

interface NavbarProps {
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHome }) => {
  return (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button 
          onClick={onHome}
          className="text-2xl font-bold font-serif tracking-wide hover:text-yellow-400 transition-colors flex items-center gap-2"
        >
          <span>🎵</span> MusiHistòria <span className="text-sm font-sans bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">2n ESO</span>
        </button>
        <div>
          <button 
            onClick={onHome}
            className="text-sm font-medium hover:text-yellow-400 transition-colors"
          >
            Inici
          </button>
        </div>
      </div>
    </nav>
  );
};
