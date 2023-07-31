<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieItem from '@/components/MovieItem.vue'
import type { Movie } from './DashboardPopulares.vue'
import { useFavoritesStore } from '@/stores/favorites'

export default defineComponent({
  components: {
    MovieItem
  },
  setup() {
    const moviesStore = useMoviesStore()
    const movies = ref<Movie[]>([])
    const currentPage = ref(1)
    const observeElement = ref<HTMLElement | null>(null)

    const favoritesStore = useFavoritesStore()

    const isFavorite = (movie: Movie) => {
      return favoritesStore.favorites.some((favMovie: Movie) => favMovie.id === movie.id)
    }

    const toggleFavorite = (movie: Movie) => {
      if (isFavorite(movie)) {
        return favoritesStore.removeFromFavorites(movie)
      }

      favoritesStore.addToFavorites(movie)
    }

    const fetchNextPage = async () => {
      await moviesStore.fetchMoviesWithPagination(currentPage.value)
      movies.value = [...movies.value, ...moviesStore.movies]
      currentPage.value++
    }

    const searchMovie = async (e: any) => {
      e.preventDefault()
      const search = e.target.search.value
      await moviesStore.fetchMovieBySearch(search)

      movies.value = [...moviesStore.movies]
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    onMounted(() => {
      if (observeElement.value) {
        intersectionObserver.observe(observeElement.value)
        fetchNextPage()
      }
    })

    const addToFavorites = (movie: Movie) => {
      favoritesStore.addToFavorites(movie)
    }

    return {
      movies,
      observeElement,
      addToFavorites,
      isFavorite,
      toggleFavorite,
      searchMovie
    }
  }
})
</script>

<template>
  <div class="w-full items-center flex justify-start flex-col">
    <div class="p-4">
      <h1 class="text-2xl font-bold text-center">Timeline</h1>
    </div>
    <form @submit="searchMovie">
      <div class="flex mb-5">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          Search
        </button>
        <div class="relative w-full">
          <input
            type="search"
            id="search"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="movies, series.."
            required
          />
          <button
            type="submit"
            class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
    <ul class="flex flex-wrap gap-2 md:gap-3 items-start justify-center">
      <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
      <div ref="observeElement"></div>
    </ul>
  </div>
</template>
