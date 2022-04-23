<template>
  <div class="w-80">
    <main class="px-5 pt-5">
      <FontSelector />

      <button
        :class="[
          'flex justify-center items-center w-full py-2 my-3',
          'bg-blue-50 hover:bg-blue-100 text-blue-600',
          'text-sm font-bold rounded-sm transition-colors'
        ]"
        @click="runtime.openOptionsPage()"
      >
        <MdiPlusCircleOutline class="mx-1" />
        <span class="mx-1">{{ t('common.addCustomFont') }}</span>
      </button>

      <Sites />

      <a
        href="https://idpay.ir/mimalef70"
        target="_blank"
        :class="[
          'block text-sm text-center w-full py-2 my-4 rounded-sm',
          'bg-rose-600 hover:bg-rose-500 transition-colors text-white font-bold'
        ]"
      >
        {{ t('popup.supportFontARA') }}
      </a>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { runtime } from 'webextension-polyfill'

import MdiPlusCircleOutline from '~icons/mdi/plus-circle-outline'

import FontSelector from './components/FontSelector.vue'
import Footer from './components/Footer.vue'
import Sites from './components/Sites.vue'

const { t } = useI18n()
</script>
