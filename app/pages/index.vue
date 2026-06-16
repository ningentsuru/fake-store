<script setup lang="ts">
const { loggedIn, user } = useUserSession()

const headlineText = computed(() =>
  loggedIn.value ? `Hi, ${user.value?.display_name}` : 'Personal Project'
)

</script>

<template>
  <UPage>
    <UPageHero
      :headline="headlineText"
      title="Fake Store"
      description="Your Online Store Simulations"
    />
    <ItemLists />
  </UPage>
</template>
