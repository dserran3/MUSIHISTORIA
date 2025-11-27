import React, { useState } from 'react';
import { EraData } from '../types';
import { explainConcept } from '../services/geminiService';

interface EraDetailProps {
  era: EraData;
  onStartQuiz: () => void;
  onBack: () => void;
}

export const EraDetail: React.FC<EraDetailProps> = ({ era, onStartQuiz, onBack }) => {
  const [askedConcept, setAskedConcept] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const handleAsk = async (concept: string) => {
    if (loadingExplanation) return;
    setAskedConcept(concept);
    setLoadingExplanation(true);
    const text = await explainConcept(concept, era.title);
    setExplanation(text);
    setLoadingExplanation(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className={`relative h-64 md:h-80 w-full overflow-hidden`}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${era.image})` }} />
        <div className={`absolute inset-0 bg-gradient-to-r ${era.color} opacity-90`} />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="max-w-4xl">
                <button onClick={onBack} className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2 font-medium transition-colors">
                    ← Tornar
                </button>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">{era.title}</h1>
                <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest">{era.years}</p>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        
        {/* Study Section Label */}
        <div className="flex justify-center mb-4">
            <span className="bg-white text-slate-800 px-6 py-2 rounded-full shadow-md font-bold text-sm tracking-wide uppercase border border-slate-200">
                Zona de Consulta i Estudi
            </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <p className="text-lg leading-relaxed text-slate-700 mb-6 border-l-4 border-yellow-400 pl-4 italic">
                {era.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
                {/* Characteristics */}
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✨</span> Característiques
                    </h3>
                    <ul className="space-y-3">
                        {era.characteristics.map((char, idx) => (
                            <li key={idx} className="flex items-start gap-3 group cursor-pointer" onClick={() => handleAsk(char)}>
                                <span className="text-yellow-500 font-bold mt-1">•</span>
                                <span className="text-slate-700 group-hover:text-blue-600 transition-colors border-b border-transparent group-hover:border-blue-200">
                                    {char}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Forms */}
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎼</span> Formes Musicals
                    </h3>
                    <ul className="space-y-3">
                        {era.forms.map((form, idx) => (
                            <li key={idx} className="flex items-start gap-3 group cursor-pointer" onClick={() => handleAsk(form)}>
                                <span className="text-yellow-500 font-bold mt-1">•</span>
                                <span className="text-slate-700 group-hover:text-blue-600 transition-colors border-b border-transparent group-hover:border-blue-200">
                                    {form}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* AI Tutor Popup/Box */}
            {(askedConcept || loadingExplanation) && (
                <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-lg p-6 animate-fade-in">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-600 text-white rounded-full p-2 mt-1">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-indigo-900 mb-2">Professor Virtual: {askedConcept}</h4>
                            {loadingExplanation ? (
                                <div className="flex space-x-2 animate-pulse">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animation-delay-200"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animation-delay-400"></div>
                                </div>
                            ) : (
                                <p className="text-indigo-800 text-sm md:text-base leading-relaxed">{explanation}</p>
                            )}
                        </div>
                        <button onClick={() => { setAskedConcept(null); setExplanation(null); }} className="text-indigo-400 hover:text-indigo-600">✕</button>
                    </div>
                </div>
            )}
        </div>

        {/* Composers Section */}
        <h3 className="text-3xl font-serif font-bold text-slate-800 mb-8 text-center">Compositors Destacats</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {era.composers.map((composer, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-100">
                    <div className="h-56 overflow-hidden bg-slate-200 relative">
                        <img 
                            src={composer.image} 
                            alt={composer.name} 
                            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110" 
                            onError={(e) => {
                                // Fallback if image fails
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=Retrat+del+Compositor";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white text-sm font-medium">Veure obres principals</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="font-bold text-xl mb-3 text-slate-800">{composer.name}</h4>
                        <div className="flex flex-wrap gap-2">
                            {composer.notableWorks.map((work, wIdx) => (
                                <span key={wIdx} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                                    {work}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Video Resources Section (New) */}
        {era.videoLinks && era.videoLinks.length > 0 && (
            <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="text-red-600">▶</span> Vídeos per Aprofundir
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {era.videoLinks.map((video, idx) => (
                        <a 
                            key={idx} 
                            href={video.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-slate-200 transition-all hover:bg-red-50 group"
                        >
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 group-hover:text-red-700">{video.title}</h4>
                                <span className="text-xs text-slate-500">Obrir a YouTube ↗</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )}

        {/* Action Bar - The "Contest" part */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-center z-50">
            <div className="flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Tot llest per demostrar el que saps?</p>
                <button 
                    onClick={onStartQuiz}
                    className={`bg-gradient-to-r ${era.color} text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 ring-4 ring-white ring-opacity-50`}
                >
                    <span>🏆</span> Entrar al Concurs
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};