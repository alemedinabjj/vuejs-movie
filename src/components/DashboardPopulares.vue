<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'

export interface Movie {
  id: number
  title: string
}

export default defineComponent({
  setup() {
    const moviesStore = useMoviesStore()
    const movies = ref<Movie[]>([])

    onMounted(async () => {
      await moviesStore.fetchMovies()
      movies.value = moviesStore.movies
    })

    return {
      movies
    }
  }
})
</script>

<template>
  <div class="sidebar sticky">
    <div
      class="w-full bg-gray-900 py-2 rounded-md flex items-center justify-center mb-2 sticky top-0"
    >
      <h1>Mais populares</h1>
    </div>
    <ul class="flex flex-col gap-2 overflow-auto">
      <li
        v-for="movie in movies"
        :key="movie.id"
        class="hover:underline hover:text-gray-500 cursor-pointer"
      >
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>
