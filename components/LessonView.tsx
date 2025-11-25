import React, { useState, useEffect } from 'react';
import { Lesson, Quiz } from '../types';
import { BookOpen, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Lightbulb, PenTool, GraduationCap, Trophy, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (score: number) => void;
  nextLessonId: string | null;
  onNextLesson: () => void;
  isCompleted: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  lesson, 
  onComplete, 
  nextLessonId, 
  onNextLesson,
  isCompleted 
}) => {
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  
  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [score, setScore] = useState(0);

  // Reset states when lesson changes
  useEffect(() => {
    setExpandedSolutions({});
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setScore(0);
  }, [lesson.id]);

  const toggleSolution = (id: string) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAnswer = (quizId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [quizId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!lesson.quizzes || lesson.quizzes.length === 0) return;

    let correctCount = 0;
    lesson.quizzes.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / lesson.quizzes.length) * 100);
    setScore(finalScore);
    setSubmittedQuiz(true);

    // Trigger completion if score >= 80
    if (finalScore >= 80) {
      onComplete(finalScore);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-10 pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 shadow-xl text-white p-8 lg:p-12 transition-all duration-500">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/10">
                <BookOpen size={16} />
                <span>Chương trình Toán 7</span>
             </div>
             {isCompleted && (
               <div className="bg-yellow-400/20 text-yellow-100 px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                 <CheckCircle2 size={16} className="text-yellow-300" />
                 <span className="text-xs font-bold uppercase">Đã hoàn thành</span>
               </div>
             )}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            {lesson.title}
          </h1>
          <p className="mt-4 text-teal-50 text-lg max-w-2xl opacity-90">
            Tổng hợp lý thuyết trọng tâm, ví dụ minh họa chi tiết và bài tập tự luyện.
          </p>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-12 space-y-10">
          
          {/* Section 1: Theory Summary */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Kiến thức trọng tâm</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {lesson.summary.map((point, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-colors group">
                  <div className="flex gap-4">
                    <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="text-slate-700 leading-relaxed text-base">
                      <MathRenderer content={point} as="span" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Illustrative Examples */}
          {lesson.examples && lesson.examples.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Ví dụ minh họa</h2>
              </div>

              <div className="space-y-6">
                {lesson.examples.map((example) => (
                  <div key={example.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="border-l-4 border-amber-400">
                      <div className="p-6 bg-slate-50 border-b border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wide">
                            Ví dụ
                          </span>
                          <h3 className="font-bold text-slate-800 text-lg">{example.title}</h3>
                        </div>
                        <div className="text-slate-800 text-lg font-medium">
                          <MathRenderer content={example.content} />
                        </div>
                      </div>
                      
                      <div className="p-6 bg-white">
                        <div className="flex gap-3">
                          <div className="mt-1 shrink-0">
                            <PenTool size={20} className="text-slate-400" />
                          </div>
                          <div className="space-y-2 w-full">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Lời giải chi tiết:</p>
                            <div className="text-slate-700 leading-7 bg-slate-50 p-4 rounded-lg border border-slate-100">
                              <MathRenderer content={example.explanation} className="whitespace-pre-line" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Practice Exercises */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Luyện tập vận dụng</h2>
            </div>

            <div className="space-y-4">
              {lesson.exercises.map((exercise, idx) => (
                <div key={exercise.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                  <div className="p-5 flex flex-col md:flex-row md:items-start gap-4">
                    <div className="shrink-0">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="text-lg text-slate-800 font-medium">
                        <MathRenderer content={exercise.question} />
                      </div>
                      
                      <div>
                        <button
                          onClick={() => toggleSolution(exercise.id)}
                          className={`
                            inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors
                            ${expandedSolutions[exercise.id] 
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                              : 'bg-teal-50 text-teal-600 hover:bg-teal-100'}
                          `}
                        >
                          {expandedSolutions[exercise.id] ? (
                            <>
                              <ChevronUp size={16} /> Ẩn đáp án
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} /> Xem đáp án
                            </>
                          )}
                        </button>

                        {expandedSolutions[exercise.id] && (
                          <div className="mt-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg animate-in fade-in slide-in-from-top-2">
                             <div className="flex gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-slate-800">
                                  <MathRenderer content={exercise.solution} className="whitespace-pre-line" />
                                </div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Quiz & Unlock */}
          {lesson.quizzes && lesson.quizzes.length > 0 && (
            <section className="border-t-2 border-dashed border-slate-200 pt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                  <Trophy size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Trắc nghiệm mở khóa</h2>
                <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-500">
                  Yêu cầu: &ge; 80%
                </span>
              </div>

              <div className="space-y-8">
                {lesson.quizzes.map((quiz, index) => {
                  const isCorrect = selectedAnswers[quiz.id] === quiz.correctAnswerIndex;
                  const isSelected = selectedAnswers[quiz.id] !== undefined;
                  
                  return (
                    <div key={quiz.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                         <h4 className="font-semibold text-slate-700 mb-3 flex gap-2">
                            <span className="bg-slate-200 text-slate-600 px-2 rounded text-sm flex items-center">Câu {index + 1}</span>
                         </h4>
                         <div className="text-slate-800 font-medium">
                           <MathRenderer content={quiz.question} />
                         </div>
                      </div>
                      <div className="p-5 grid gap-3">
                        {quiz.options.map((opt, optIdx) => {
                          let optionClass = "border-slate-200 hover:bg-slate-50 hover:border-slate-300";
                          
                          if (submittedQuiz) {
                            if (optIdx === quiz.correctAnswerIndex) {
                              optionClass = "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500"; // Correct
                            } else if (selectedAnswers[quiz.id] === optIdx) {
                              optionClass = "bg-rose-50 border-rose-500 text-rose-700"; // Wrong choice
                            } else {
                              optionClass = "opacity-50 border-slate-200";
                            }
                          } else if (selectedAnswers[quiz.id] === optIdx) {
                            optionClass = "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(quiz.id, optIdx)}
                              disabled={submittedQuiz}
                              className={`
                                w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between group
                                ${optionClass}
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`
                                  w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0
                                  ${submittedQuiz && optIdx === quiz.correctAnswerIndex ? 'bg-emerald-500 border-emerald-500 text-white' : 
                                    selectedAnswers[quiz.id] === optIdx ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 text-slate-500'}
                                `}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <MathRenderer content={opt} />
                              </div>
                              
                              {submittedQuiz && optIdx === quiz.correctAnswerIndex && (
                                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                              )}
                              {submittedQuiz && selectedAnswers[quiz.id] === optIdx && optIdx !== quiz.correctAnswerIndex && (
                                <AlertCircle size={20} className="text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {submittedQuiz && (
                        <div className={`p-4 ${isCorrect ? 'bg-emerald-50/50' : 'bg-rose-50/50'} border-t border-slate-100`}>
                           <p className="text-sm font-bold mb-1 flex items-center gap-2">
                             {isCorrect ? (
                               <span className="text-emerald-700">Chính xác!</span>
                             ) : (
                               <span className="text-rose-700">Chưa chính xác.</span>
                             )}
                           </p>
                           <div className="text-slate-700 text-sm">
                             <span className="font-semibold">Giải thích: </span>
                             <MathRenderer content={quiz.explanation} as="span" />
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Footer Actions */}
              <div className="mt-8 flex flex-col items-center gap-4">
                {!submittedQuiz ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < lesson.quizzes.length}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all w-full sm:w-auto"
                  >
                    Nộp bài & Xem kết quả
                  </button>
                ) : (
                  <div className="text-center w-full animate-in zoom-in duration-300">
                     <div className="inline-block p-6 rounded-2xl bg-white shadow-xl border border-slate-100 mb-6">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Kết quả của bạn</div>
                        <div className={`text-5xl font-black mb-2 ${score >= 80 ? 'text-emerald-500' : 'text-orange-500'}`}>
                          {score}%
                        </div>
                        <p className="text-slate-600">
                          {score >= 80 ? 'Chúc mừng! Bạn đã vượt qua bài học này.' : 'Hãy xem lại lý thuyết và thử lại nhé.'}
                        </p>
                     </div>
                     
                     {(score >= 80 || isCompleted) && nextLessonId ? (
                       <button
                         onClick={onNextLesson}
                         className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-teal-700 transition-all flex items-center gap-2 mx-auto animate-bounce"
                       >
                         Bài học tiếp theo <ArrowRight size={20} />
                       </button>
                     ) : (
                        (score >= 80 || isCompleted) ? (
                          <div className="text-teal-600 font-bold">Bạn đã hoàn thành tất cả bài học hiện có!</div>
                        ) : (
                          <button 
                            onClick={() => {
                              setSubmittedQuiz(false);
                              setSelectedAnswers({});
                              setScore(0);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-slate-500 font-medium hover:text-slate-800 underline"
                          >
                            Làm lại bài tập
                          </button>
                        )
                     )}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};