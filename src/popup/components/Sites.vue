<template>
  <div class="flex flex-wrap justify-center gap-3 my-2">
    <button
      v-for="(site, index) of [
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData,
        ...sitesData
      ]"
      @click="toggleActiveStatus(site.name)"
      :key="index"
      :title="site.displayName"
      :class="{ 'shadow-site hover:shadow-site-md': site.isActive }"
      class="rounded-[3px] transition-shadow"
    >
      <img
        :src="site.logo"
        :alt="site.name"
        :class="{ 'grayscale brightness-150': !site.isActive }"
        class="w-[46px] transition"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSitesActiveStatus } from '~/composables/useSitesActiveStatus'

const { data: sitesData, toggleActiveStatus } = useSitesActiveStatus()
</script>
