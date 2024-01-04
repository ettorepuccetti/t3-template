import { type StateCreator } from "zustand";
import {
  type useAddTask,
  type useDeleteTask,
  type useTaskQuery,
} from "./trpcHooks";

export interface Store {
  taskNextIndex: number;
  setTaskNextIndex: (taskNextIndex: number) => void;

  //trpc mutations and queries
  taskQuery: ReturnType<typeof useTaskQuery> | undefined;
  setTaskQuery: (taskQuery: ReturnType<typeof useTaskQuery>) => void;
  addTask: ReturnType<typeof useAddTask> | undefined;
  setAddTask: (addTask: ReturnType<typeof useAddTask>) => void;
  deleteTask: ReturnType<typeof useDeleteTask> | undefined;
  setDeleteTask: (deleteTask: ReturnType<typeof useDeleteTask>) => void;
}

export const storeCreator: StateCreator<Store, [], [], Store> = (set) => ({
  taskNextIndex: 1,
  setTaskNextIndex: (taskNextIndex) => set({ taskNextIndex }),

  //trpc mutations and queries
  taskQuery: undefined,
  setTaskQuery: (taskQuery) => set({ taskQuery }),
  addTask: undefined,
  setAddTask: (addTask) => set({ addTask }),
  deleteTask: undefined,
  setDeleteTask: (deleteTask) => set({ deleteTask }),
});
