
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import MovieItem from '@/components/MovieItem.vue';
import type { Movie } from './DashboardPopulares.vue';
import { useFavoritesStore } from '@/stores/favorites';

export default defineComponent({
  components: {
    MovieItem,
  },
  setup() {
    const moviesStore = useMoviesStore();
    const movies = ref<Movie[]>([]);
    const currentPage = ref(1);
    const observeElement = ref<HTMLElement | null>(null); 

    const favoritesStore = useFavoritesStore();

    const isFavorite = (movie: Movie) => {
      return favoritesStore.favorites.some((favMovie: Movie) => favMovie.id === movie.id);
    };

    const toggleFavorite = (movie: Movie) => {
      if (isFavorite(movie)) {
       return favoritesStore.removeFromFavorites(movie);
      } 

      favoritesStore.addToFavorites(movie);
    };

    const fetchNextPage = async () => {
      await moviesStore.fetchMoviesWithPagination(currentPage.value);
      movies.value = [...movies.value, ...moviesStore.movies]; 
      currentPage.value++; 
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, 
      }
    );

    onMounted(() => {
      if (observeElement.value) {
        intersectionObserver.observe(observeElement.value);
        fetchNextPage(); 
      }
    });

    const addToFavorites = (movie: Movie) => {
      favoritesStore.addToFavorites(movie);
    };

    return {
      movies,
      observeElement,
      addToFavorites,
      isFavorite,
      toggleFavorite,
    };
  },
});
</script>

<template>
  <div class='w-full items-center flex justify-start flex-col'>
  <div
    class='p-4'
  >
    <h1
      class='text-2xl font-bold text-center'
    >
    Timeline
  </h1>
  </div>
    <ul
      class='flex flex-wrap md:gap-3 items-start justify-center'
    >
      <MovieItem 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie" 
      />
      <div ref="observeElement"></div>
    </ul>
  </div>
</template>



