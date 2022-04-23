<template>
  <footer class="flex flex-col items-center justify-center bg-slate-50 p-5">
    <small class="flex items-center mb-2">
      <span class="text-gray-700">{{ t('popup.designAndDevelopBy') }}</span>
      <MdiHeart class="text-red-500 mx-1" />
      <b class="text-gray-800">{{ t('popup.mostafaAlahyari') }}</b>
    </small>

    <div class="flex gap-2 text-gray-400 text-lg">
      <a
        v-for="link of links"
        :key="link.title"
        :href="link.href"
        :title="link.title"
        target="_blank"
        class="hover:text-gray-500"
      >
        <component :is="link.icon" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MdiHeart from '~icons/mdi/heart'
import MdiGithubBox from '~icons/mdi/github-box'
import MdiTwitterBox from '~icons/mdi/twitter-box'
import MdiLinkedin from '~icons/mdi/linkedin'
import MdiEmailBox from '~icons/mdi/email-box'
import MdiLinkBoxVariant from '~icons/mdi/link-box-variant'

const { t } = useI18n()

const links = [
  {
    title: 'Project',
    icon: MdiLinkBoxVariant,
    href: 'https://mimalef70.github.io/fontara'
  },
  {
    title: 'GitHub',
    icon: MdiGithubBox,
    href: 'https://github.com/mimalef70/fontara'
  },
  {
    title: 'Twitter',
    icon: MdiTwitterBox,
    href: 'https://twitter.com/mimalef70'
  },
  {
    title: 'Linkedin',
    icon: MdiLinkedin,
    href: 'https://www.linkedin.com/in/mostafaalahyari'
  },
  {
    title: 'Email',
    icon: MdiEmailBox,
    href: 'mailto:mostafa.a.aut@gmail.com'
  }
]
</script>
