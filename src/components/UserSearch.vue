<template>
  <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Search" clearable :debounce="100">
    <template #default="{ item }">
      <button class="flex items-center px-1 py-1 bg">
        <img v-if="item.user && item.user.avatar" :src="item.user.avatar" class="h-10 w-10 shrink-0 rounded-full" />
        <div v-else class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-10 rounded-full">
            <span class="text-xs">{{ item.user.handle }}</span>
          </div>
        </div>
        <div class="flex flex-col box-border px-2 justify-end text-left">
          <div v-if="item.user && item.user.nickname" class="w-28 max-w-full font-sans text-sm">
            {{ item.user.nickname }}
          </div>
          <div v-if="item.user && item.user.handle" class="w-28 max-w-full text-xs">@{{ item.user.handle }}</div>
        </div>
      </button>
    </template>
    <template #loading>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-4">
            <div class="skeleton h-3 w-20"></div>
            <div class="skeleton h-3 w-28"></div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-4">
            <div class="skeleton h-3 w-20"></div>
            <div class="skeleton h-3 w-28"></div>
          </div>
        </div>
      </div>
    </template>
    <template #prefix>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
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
        users.value = []
        if (res.data.users) {
          users.value = res.data.users.map((user: User) => ({
            value: user.nickname,
            user: user,
          }))
        } else {
          users.value = [{ value: 'No results found', user: { id: 0, nickname: 'No results found', handle: '' } }]
        }
      })
      cb(users.value)
    }
  }
</script>
