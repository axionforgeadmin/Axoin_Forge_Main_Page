import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  program: null,
  open: (program = null) => set({ isOpen: true, program }),
  close: () => set({ isOpen: false, program: null }),
}))
