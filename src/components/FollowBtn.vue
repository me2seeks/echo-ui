<script setup lang="ts">
  function follow() {
    console.log('Followed')
  }
</script>

<template>
  <button class="btn md:btn-sm" @click="follow">Follow</button>
</template>
