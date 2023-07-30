<template>
  <article 
    class="relative flex items-start space-x-6 p-6 max-w-[370px] md:max-w-[400px] w-full hover:shadow-lg transition bg-gray-800 rounded-md
      group
      min-h-[160px]
    "
  >
  <div class='
    -bottom-16 opacity-0
    group-hover:opacity-100
    group-hover:bottom-0
    right-0
    flex
    absolute  items-end justify-center w-full px-5
    bg-gradient-to-t from-gray-900 to-transparent h-full rounded-b-md
    transition
  '>
   <div className='flex items-center justify-center gap-5 mb-2 relative z-50'>
    <button
      class="bg-slate-100 text-gray-800 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-200"
      @click="toggleFavorite(movie as Movie)"
    >
    {{ isFavorite(movie as Movie) ? 'Remove from favorites' : 'Add to favorites' }}
  </button>
    <button
      class="bg-slate-100 text-gray-800 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-200"
    >
    more details
  </button>
   </div>
  </div>
    <img
     :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      alt="" 
      width="60" 
      height="88" 
      class="flex-none rounded-md bg-slate-100" 
    />
    <div class="min-w-0 relative flex-auto">
      <h2 class="font-semibold text-slate-100 truncate pr-20">{{ movie.title ?? movie.name }}</h2>
      <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
        <div class="absolute top-0 right-0 flex items-center space-x-1">
          <dt class="text-sky-500">
            <span class="sr-only">Star rating</span>
            <svg width="16" height="20" fill="currentColor">
              <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
            </svg>
          </dt>
          <dd>{{ parseFloat(movie.vote_average).toFixed(2) }}</dd>
        </div>
        <div>
          <dt class="sr-only">Rating</dt>
          <dd class="px-1.5 ring-1 ring-slate-200 rounded">{{ movie.vote_count }}</dd>
        </div>
        <div class="ml-2">
          <dt class="sr-only">Year</dt>
          <dd>{{ movie.release_date ?? movie.first_air_date }}</dd>
        </div>
        <div>
          <dt class="sr-only">Genre</dt>
          <dd class="flex items-center">
            <svg width="2" height="2" fill="currentColor" class="mx-2 text-slate-300" aria-hidden="true">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <!-- {{ movie.genre }} -->
            Action
          </dd>
        </div>
        <div>
          <dt class="sr-only">Runtime</dt>
          <dd class="flex items-center">
            <svg width="2" height="2" fill="currentColor" class="mx-2 text-slate-300" aria-hidden="true">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <!-- {{ movie.runtime }} -->
            120 min
          </dd>
        </div>
        <div class="flex-none w-full mt-2 font-normal text-clip overflow-hidden truncate">
          <dt class="sr-only">Cast</dt>
          <dd class="text-slate-400 ">{{ movie.original_title ?? movie.original_name }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<script lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { defineComponent } from 'vue';

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  first_air_date: string;
  original_title: string;
  original_name: string;
  genre: string;
}

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const favoritesStore = useFavoritesStore();

    const isFavorite = (movie: Movie) => {
      return favoritesStore.favorites.some((favMovie: Movie) => favMovie.id === movie.id);
    };

    const toggleFavorite = (movie: Movie) => {
      if (isFavorite(movie)) {
        favoritesStore.removeFromFavorites(movie);
      } else {
        favoritesStore.addToFavorites(movie);
      }
    };

    return {
      isFavorite,
      toggleFavorite,
    };
  },
});
</script>