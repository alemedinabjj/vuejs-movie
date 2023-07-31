import { defineStore } from 'pinia'
import tmdbService from '@/services/tmdbService'

interface Movie {
  id: number
  title: string
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [] as Movie[]
  }),

  actions: {
    async fetchMovies() {
      try {
        const response = await tmdbService.get('movie/popular')
        this.movies = response.data.results
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },

    async fetchMoviesWithPagination(page: number) {
      try {
        const response = await tmdbService.get('trending/all/week', {
          params: {
            language: 'pt-BR',
            page: page
          }
        })
        this.movies = response.data.results
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },

    async fetchMovieById(id: number) {
      try {
        const response = await tmdbService.get(`movie/${id}`)
        this.movies = response.data.results
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },

    async fetchMovieBySearch(query: string) {
      try {
        const response = await tmdbService.get(`search/movie`, {
          params: {
            query: query
          }
        })
        this.movies = response.data.results
        console.log(this.movies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
  }
})
