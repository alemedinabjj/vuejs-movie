<script lang="ts">
import { defineComponent } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

interface Movie {
  id: number;
  title: string;
}

export default defineComponent({
    setup(props) {
        const favoritesStore = useFavoritesStore();
        const isFavorite = (movie: Movie) => {
            return favoritesStore.favorites.some((favMovie: Movie) => favMovie.id === movie.id);
        };
        const movies = favoritesStore.favorites;
        return {
            isFavorite,
            movies,
        };
    },
  
});
</script>

<template>
  <div
    class="sidebar sticky"
  >
  <div class="w-full bg-gray-900 py-2 rounded-md flex items-center justify-center mb-2 sticky top-0">
    <h1>Favorites</h1>
  </div>

    <ul
      class="flex flex-col gap-2 overflow-auto self-start"
    >
      <li
        v-for="movie in movies"
        :key="movie.id"
        class="hover:underline hover:text-gray-500 cursor-pointer animate-fade-in transition-all"
      >
        {{ movie.title }}
      </li>
    </ul>

  </div>
</template>