<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import type { UserPayload } from '@/types'

const { authSignup } = useApi()
const { fetch: refreshSession } = useUserSession()
const state = reactive<UserPayload>({
  email: '',
  password: '',
  display_name: ''
})

const onSubmit = async () => {
  const data = await authSignup({
    email: state.email,
    password: state.password,
    display_name: state.display_name
  })

  if (data.success) {
    await refreshSession()
    await navigateTo('/')
  }
}
</script>

<template>
  <UPageHero
    class="flex justify-center"
    headline="Signup Page"
    title="Fake Store"
    description="Create any format of your desired email address this will not requesting a valid email address later"
  >
    <UForm class="space-y-4 mx-auto" @submit.prevent="onSubmit">
      <UFormField label="Display Name">
        <UInput v-model="state.display_name" />
      </UFormField>
      <UFormField label="Email">
        <UInput type="email" v-model="state.email" />
      </UFormField>
      <UFormField label="Password">
        <UInput type="password" v-model="state.password" />
      </UFormField>
      <UFieldGroup size="lg" orientation="vertical" class="gap-4">
        <UButton type="submit"> Signup! </UButton>
        <UButton to="/login"> Login Here! </UButton>
      </UFieldGroup>
    </UForm>
  </UPageHero>
</template>
