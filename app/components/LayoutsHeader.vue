<script setup lang="ts">
import { NAVIGATIONS } from '@/constants'
const { loggedIn, fetch: refreshSession } = useUserSession()
const { authLogout } = useApi()
const route = useRoute()

const logout = async () => {
  const data = await authLogout()
  if (data.success) {
    await refreshSession()

    if (route.name !== 'index') {
      await navigateTo('/')
    }
  }
}
</script>

<template>
  <UHeader title="Fake Store">
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        class="hidden md:block"
        :items="NAVIGATIONS"
        :animated="true"
        content-orientation="vertical"
      />
      <UButton
        v-if="loggedIn"
        class="cursor-pointer"
        variant="ghost"
        @click="logout"
      >
        Logout
      </UButton>
      <UButton v-else class="cursor-pointer" to="/login" variant="ghost">
        Login / Signup
      </UButton>
      <UColorModeButton class="cursor-pointer" />
    </template>

    <template #body>
      <UNavigationMenu
        :items="NAVIGATIONS"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
