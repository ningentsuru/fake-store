<script setup lang="ts">
const form = reactive({
  image: null,
  name: '',
  price: '',
  description: ''
})
const onSubmit = () => {}
</script>

<template>
  <UPage>
    <UPageHero
      class=""
      headline="Seller Page"
      title="Fake Store"
      description="Place your random item here."
    />
    <UPageSection>
      <UForm @submit.prevent="onSubmit">
        <UFileUpload v-model="form.image" class="w-96 min-h-48" />
        <UFormField label="Item Name">
          <UInput
            type="text"
            label="Item Name"
            v-model="form.name"
            placeholder="Item Name"
          />
        </UFormField>
        <UFormField label="Item Price">
          <UInput
            type="text"
            label="Item Price"
            v-model="form.price"
            placeholder="Item Price"
          />
        </UFormField>
        <UFormField label="Item Description">
          <UTextarea
            type="text"
            label="Item Description"
            v-model="form.description"
            placeholder="Item Description"
          />
        </UFormField>
      </UForm>
    </UPageSection>
  </UPage>
</template>
