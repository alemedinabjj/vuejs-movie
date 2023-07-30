<script setup lang="ts">
import MovieList from './components/MovieList.vue';
import DashboardPopulares from './components/DashboardPopulares.vue';
import MoviesFavorites from './components/MoviesFavorites.vue';

</script>

<template>
  <div class='w-full mx-auto flex items-start px-10'>
    <DashboardPopulares />
    <MovieList />
    <MoviesFavorites />
  </div>
</template>
