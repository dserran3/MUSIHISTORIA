import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { EraCard } from './components/EraCard';
import { EraDetail } from './components/EraDetail';
import { Quiz } from './components/Quiz';
import { MUSIC_ERAS } from './constants';
import { EraData, QuizResult } from './types';

enum ViewState {
  HOME,
  DETAIL,
  QUIZ,
  RESULT
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedEra, setSelectedEra] = useState<EraData | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleEraSelect = (era: EraData) => {
    setSelectedEra(era);
    setCurrentView(ViewState.DETAIL);
    window.scrollTo(0, 0);
  };

  const handleStartQuiz = () => {
    setCurrentView(ViewState.QUIZ);
  };

  const handleQuizFinish = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentView(ViewState.RESULT);
  };

  const goHome = () => {
    setCurrentView(ViewState.HOME);
    setSelectedEra(null);
    setQuizResult(null);
    window.scrollTo(0, 0);
  };

  const backToDetail = () => {
    setCurrentView(ViewState.DETAIL);
    setQuizResult(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar onHome={goHome} />

        {currentView === ViewState.HOME && (
          <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-800 mb-6">
                Viatge per la Història de la Música
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Prepara't per al teu examen de 2n d'ESO explorant les tres grans etapes: 
                el dramatisme del Barroc, l'equilibri del Classicisme i la passió del Romanticisme.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.values(MUSIC_ERAS).map((era) => (
                <EraCard key={era.id} era={era} onClick={handleEraSelect} />
              ))}
            </div>
            
            <footer className="mt-20 text-center text-slate-400 text-sm">
              <p>© 2024 MusiHistòria Educació. Utilitza IA per generar preguntes d'estudi.</p>
            </footer>
          </main>
        )}

        {currentView === ViewState.DETAIL && selectedEra && (
          <EraDetail 
            era={selectedEra} 
            onStartQuiz={handleStartQuiz} 
            onBack={goHome} 
          />
        )}

        {currentView === ViewState.QUIZ && selectedEra && (
          <Quiz 
            era={selectedEra} 
            onFinish={handleQuizFinish} 
            onExit={backToDetail} 
          />
        )}

        {currentView === ViewState.RESULT && quizResult && selectedEra && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
              <div className="mb-6">
                {quizResult.score / quizResult.total >= 0.8 ? (
                   <span className="text-6xl">🏆</span>
                ) : quizResult.score / quizResult.total >= 0.5 ? (
                   <span className="text-6xl">👍</span>
                ) : (
                   <span className="text-6xl">📚</span>
                )}
              </div>
              
              <h2 className="text-3xl font-serif font-bold mb-2">Resultat Final</h2>
              <p className="text-slate-500 mb-8">Test sobre {selectedEra.title}</p>
              
              <div className="text-6xl font-bold text-indigo-600 mb-4">
                {quizResult.score}<span className="text-3xl text-slate-300">/{quizResult.total}</span>
              </div>
              
              <p className="text-lg text-slate-700 mb-8">
                {quizResult.score / quizResult.total === 1 ? "Perfecte! Estàs preparadíssim per a l'examen." :
                 quizResult.score / quizResult.total >= 0.5 ? "Bona feina! Repassa els errors i ho dominaràs." :
                 "Cal estudiar una mica més. Torna a llegir el temari!"}
              </p>

              <div className="flex flex-col gap-3">
                <button onClick={handleStartQuiz} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                  Repetir Test
                </button>
                <button onClick={backToDetail} className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                  Tornar a l'Època
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
