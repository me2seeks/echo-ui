<script setup lang="ts">
  import { useMainStore } from '@/store/index'

  const mainStore = useMainStore()
  const props = defineProps({
    userId: {
      type: String,
      required: true,
    },
    isFollow: {
      type: Boolean,
      default: false,
    },
  })
  const isFollow = ref(props.isFollow)

  function toggleFollow() {
    if (isFollow.value) {
      console.log('Unfollow', props.userId)
      mainStore.UnFollow(props.userId)
    } else {
      console.log('Follow', props.userId)
      mainStore.Follow(props.userId)
    }
    isFollow.value = !isFollow.value
  }
</script>

<template>
  <button class="btn md:btn-sm" @click="toggleFollow">
    {{ isFollow ? 'Unfollow' : 'Follow' }}
  </button>
</template>
