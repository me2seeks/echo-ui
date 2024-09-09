<script setup lang="ts">
  const props = defineProps({
    userId: {
      type: String,
      required: true,
    },
  })
  function follow() {
    console.log('Followed', props.userId)
  }
</script>

<template>
  <button class="btn md:btn-sm" @click="follow">Follow</button>
</template>
