<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import type { UserPayload } from '@/types'

const { authLogin } = useApi()
const { fetch: refreshSession } = useUserSession()
const state = reactive<UserPayload>({
  email: '',
  password: ''
})

const onSubmit = async () => {
  const data = await authLogin({
    email: state.email,
    password: state.password
  })

  if (data.success) {
    await refreshSession()
    await navigateTo('/')
  }
}
</script>

<template>
  <UPage class="flex justify-center">
    <UPageSection>
      <UForm class="space-y-4 mx-auto" @submit.prevent="onSubmit">
        <UFormField label="Email">
          <UInput v-model="state.email" />
        </UFormField>
        <UFormField label="Password">
          <UInput type="password" v-model="state.password" />
        </UFormField>
        <UFieldGroup size="lg" orientation="vertical" class="gap-4">
          <UButton type="submit"> Login! </UButton>
          <UButton to="/signup"> Signup Here! </UButton>
        </UFieldGroup>
      </UForm>
    </UPageSection>
  </UPage>
</template>
