<template>
  <main class="bg-white max-w-2xl p-5 mx-2 rounded shadow-md">
    <div class="text-center bg-slate-100 p-5">
      <h1 class="text-xl font-bold mb-2">{{ t('options.addCustomFont') }}</h1>
      <p>{{ t('options.addCustomFontDescription') }}</p>
    </div>

    <AddFont @add-font="addFont" />
    <CustomFonts v-if="fonts.length" :fonts="fonts" @removeFont="removeFont" />
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCustomFont } from '~/composables/useCustomFont'

import CustomFonts from './components/CustomFonts.vue'
import AddFont from './components/AddFont.vue'

const { t } = useI18n()

const { fonts, addFont, removeFont } = useCustomFont()
</script>
