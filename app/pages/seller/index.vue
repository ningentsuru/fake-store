<script setup lang="ts">
const { itemAdd } = useApi()
const form = reactive({
  file: null as File | null,
  name: '',
  price: '',
  description: ''
})

const onSubmit = async () => {
  await itemAdd(form)
}
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
      <UCard class="flex justify-center-safe">
        <UForm class="w-fit" @submit.prevent="onSubmit">
          <UFileUpload
            required
            v-model="form.file"
            class="w-96 min-h-48 cursor-pointer"
            accept="image/*"
          />
          <UFormField label="Item Name">
            <UInput
              class="w-full"
              type="text"
              label="Item Name"
              required
              v-model="form.name"
              placeholder="Item Name"
            />
          </UFormField>
          <UFormField label="Item Price">
            <UInput
              class="w-full"
              type="number"
              label="Item Price"
              required
              v-model="form.price"
              placeholder="Item Price"
            />
          </UFormField>
          <UFormField label="Item Description">
            <UTextarea
              class="w-full"
              type="text"
              label="Item Description"
              required
              v-model="form.description"
              placeholder="Item Description"
            />
          </UFormField>
          <UButton class="mt-4 w-full" type="submit" label="Submit" />
        </UForm>
      </UCard>
    </UPageSection>
  </UPage>
</template>
