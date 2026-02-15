import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
const useWindowStore = create(immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
        set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            win.isMinimized = false;
            state.nextZIndex++;
        }),

    closeWindow: (windowKey) =>
        set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
            win.isMaximized = false;
            win.isMinimized = false;
        }),

    focusWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
        win.isMinimized = false;
    }),

    toggleMaximize: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isMaximized = !win.isMaximized;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
    }),

    minimizeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        win.isMinimized = true;
    }),

})))

export default useWindowStore;