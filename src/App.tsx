/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, BarChart3 } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { TodoSection } from './components/TodoSection';
import { AddTodoModal } from './components/AddTodoModal';
import { StatsModal } from './components/StatsModal';
import { IOSInstallPrompt } from './components/IOSInstallPrompt';
import { INITIAL_TODOS, ITINERARY_DATA } from './data';
import { TodoItem } from './types';

export default function App() {
  const [todos, setTodos] = React.useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('shikoku_packing_v3');
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });

  const [isAddTodoOpen, setIsAddTodoOpen] = React.useState(false);
  const [isStatsOpen, setIsStatsOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('shikoku_packing_v3', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const addTodo = (text: string, category: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      category,
      completed: false
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const categories = Array.from(new Set(todos.map(t => t.category)));

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C1C1E] font-sans selection:bg-[#FF5E3A]/20 relative overflow-hidden">
      {/* iOS Background Glow Orbs for Glassmorphism depth */}
      <div className="fixed top-[10%] left-[-5%] w-[40%] h-[40%] bg-[#FF5E3A]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="fixed top-[40%] right-[-10%] w-[50%] h-[40%] bg-[#007AFF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[20%] w-[30%] h-[30%] bg-[#34C759]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[5%] w-[40%] h-[40%] bg-[#AF52DE]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-screen flex flex-col p-6 md:p-12 relative z-10 pt-safe pb-safe">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF5E3A] mb-2">Travel Assistant</p>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none text-[#1C1C1E]">
              四國冒險之旅 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E3A] to-[#FFCC00]">2026</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAddTodoOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5E3A] shadow-lg shadow-[#FF5E3A]/20 transition-all hover:brightness-110 hover:scale-105 active:scale-95"
            >
              <Plus size={20} className="text-white" />
            </button>
            <button 
              onClick={() => setIsStatsOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-white/50 transition-all hover:bg-white/80 hover:scale-105 active:scale-95"
            >
              <BarChart3 size={20} className="text-[#1C1C1E]" />
            </button>
          </div>
        </header>

        <main className="flex-grow">
          <HeroSection />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            <div className="lg:col-span-8">
              <ItineraryTimeline />
            </div>
            <div className="lg:col-span-4">
              <TodoSection todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
          </div>
        </main>

        <AddTodoModal 
          isOpen={isAddTodoOpen} 
          onClose={() => setIsAddTodoOpen(false)} 
          onAdd={addTodo}
          categories={categories}
        />
        
        <StatsModal 
          isOpen={isStatsOpen} 
          onClose={() => setIsStatsOpen(false)} 
          todos={todos}
          itinerary={ITINERARY_DATA}
        />

        <IOSInstallPrompt />

        {/* Dynamic Navigation Indicator (iOS Style) */}
        <div className="h-16 flex justify-center items-end pb-2 opacity-20">
          <div className="w-32 h-1.5 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}
