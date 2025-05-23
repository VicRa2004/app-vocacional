import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UrlStore {
  programUrl: string;
  setProgramUrl: (url: string) => void;
  getProgramUrl: () => string;
  clearProgramUrl: () => void;
}

const useUrlStore = create<UrlStore>()(
  persist(
    (set, get) => ({
      programUrl: "",

      setProgramUrl: (ip) => set({ programUrl: `http://${ip}:3000` }),

      getProgramUrl: () => get().programUrl,

      clearProgramUrl: () => set({ programUrl: "" }),
    }),
    {
      name: "program-url-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUrlStore;
