<template>
  <div>
    <ul>
      <li v-for="(site, index) of sitesData" :key="index">
        <button @click="toggleActiveStatus(site.name)">
          <img :src="site.logo" :alt="site.name" />
          {{ site.name }}: {{ site.isActive }}
        </button>
      </li>
    </ul>

    {{ sitesData.length }}
  </div>
</template>

<script setup lang="ts">
import { useSitesActiveStatus } from '~/composables/useSitesActiveStatus'

const { data: sitesData, toggleActiveStatus } = useSitesActiveStatus()
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
