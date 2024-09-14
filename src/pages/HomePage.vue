<script setup lang="ts">
  import { useMainStore } from '@/store/index'
  import { useUserStore, type User } from '@/store/user'

  import { useFeedStore } from '@/store/feed'

  const userStore = useUserStore()
  const feedStore = useFeedStore()

  const userInfo: Ref<User | undefined> = ref()
  const selectedTab = ref(true)

  const content = computed(() => {
    return selectedTab.value ? feedStore.recommendedFeeds : feedStore.followedFeeds
  })

  watch(
    selectedTab,
    () => {
      fetchFeeds()
    },
    { once: true }
  )

  const fetchFeeds = () => {
    if (selectedTab.value) {
      feedStore.GetFeeds()
    } else {
      feedStore.GetFollowingFeeds()
    }
  }

  const handleScroll = () => {
    const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1
    if (bottomOfWindow) {
      fetchFeeds()
    }
  }

  onMounted(() => {
    fetchFeeds()
    window.addEventListener('scroll', handleScroll)

    if (!userInfo.value) {
      userStore.Get(useMainStore().userID).then((user: User | null) => {
        if (user) {
          userInfo.value = user
        }
      })
    }
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
<template>
  <div class="flex flex-col z-1 flex-grow max-w-[566px] h-full border-r border-gray-700">
    <div
      class="bg-base-500 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm border-b border-gray-700"
    >
      <nav class="navbar w-full p-0">
        <div class="flex-1 h-full items-center justify-center hover:bg-gray-200" @click="selectedTab = true">
          For you
        </div>
        <div class="flex-1 h-full items-center justify-center hover:bg-gray-200" @click="selectedTab = false">
          Following
        </div>
      </nav>
    </div>
    <!-- content -->
    <div class="flex flex-col">
      <div class="flex flex-row z-0 w-full box-border px-4 pt-3 border-b border-gray-700">
        <!-- 头像 -->
        <div class="h-full w-9 mr-2">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img :src="userInfo?.avatar" />
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-1 flex-col box-border pt-1 pb-2">
          <ContentBox />
        </div>
      </div>
      <!-- feeds -->
      <FeedList :content />
    </div>
  </div>
  <div class="flex-1 w-full h-full">
    <div class="w-2/3 items-center px-2">
      <UserSearch />
    </div>
  </div>
</template>
