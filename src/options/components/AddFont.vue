<template>
  <div class="p-4 rounded border">
    <div>
      <b>{{ t('options.selectFont') }}</b>
      <p class="text-sm">
        {{ t('options.selectFontDescription') }}
      </p>
      <input ref="inputRef" type="file" @change="handleFontChange" />
    </div>

    <hr class="my-4" />

    <div>
      <b>{{ t('options.fontName') }}</b>
      <p class="text-sm">
        {{ t('options.fontNameDescription') }}
      </p>
      <input v-model="fontName" class="border" />
    </div>

    <div class="flex justify-end">
      <button
        :disabled="isDisabled"
        class="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
        @click="handleAddFont"
      >
        {{ t('options.addFont') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { type CustomFont } from '~/composables/useCustomFont'

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'addFont', font: CustomFont): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const fontName = ref('')
const fontFile = ref<File | null>(null)

const isDisabled = computed(() => !(fontFile.value && fontName.value))

const handleFontChange = () => {
  if (!inputRef.value?.files?.length) {
    fontName.value = ''
    fontFile.value = null
  } else {
    const file = inputRef.value.files[0]
    const fileName = getFileName(file.name)
    fontName.value = fileName
    fontFile.value = file
  }
}

function getFileName(name: string) {
  return name.split(/\.[0-9a-z]+$/i)[0]
}

async function handleAddFont() {
  if (!fontFile.value) return

  const base64 = await getBase64(fontFile.value)

  emit('addFont', { name: fontName.value, base64 })

  resetSelectedFont()
}

function resetSelectedFont() {
  fontName.value = ''
  fontFile.value = null

  if (inputRef.value) {
    inputRef.value.type = 'text'
    inputRef.value.type = 'file'
  }
}

function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
</script>
