import { defineStore } from 'pinia'
import { detail } from '@/api/user'
import { getUserCounter } from '@/api/counter'
import { Gender } from '@/types/user'

export interface User {
  nickname: string
  handle: string
  email: string
  avatar: string
  bio: string
  sex: Gender
  isFollow: boolean

  followingCount: number
  followerCount: number
  feedCount: number
}

export const useUserListStore = defineStore('userList', () => {
  const userList: Ref<Map<string, User>> = ref(new Map())

  const fetchUserData = async (id: string): Promise<User | null> => {
    try {
      const res = await detail(id)
      if (res.code !== 200) {
        console.error(`Failed to fetch user details for ID ${id}: ${res.msg}`)
        return null
      }

      const counter = await getUserCounter(id)
      if (counter.code !== 200) {
        console.error(`Failed to fetch user counter for ID ${id}: ${counter.msg}`)
        return null
      }

      const user: User = { ...res.data.userInfo, ...counter.data }
      userList.value.set(id, user)
      return user
    } catch (error) {
      console.error(`An error occurred while fetching user data for ID ${id}:`, error)
      return null
    }
  }

  const Get = async (id: string): Promise<User | null> => {
    if (userList.value.has(id)) {
      return userList.value.get(id) || null
    } else {
      return await fetchUserData(id)
    }
  }

  const Set = async (id: string): Promise<void> => {
    await fetchUserData(id)
  }

  return {
    userList,
    fetchUserData,
    Get,
    Set,
  }
})
