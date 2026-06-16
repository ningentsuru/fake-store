<script setup lang="ts">
const { itemLists } = useApi()

type Item = {
  id: number
  name: string
  price: number
  description: string
  etag: string
}

const items = ref<Item[]>([])

onMounted(async () => {
  const response = await itemLists()

  if (response?.success) {
    items.value = response.items
  }
})
</script>

<template>
  <UPageSection orientation="vertical">
    <template #body>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="item in items" :key="item.id" class="overflow-hidden">
          <template #header>
            <img
              :src="`/api/storage/${item.etag}`"
              :alt="item.name"
              class="aspect-video w-full object-cover"
              loading="lazy"
              width="600"
              height="340"
            />
          </template>

          <div class="space-y-1">
            <h3 class="font-medium">
              {{ item.name }}
            </h3>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
            <p class="font-semibold">
              {{ item.price }}
            </p>
          </div>
        </UCard>
      </div>
    </template>
  </UPageSection>
</template>
