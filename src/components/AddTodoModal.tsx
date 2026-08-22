import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Hash } from 'lucide-react';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string, category: string) => void;
  categories: string[];
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  categories
}) => {
  const [text, setText] = React.useState('');
  const [category, setCategory] = React.useState(categories[0] || '其他準備');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-[#F5F2ED] rounded-[2.5rem] p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/60 hover:bg-white transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>

            <div className="mb-8">
              <div className="p-3 bg-white/60 rounded-2xl w-fit mb-4">
                <Plus size={24} className="text-gray-900" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">新增備忘項目</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">加入清單</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">項目名稱</label>
                <input
                  autoFocus
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="例如：帶相機電池"
                  className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">類別</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${
                        category === cat 
                          ? 'bg-black text-white' 
                          : 'bg-white text-gray-400 border border-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                確認新增
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
