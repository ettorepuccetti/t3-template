// from: https://github.com/pmndrs/zustand/blob/main/docs/guides/testing.md

import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import { createStore, type StoreApi } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { storeCreator, type Store } from "./storeCreator";

type MergedStores = Store;

const createMergedStore = () => {
  return createStore<MergedStores>()((...a) => ({
    ...storeCreator(...a),
  }));
};

const MergedStoreContext = createContext<StoreApi<MergedStores>>(null as never);

export type MergedStoreProviderProps = PropsWithChildren<Partial<MergedStores>>;

export const MergedStoreProvider = ({ children }: MergedStoreProviderProps) => {
  const StoreRef = useRef(createMergedStore());
  return (
    <MergedStoreContext.Provider value={StoreRef.current}>
      {children}
    </MergedStoreContext.Provider>
  );
};

export type UseMergedStoreContextSelector<T> = (store: MergedStores) => T;

export const useMergedStoreContext = <T,>(
  selector: UseMergedStoreContextSelector<T>,
): T => {
  const StoreContext = useContext(MergedStoreContext);
  if (!StoreContext) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return useStoreWithEqualityFn(StoreContext, selector, shallow);
};
