<script setup lang="ts">
  import { useUserStore } from '@/store/user'
  import type { ElInput } from 'element-plus'
  const userStore = useUserStore()
  const textarea1 = ref('')
</script>
<template>
  <div class="flex flex-col z-1 flex-grow w-1/2 h-full border-r border-gray-700">
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
      <!-- <div class="flex flex-col w-full">
        <div class="flex flex-row w-full box-border px-4 pt-3 border-b border-gray-700">
          <div class="h-full w-9 mr-2">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img src="http://10.2.12.14:32695/echo/avatars/0367b119-f7f7-4162-bb47-5d8a596ad00f.img" />
              </div>
            </div>
          </div>
          <div class="flex justify-center flex-1 flex-col box-border pt-1">
            <div class="flex flex-row w-full">
              <div class="flex-1">
                <div class="text-sm font-bold">Uninen</div>
                <div class="text-xs text-gray-500">2021-08-31 16:24</div>
              </div>
              <div class="flex-1 flex justify-end">
                <div class="text-xs text-gray-500">1 min ago</div>
              </div>
            </div>
            <div class="w-full h-2"></div>
            <div class="text-sm">
              U have to fight out for justice. In the case of the old man #maniar who was beaten black and blue in
              railway and 3 goons who were arrested and released on bail by court because of lethargic approach of
              police and non application of proper section the police approached the court
            </div>
            <div class="w-full h-2"></div>
            <div class="flex flex-row w-full justify-between">
              <div class="flex flex-row">
                <div class="flex items center justify-center w-8 h-8 rounded-full bg-gray-500">
                  <i class="fas fa-thumbs-up text-white"></i>
                </div>
                <div class="flex items center justify-center w-8 h-8 rounded-full bg-gray-500">
                  <i class="fas fa-thumbs-down text-white"></i>
                </div>
                <div class="flex items center justify-center w-8 h-8 rounded-full bg-gray-500">
                  <i class="fas fa-comment text-white"></i>
                </div>
              </div>
              <div class="flex items center justify-center w-8 h-8 rounded-full bg-gray-500">
                <i class="fas fa-share text-white"></i>
              </div>
            </div>
          </div>
        </div> -->
      <!-- <div class="flex flex-row w-full box-border px-4 pt-3 border-b border-gray-700"></div> -->
      <!-- </div> -->

      <!-- asd -->
    </div>
  </div>
</template>
