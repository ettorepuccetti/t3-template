import { type StateCreator } from "zustand";
import { type Store } from "./storeCreator";

// about zustand slice pattern (for merging stores): https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

export interface TestStore {
  setSetTaskNextIndex: (stub: (taskNextIndex: number) => void) => void;
}

export const storeCreator: StateCreator<
  Store & TestStore,
  [],
  [],
  TestStore
> = (set) => ({
  setSetTaskNextIndex: (stub) => set({ setTaskNextIndex: stub }),
});
