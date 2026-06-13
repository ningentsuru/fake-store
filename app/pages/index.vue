<script setup lang="ts">
const { uploadImage } = useUpload()
const file = ref<File | null>(null)
const uploadedEtag = ref<string | null>(null)
const uploadedImageUrl = computed(() =>
  uploadedEtag.value ? `/api/storage/${uploadedEtag.value}` : null
)
const { loggedIn, user } = useUserSession()

const headlineText = computed(() =>
  loggedIn.value ? `Hi, ${user.value?.display_name}` : 'Personal Project'
)

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  file.value = target.files && target.files[0] ? target.files[0] : null
}

const onSubmit = async () => {
  if (!file.value) return

  const uploaded = await uploadImage(file.value)
  uploadedEtag.value = uploaded.etag
}
</script>

<template>
  <UPage>
    <UPageHero
      :headline="headlineText"
      title="Fake Store"
      description="Your Online Store Simulations"
    />
    <UForm @submit.prevent="onSubmit">
      <UFormField>
        <UInput
          type="file"
          @change="onFileChange"
          label="Upload here"
          accept="image/*"
        />
      </UFormField>
      <UButton type="submit" label="Submit" />
    </UForm>
    <img
      v-if="uploadedImageUrl"
      :src="uploadedImageUrl"
      alt="Uploaded image"
      class="mt-4 max-h-96 rounded object-contain"
    />
  </UPage>
</template>
