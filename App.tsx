import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { ChatWidget } from './components/ChatWidget';
import { textbookData } from './data';
import { Lesson, LessonProgress } from './types';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  // Flatten lessons for easier navigation and index finding
  const allLessons = useMemo(() => {
    return textbookData.flatMap(chapter => chapter.lessons);
  }, []);

  // State for current lesson
  const [currentLessonId, setCurrentLessonId] = useState<string>(allLessons[0].id);

  // State for User Progress
  // Structure: { [lessonId]: true/false } for completion
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [unlockedLessons, setUnlockedLessons] = useState<Record<string, boolean>>({
    [allLessons[0].id]: true // First lesson always unlocked
  });

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('math7_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedLessons(parsed.completed || {});
        
        // Re-calculate unlocked based on completed
        const initialUnlocked: Record<string, boolean> = { [allLessons[0].id]: true };
        allLessons.forEach((lesson, index) => {
          if (index > 0) {
             const prevLessonId = allLessons[index - 1].id;
             if (parsed.completed?.[prevLessonId]) {
               initialUnlocked[lesson.id] = true;
             }
          }
        });
        setUnlockedLessons(initialUnlocked);

      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
  }, [allLessons]);

  // Save progress helper
  const saveProgress = (newCompleted: Record<string, boolean>) => {
    setCompletedLessons(newCompleted);
    localStorage.setItem('math7_progress', JSON.stringify({ completed: newCompleted }));
    
    // Update unlocked status immediately
    const newUnlocked = { ...unlockedLessons };
    allLessons.forEach((lesson, index) => {
       if (index < allLessons.length - 1) {
         // If current lesson is completed, unlock next
         if (newCompleted[lesson.id]) {
           newUnlocked[allLessons[index+1].id] = true;
         }
       }
    });
    setUnlockedLessons(newUnlocked);
  };

  const handleLessonComplete = (score: number) => {
    if (score >= 80) {
      const newCompleted = { ...completedLessons, [currentLessonId]: true };
      saveProgress(newCompleted);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      const nextId = allLessons[currentIndex + 1].id;
      // Ensure it's unlocked (should be handled by saveProgress, but double check)
      if (unlockedLessons[nextId]) {
        setCurrentLessonId(nextId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Calculate next lesson ID for the UI button
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const nextLessonId = (currentIndex >= 0 && currentIndex < allLessons.length - 1) 
    ? allLessons[currentIndex + 1].id 
    : null;

  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Navigation - Left */}
      <Sidebar 
        chapters={textbookData}
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        completedLessons={completedLessons}
        unlockedLessons={unlockedLessons}
      />

      {/* Main Content Area - Center */}
      <main className="flex-1 flex flex-col relative w-full lg:ml-72 transition-all duration-300 lg:mr-[350px]">
        {/* Mobile Header Spacer */}
        <div className="h-16 lg:hidden" /> 

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <LessonView 
            lesson={currentLesson} 
            onComplete={handleLessonComplete}
            nextLessonId={nextLessonId}
            onNextLesson={handleNextLesson}
            isCompleted={!!completedLessons[currentLessonId]}
          />
          
          {/* Footer / Copyright */}
          <div className="p-6 text-center text-slate-400 text-sm pb-24 lg:pb-6">
            © 2024 Toán 7 - Chân Trời Sáng Tạo
          </div>
        </div>

        {/* Mobile Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      </main>

      {/* Chat Widget - Right Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-full sm:w-[350px] z-50 lg:z-0
        ${chatOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <ChatWidget 
          currentLesson={currentLesson} 
          isOpen={chatOpen || window.innerWidth >= 1024}
          onClose={() => setChatOpen(false)}
        />
      </aside>

      {/* Overlay for mobile chat */}
      {chatOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default App;