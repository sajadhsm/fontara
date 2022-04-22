<template>
  <b>{{ t('options.savedFonts') }}</b>
  <ul class="max-h-40 overflow-y-auto">
    <li
      v-for="font of fonts"
      :key="font.name"
      class="flex justify-between border-b last:border-0 p-2"
    >
      {{ font.name }}
      <button @click="emit('removeFont', font.name)">
        {{ t('options.remove') }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  fonts: CustomFont[]
}>()

const emit = defineEmits<{
  (e: 'removeFont', fontName: string): void
}>()
</script>
