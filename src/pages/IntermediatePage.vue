<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()

  onMounted(() => {
    const { handle, id, feedID, commentID } = route.query
    router.replace({
      path: `/${handle}/status/${id}`,
      query: {
        feedID,
        commentID,
      },
    })
  })
</script>

<template>
  <div>Redirecting...</div>
</template>
