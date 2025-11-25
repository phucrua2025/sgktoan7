import React, { useState } from 'react';
import { Question } from '../types';
import { Eye, EyeOff, CheckCircle2, HelpCircle, FileDown } from 'lucide-react';

interface ExerciseDisplayProps {
  questions: Question[];
}

export const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ questions }) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestionAnswer = (id: string) => {
    const newRevealed = new Set(revealedQuestions);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedQuestions(newRevealed);
  };

  const handleShowAll = () => {
    if (showAllAnswers) {
      setRevealedQuestions(new Set());
    } else {
      const allIds = new Set(questions.map(q => q.id));
      setRevealedQuestions(allIds);
    }
    setShowAllAnswers(!showAllAnswers);
  };

  const copyToClipboard = () => {
    const text = questions.map((q, i) => {
      let qText = `Câu ${i + 1}: ${q.content}\n`;
      if (q.options && q.options.length > 0) {
        q.options.forEach(opt => qText += `  - ${opt}\n`);
      }
      qText += `Đáp án: ${q.correctAnswer}\nGiải thích: ${q.explanation}\n\n`;
      return qText;
    }).join('---\n');
    
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã sao chép nội dung bài tập vào bộ nhớ tạm!");
    });
  };

  if (questions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-indigo-50/50 rounded-t-xl">
        <div>
          <h2 className="text-xl font-bold text-indigo-900">Danh sách câu hỏi</h2>
          <p className="text-slate-500 text-sm mt-1">Tổng số: {questions.length} câu</p>
        </div>
        
        <div className="flex gap-2">
           <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors text-sm font-medium shadow-sm"
          >
            <FileDown className="w-4 h-4" /> Sao chép
          </button>
          <button
            onClick={handleShowAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors border
              ${showAllAnswers 
                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
          >
            {showAllAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAllAnswers ? 'Ẩn tất cả đáp án' : 'Hiện tất cả đáp án'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {questions.map((q, index) => {
          const isRevealed = revealedQuestions.has(q.id);
          
          return (
            <div key={q.id} className="relative pl-0 md:pl-4 transition-all duration-300">
              {/* Question Number Badge */}
              <div className="absolute -left-2 md:-left-4 top-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-sm shadow-md z-10">
                {index + 1}
              </div>

              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors ml-4">
                <div className="mb-4">
                  <p className="text-slate-800 font-medium text-lg leading-relaxed">{q.content}</p>
                </div>

                {/* Multiple Choice Options */}
                {q.type === 'MULTIPLE_CHOICE' && q.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-md border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 cursor-pointer transition-colors group">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 text-slate-500 text-xs font-bold group-hover:border-indigo-400 group-hover:text-indigo-600 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-slate-700">{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False Options */}
                {q.type === 'TRUE_FALSE' && (
                  <div className="flex gap-4 mb-4">
                     <div className="flex-1 p-3 bg-white border border-slate-200 rounded-lg text-center font-medium hover:border-indigo-300 cursor-pointer">Đúng</div>
                     <div className="flex-1 p-3 bg-white border border-slate-200 rounded-lg text-center font-medium hover:border-indigo-300 cursor-pointer">Sai</div>
                  </div>
                )}

                {/* Answer Toggle */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => toggleQuestionAnswer(q.id)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 focus:outline-none"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án & giải thích'}
                  </button>

                  {isRevealed && (
                    <div className="mt-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100 animate-fadeIn">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-800">Đáp án: </span>
                          <span className="text-emerald-900">{q.correctAnswer}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-indigo-800">Giải thích: </span>
                          <span className="text-slate-700">{q.explanation}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};