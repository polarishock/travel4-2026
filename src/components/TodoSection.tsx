import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { INITIAL_TODOS } from '../data';
import { TodoItem } from '../types';

interface TodoSectionProps {
  todos: TodoItem[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoSection: React.FC<TodoSectionProps> = ({ todos, toggleTodo, deleteTodo }) => {
  const completedCount = todos.filter(t => t.completed).length;
  const progress = Math.round((completedCount / (todos.length || 1)) * 100);

  const categories = Array.from(new Set(todos.map(t => t.category)));

  return (
    <div className="h-full">
      <GlassCard 
        className="p-8 h-full flex flex-col shadow-lg shadow-black/5 border-white/50 rounded-[32px]" 
        bgColor="bg-white/60"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#1C1C1E]">
            行李備忘錄 <span className="text-[#FF5E3A]">.</span>
          </h2>
          <span className="text-sm font-bold text-[#1C1C1E]/30">{completedCount}/{todos.length}</span>
        </div>

        <div className="mb-8 h-2.5 w-full overflow-hidden rounded-full bg-black/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#FFCC00] shadow-[0_0_12px_rgba(255,204,0,0.3)]"
          />
        </div>

        <div className="flex flex-col gap-8 overflow-y-auto no-scrollbar max-h-[500px] pr-2">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-[10px] font-black text-[#1C1C1E]/30 uppercase tracking-[0.25em] mb-2">{category}</h3>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {todos.filter(t => t.category === category).map((todo) => (
                    <motion.div
                      layout
                      key={todo.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex items-center justify-between"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="flex-1 flex items-center gap-4 text-left"
                      >
                        <div className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center transition-all border-2 ${
                          todo.completed 
                            ? 'bg-[#007AFF] border-[#007AFF] text-white shadow-md shadow-[#007AFF]/20' 
                            : 'border-black/5 bg-white shadow-sm'
                        }`}>
                          {todo.completed && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-bold tracking-tight transition-all ${
                          todo.completed ? 'text-[#1C1C1E]/20 line-through decoration-[#1C1C1E]/20' : 'text-[#1C1C1E]'
                        }`}>
                          {todo.text}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-[#1C1C1E]/20 hover:text-[#FF3B30] transition-all rounded-full hover:bg-[#FF3B30]/5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl bg-white/40 p-5 border border-white/50">
             <p className="text-[10px] font-black uppercase text-[#FF5E3A] tracking-[0.2em] mb-2">Pro Tip</p>
             <p className="text-xs leading-relaxed font-bold text-[#1C1C1E]/60">路面電車僅接受 IC 卡或現金，請務必由後門上車。</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
