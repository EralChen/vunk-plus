<template>
  <h1>Star Wars Movies</h1>
  <ol>
    <li v-for="item in movies" :key="item.id">
      <a :href="base + '/star-wars/' + item.id">{{ item.title }}</a> ({{ item.release_date }})
    </li>
  </ol>
  <p>Source: <a href="https://brillout.github.io/star-wars">brillout.github.io/star-wars</a>.</p>
</template>

<script lang="ts" setup>
import { useData } from 'vike-vue/useData'
import type { Data } from './+data.js'
const base = import.meta.env.VITE_BASE_URL ?? ''
const { movies } = useData<Data>()

</script>
