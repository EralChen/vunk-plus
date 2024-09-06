<template>
  <div class="layout">
    <Sidebar>
      <Logo />
      <Link :href="base + '/'">
        Welcome
      </Link>

      <Link :href="base + '/star-wars'">
        Data Fetching
      </Link>
    </Sidebar>
    <Content><slot /></Content>
  </div>
</template>

<script lang="ts" setup>
import Content from '../components/Content.vue'
import Link from '../components/Link.vue'
import Logo from '../components/Logo.vue'
import Sidebar from '../components/Sidebar.vue'
const base = import.meta.env.VITE_BASE_URL ?? ''
</script>

<style>
  body {
    margin: 0;
    font-family: sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
</style>

<style scoped>
  .layout {
    display: flex;
    max-width: 900px;
    margin: auto;
  }
  .content {
    padding: 20px;
    padding-bottom: 50px;
    min-height: 100vh;
    flex-grow: 1;
  }
  /* Page Transition Animation */
  #page-content {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  body.page-is-transitioning #page-content {
    opacity: 0;
  }
</style>
