<template>
  <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Please input">
    <template #default="{ item }">
      <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img :src="item.user.avatar" />
          </div>
        </div>
        <div>
          <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
            {{ item.user.nickname }}
          </p>
          <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
            @{{ item.user.handle }}
          </p>
        </div>
      </div>
    </template>
    <!-- TODO 大小 -->
    <template #loading>
      <div class="flex w-52 flex-col gap-4">
        <div class="flex items-center gap-4">
          <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-4">
            <div class="skeleton h-4 w-20"></div>
            <div class="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
  import type { User } from '@/types/search'
  import { searchUsers } from '@/api/search'

  interface UserItem {
    value: string
    user: User
  }
  const state = ref('')

  const users = ref<UserItem[]>([])

  const querySearchAsync = (queryString: string, cb: (arg: UserItem[]) => void) => {
    if (queryString != '') {
      searchUsers({
        keyword: queryString,
        page: 0,
        pageSize: 5,
      }).then((res) => {
        users.value = res.data.users.map((user: User) => ({
          value: user.nickname,
          user: user,
        }))
      })
      cb(users.value)
    }
  }
</script>
