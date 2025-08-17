import { Song } from "@/lib/api";
import { create } from "zustand";


export const useSongStore = create((set) => ({
    currentTime: 0,
    setCurrentTime: (time: number) => set({ currentTime: time }),
    currentSong: null,
    setCurrentSong: (song: Song) => set({ currentSong: song }),
    playing: false,
    togglePlaying: () => set((state: any) => ({ playing: !state.playing }))
}))