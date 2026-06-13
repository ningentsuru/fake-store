<script setup lang="ts">
import { TITLE, DESCRIPTION } from '@/constants'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UPage>
    <LayoutsHeader />

    <UMain>
      <NuxtPage />
    </UMain>
    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <LayoutsFooter />
  </UPage>
</template>
