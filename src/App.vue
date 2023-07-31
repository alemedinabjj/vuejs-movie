<script setup lang="ts">
import MovieList from './components/MovieList.vue'
import DashboardPopulares from './components/DashboardPopulares.vue'
import MoviesFavorites from './components/MoviesFavorites.vue'
</script>

<template>
  <div
    class="max-w-[1900px] mx-auto px-5 grid grid-cols-[1fr_minmax(0px,_4fr)_1fr] w-full items-start justify-center place-content-center place-items-center"
  >
    <DashboardPopulares />
    <MovieList />
    <div class="h-full">
      <MoviesFavorites />
    </div>
  </div>
</template>
