<script setup lang="ts">
  const props = defineProps({
    handle: {
      type: String,
      required: true,
    },
    feedID: {
      type: String,
      required: true,
    },
  })
</script>
<template>
  <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
    <h2>status Page</h2>
    <span>{{ props.handle }} {{ props.feedID }}</span>
  </div>
</template>
