import { defineStore } from 'pinia'
import { detail, followStatus } from '@/api/user'
import { getUserCounter } from '@/api/counter'
import { Gender } from '@/types/user'

interface User {
  nickname: string
  handle: string
  email: string
  avatar: string
  bio: string
  sex: Gender
  followingCount: number
  followerCount: number
  feedCount: number
  isFollowing: boolean
}

export const useUserStore = defineStore('userList', () => {
  const userList: Ref<Map<string, User>> = ref(new Map())
  const get = async (id: string): Promise<User | null> => {
    if (userList.value.has(id)) {
      return userList.value.get(id) || null
    } else {
      const res = await detail(id)
      if (res.code !== 200) {
        return null
      }
      const counter = await getUserCounter(id)
      if (counter.code !== 200) {
        return null
      }
      const status = await followStatus(id)
      if (status.code !== 200) {
        return null
      }
      const user = { ...res.data.userInfo, ...counter.data, isFollowing: status.data.isFollowing }
      userList.value.set(id, user)
      return user
    }
  }

  const set = async (id: string) => {
    const res = await detail(id)
    if (res.code !== 200) {
      return
    }
    const counter = await getUserCounter(id)
    if (counter.code !== 200) {
      return
    }
    const status = await followStatus(id)
    if (status.code !== 200) {
      return null
    }
    const user = { ...res.data.userInfo, ...counter.data, isFollowing: status.data.isFollowing }
    userList.value.set(id, user)
  }

  return {
    get,
    set,
  }
})
