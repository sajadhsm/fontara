<template>
  <select v-model="selectedFont">
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
