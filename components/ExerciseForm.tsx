import React from 'react';
import { Subject, GradeLevel, Difficulty, QuestionType, ExerciseConfig } from '../types';
import { BookOpen, GraduationCap, Layers, BrainCircuit, FileText, Settings } from 'lucide-react';

interface ExerciseFormProps {
  config: ExerciseConfig;
  onChange: (newConfig: ExerciseConfig) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({ config, onChange, onSubmit, isLoading }) => {
  
  const handleChange = (field: keyof ExerciseConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-6 text-indigo-700">
        <Settings className="w-6 h-6" />
        <h2 className="text-xl font-bold">Cấu hình bài tập</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Subject */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <BookOpen className="w-4 h-4 text-slate-500" /> Môn học
          </label>
          <select
            value={config.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            {Object.values(Subject).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <GraduationCap className="w-4 h-4 text-slate-500" /> Khối lớp
          </label>
          <select
            value={config.grade}
            onChange={(e) => handleChange('grade', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            {Object.values(GradeLevel).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Topic - Spans full width */}
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Layers className="w-4 h-4 text-slate-500" /> Chủ đề / Bài học
          </label>
          <input
            type="text"
            value={config.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="Ví dụ: Phương trình bậc hai, Truyện Kiều, Thì hiện tại đơn..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <BrainCircuit className="w-4 h-4 text-slate-500" /> Độ khó
          </label>
          <select
            value={config.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            {Object.values(Difficulty).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Question Type */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText className="w-4 h-4 text-slate-500" /> Loại câu hỏi
          </label>
          <select
            value={config.questionType}
            onChange={(e) => handleChange('questionType', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            {Object.values(QuestionType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Count */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            Số lượng câu hỏi (1-20)
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={config.count}
            onChange={(e) => handleChange('count', parseInt(e.target.value) || 5)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onSubmit}
          disabled={isLoading || !config.topic.trim()}
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-md transition-all duration-300 flex justify-center items-center gap-2
            ${isLoading || !config.topic.trim()
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tạo nội dung...
            </>
          ) : (
            'Tạo Bài Tập Ngay'
          )}
        </button>
      </div>
    </div>
  );
};