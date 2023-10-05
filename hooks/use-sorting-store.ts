import { create } from 'zustand';
import { Game } from '@prisma/client';

type SortOrder = 'asc' | 'desc';

interface SortingStoreState {
  games: Game[]
  sortedGames: Game[]
  sortDataByPrice: (order: SortOrder) => void;
  sortDataByDate: (order: SortOrder) => void;
  setGames: (games: Game[]) => void
  resetSorting: () => void;
}

const useSortingStore = create<SortingStoreState>((set) => ({
  games: [],
  sortedGames: [],
  
  sortDataByPrice: (order) => {
    set((state) => {
      const sortedGames = [...state.games]
      sortedGames.sort((a, b) => {
        const discA = a.discount ? a.price - (a.price * a.discount / 100) : a.price
        const discB = b.discount ? b.price - (b.price * b.discount / 100) : b.price
        if (order === 'asc') {
          return discA  - discB;
        } else {
          return discB - discA;
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

  resetSorting: () => {
    set((state) => {
      return { sortedGames: [...state.games] };
    });
  },

}));

export default useSortingStore;