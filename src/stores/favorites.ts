import { defineStore } from 'pinia';

interface Movie {
  id: number;
  title: string;
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [],
  }),
  actions: {
    addToFavorites(movie: Movie) {
      const favoriteExists = this.favorites.find((fav: Movie) => fav.id === movie.id);

      if (!favoriteExists) {
        this.favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }

    },
    removeFromFavorites(movie: Movie) {
      const index = this.favorites.findIndex((fav: Movie) => fav.id === movie.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    },
  },
});
