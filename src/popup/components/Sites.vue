<template>
  <ul>
    <li v-for="site of injectsData" :key="site.name">
      <img :src="site.logo" :alt="site.name" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import injectsData from '~/contentScripts/injectsData'
</script>

<style scoped>
/* Temporary styling */
ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 7px;
}

li img {
  max-width: 50px;
}
</style>
