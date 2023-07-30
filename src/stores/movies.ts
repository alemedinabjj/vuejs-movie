import {  defineStore } from 'pinia';
import tmdbService from '@/services/tmdbService';

 interface Movie {
  id: number;
  title: string;
}


export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [] as Movie[],
  }),

  actions: {
    async fetchMovies() {
      try {
        const response = await tmdbService.get('movie/popular');
        this.movies = response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },

    async fetchMoviesWithPagination(page: number) {
      try {
        const response = await tmdbService.get('trending/all/week', {
          params: {
            language: 'pt-BR',
            page: page,
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },

    async fetchMovieById(id: number) {
      try {
        const response = await tmdbService.get(`movie/${id}`);
        this.movies = response.data.results;
      }
      catch (error) {
        console.error('Error fetching movies:', error);
      }
    },

    //getCast imagem


      //https://image.tmdb.org/t/p/w500/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg

  },

  
});
