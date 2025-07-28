import { create } from 'zustand';

export type Subtask = {
  task_name: string;
  completed: boolean;
};

export type Task = {
  id: string;
  task_name: string;
  task_note: string;
  datetime: string | null;
  recurrence: 'Daily' | 'Weekly' | 'Monthly' | null;
  category: string;
  completed: boolean;
  notify: boolean;
  subtasks: Subtask[];
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  tasks: [],
  addTask: task =>
    set(state => ({
      tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
    })),
}));
