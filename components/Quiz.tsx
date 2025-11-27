import React, { useState, useEffect } from 'react';
import { EraData, QuizQuestion, QuizResult } from '../types';
import { generateQuizForEra } from '../services/geminiService';

interface QuizProps {
  era: EraData;
  onFinish: (result: QuizResult) => void;
  onExit: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ era, onFinish, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      const generatedQuestions = await generateQuizForEra(era);
      setQuestions(generatedQuestions);
      setLoading(false);
    };
    loadQuiz();
  }, [era]);

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === questions[currentQIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(p => p + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      onFinish({ score: score + (selectedOption === questions[currentQIndex].correctAnswer ? 0 : 0), total: questions.length });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-xl font-serif text-slate-600 animate-pulse">El mestre està preparant les preguntes sobre {era.title}...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className={`h-full bg-gradient-to-r ${era.color} transition-all duration-500`}
            style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">Pregunta {currentQIndex + 1} de {questions.length}</span>
            <button onClick={onExit} className="text-slate-400 hover:text-red-500 text-sm font-medium">Sortir</button>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium ";
              
              if (selectedOption === null) {
                btnClass += "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700";
              } else {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (idx === selectedOption) {
                  btnClass += "border-red-400 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-slate-100 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(idx)}
                  className={btnClass}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm font-bold ${
                       selectedOption !== null && idx === currentQuestion.correctAnswer ? 'bg-green-200 text-green-700' :
                       selectedOption === idx ? 'bg-red-200 text-red-700' :
                       'bg-slate-200 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          <div className={`mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-100 transition-all duration-300 ${showExplanation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
             <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-2">
                {selectedOption === currentQuestion.correctAnswer ? '🎉 Correcte!' : '💡 La resposta correcta és la ' + String.fromCharCode(65 + currentQuestion.correctAnswer)}
             </h4>
             <p className="text-indigo-800 text-sm">{currentQuestion.explanation}</p>
             <div className="mt-4 flex justify-end">
                <button 
                  onClick={nextQuestion}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
                >
                  {currentQIndex < questions.length - 1 ? 'Següent Pregunta' : 'Veure Resultats'}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
