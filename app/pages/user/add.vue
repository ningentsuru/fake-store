<script setup>
const state = reactive({
  name: '',
  email: ''
})

const onSubmit = () => {
  $fetch('/api/addUser', {
    body: {
      name: state.name,
      email: state.email
    },
    method: 'POST'
  })
}
</script>

<template>
  <UPageSection>
    <UForm class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Name">
        <UInput v-model="state.email" />
      </UFormField>
      <UFormField label="Email">
        <UInput v-model="state.name" />
      </UFormField>
      <UButton type="submit">Submit</UButton>
    </UForm>
  </UPageSection>
</template>
