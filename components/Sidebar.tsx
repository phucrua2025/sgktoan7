import React from 'react';
import { Chapter } from '../types';
import { BookOpen, ChevronRight, Menu, Lock, CheckCircle } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  completedLessons: Record<string, boolean>; // Map of completed lesson IDs
  unlockedLessons: Record<string, boolean>; // Map of unlocked lesson IDs
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  currentLessonId, 
  onSelectLesson,
  isOpen,
  toggleSidebar,
  completedLessons,
  unlockedLessons
}) => {
  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40
        transition-transform duration-300 ease-in-out w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100 bg-primary text-white">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Toán 7 - CTST
          </h1>
          <p className="text-xs text-teal-100 mt-1">Chân Trời Sáng Tạo</p>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 space-y-6 scrollbar-hide">
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {chapter.title}
              </h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson) => {
                  const isLocked = !unlockedLessons[lesson.id];
                  const isCompleted = completedLessons[lesson.id];
                  const isActive = currentLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                          if (!isLocked) {
                            onSelectLesson(lesson.id);
                            if (window.innerWidth < 1024) toggleSidebar();
                          }
                      }}
                      disabled={isLocked}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group
                        ${isActive 
                          ? 'bg-teal-50 text-primary' 
                          : isLocked 
                            ? 'text-slate-400 cursor-not-allowed bg-slate-50'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {isLocked ? (
                          <Lock size={14} className="shrink-0 text-slate-400" />
                        ) : isCompleted ? (
                          <CheckCircle size={14} className="shrink-0 text-emerald-500" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      
                      {isActive && (
                        <ChevronRight size={16} className="text-primary shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};