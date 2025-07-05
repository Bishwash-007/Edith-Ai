import { create } from "zustand";

type DrawerState = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useDrawerStore = create<DrawerState>((set: (partial: Partial<DrawerState> | ((state: DrawerState) => Partial<DrawerState>)) => void) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  toggleDrawer: () => set((state: DrawerState) => ({ isOpen: !state.isOpen })),
}));
