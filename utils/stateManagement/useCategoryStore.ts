import { create } from 'zustand';

type Category = {
  id: string;
  title: string;
  emoji: string;
};

type CategoryStore = {
  categories: Category[];
  selectedList: Category | null;
  setSelectedList: (list: Category | null) => void;
  addCategory: (title: string, emoji: string) => void;
};

export const useCategoryStore = create<CategoryStore>(set => ({
  categories: [
    { id: '3', title: 'Memory Pad', emoji: '🧠' },
    { id: '4', title: 'Work', emoji: '💼' },
    { id: '5', title: 'Shopping', emoji: '🛒' },
    { id: '6', title: 'Ideas', emoji: '💡' },
    { id: '7', title: 'Personal', emoji: '👤' },
    { id: '8', title: 'Travel', emoji: '✈️' },
  ],
  selectedList: null,
  setSelectedList: list => set({ selectedList: list }),
  addCategory: (title, emoji) =>
    set(state => ({
      categories: [
        ...state.categories,
        { id: Date.now().toString(), title, emoji },
      ],
    })),
}));
