import { create } from 'zustand';
import { Game } from '@prisma/client';

type SortOrder = 'asc' | 'desc';

interface SortingStoreState {
  games: Game[]
  sortedGames: Game[]
  sortDataByPrice: (order: SortOrder) => void;
  sortDataByDate: (order: SortOrder) => void;
  setGames: (games: Game[]) => void
}

const useSortingStore = create<SortingStoreState>((set) => ({
  games: [],
  sortedGames: [],
  
  sortDataByPrice: (order) => {
    set((state) => {
      const sortedGames = [...state.games]
      sortedGames.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      return { sortedGames };
    });
  },

  sortDataByDate: (order) => {
    set((state) => {
      const sortedGames = [...state.games]
      sortedGames.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (order === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
      return { sortedGames };
    });
  },

  setGames: (games) => {
    set({ games });
  },

}));

export default useSortingStore;