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
import fontGroups from '~/popup/data/fontGroups.json'
import { useSelectedFont } from '~/composables/useSelectedFont'

const selectedFont = useSelectedFont()
</script>
