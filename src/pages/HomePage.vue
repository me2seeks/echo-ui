<script setup lang="ts">
  import { useUserStore } from '@/store/user'
  import type { ElInput } from 'element-plus'
  const userStore = useUserStore()
  const textarea1 = ref('')
</script>
<template>
  <div class="flex flex-col z-1 flex-grow max-w-[566px] h-full border-r border-gray-700">
    <div
      class="bg-base-500 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm border-b border-gray-700"
    >
      <nav class="navbar w-full p-0">
        <div class="flex-1 h-full items-center justify-center hover:bg-gray-700">For you</div>
        <div class="flex-1 h-full items-center justify-center hover:bg-gray-700">Following</div>
      </nav>
    </div>
    <!-- content -->
    <div>
      <div class="flex flex-row z-0 w-full box-border px-4 pt-3 border-b border-gray-700">
        <!-- 头像 -->
        <div class="h-full w-9 mr-2">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img :src="userStore.userInfo.avatar" />
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-1 flex-col box-border pt-1">
          <el-input
            ref="inputRef"
            v-model="textarea1"
            class="w-full"
            :autosize="{ minRows: 1, maxRows: 99 }"
            maxlength="255"
            show-word-limit
            true
            type="textarea"
            placeholder="What is happening?!"
            resize="none"
          />

          <div class="w-full h-8 pb-2"></div>
        </div>
      </div>
      <!-- feeds -->
      <FeedList />
    </div>
  </div>
  <div class="flex-1 w-full h-full">
    <UserSearch />
  </div>
</template>
