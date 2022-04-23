<template>
  <select
    v-model="selectedFont"
    class="w-full bg-white shadow-select hover:shadow-select-md rounded-[3px] px-4 py-2 outline-none"
  >
    <optgroup
      v-for="(group, groupIndex) of fontGroups"
      :key="groupIndex"
      :label="group.name"
    >
      <option
        v-for="(font, fontIndex) of group.fonts"
        :key="fontIndex"
        :value="font.value"
      >
        {{ font.label }}
      </option>
    </optgroup>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useSelectedFont } from '~/composables/useSelectedFont'
import { useCustomFont } from '~/composables/useCustomFont'

import staticFonts from '~/popup/data/fontGroups.json'

const selectedFont = useSelectedFont()
const { fonts } = useCustomFont()

const fontGroups = computed(() => {
  const allFonts = [...staticFonts]

  if (fonts.value.length) {
    allFonts.push({
      name: 'فونت‌های دلخواه',
      link: '',
      fonts: fonts.value.map(({ name }) => ({
        label: name,
        value: name
      }))
    })
  }

  return allFonts
})
</script>
