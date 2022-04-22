<template>
  <main class="w-80 px-5 pt-5">
    <FontSelector />
    <button
      class="bg-blue-100 w-full py-2 rounded-sm my-3 text-blue-600 font-bold"
      @click="runtime.openOptionsPage()"
    >
      افزودن فونت دلخواه
    </button>
    <Sites />
    <a
      href="#"
      class="block text-center bg-rose-600 w-full py-2 rounded-sm my-4 text-white font-bold"
    >
      در صورت تمایل از فونت‌آرا حمایت کنید.
    </a>
  </main>
</template>

<script setup lang="ts">
import { runtime } from 'webextension-polyfill'

import FontSelector from './components/FontSelector.vue'
import Sites from './components/Sites.vue'
</script>
