import cookie from 'js-cookie'
import router from '@/router/index'
import { defineStore } from 'pinia'
import { detail, follow } from '@/api/user'
import type { LoginReq, FollowReq } from '@/types/user'
import { Gender } from '@/types/user'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'
import { getUserCounter } from '@/api/counter'

interface UserInfo {
  id: string
  nickname: string
  handle: string
  email: string
  avatar: string
  bio: string
  sex: Gender
  followingCount: number
  followerCount: number
  feedCount: number
}

export const useUserStore = defineStore('user', () => {
  const userInfo: Ref<UserInfo> = ref({
    id: '',
    nickname: '',
    handle: '',
    email: '',
    avatar: '',
    bio: '',
    sex: Gender.Unknown,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  })

  const token: Ref<string> = ref(window.localStorage.getItem('token') || cookie.get('x-token') || '')

  const isLoggedIn = computed(() => !!token.value)
  const redirectPath = ref<string>('')

  const LoginIn = async (req: LoginReq) => {
    const res = await login(req)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return
    }
    setToken(res.data.accessToken, res.data.accessExpire)
    GetUserInfo()
    // TODO 美化
    ElMessage.success('登录成功')
    if (redirectPath.value) {
      router.push(redirectPath.value)
    } else {
      router.push({ name: 'home', replace: true })
    }
    return
  }

  const GetUserInfo = async () => {
    const res = await detail(userInfo.value.id)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
    }
    const counterRes = await getUserCounter(res.data.userInfo.id)
    if (counterRes.code !== 200) {
      ElMessage.error(counterRes.msg)
    }
    const userInfoData: UserInfo = {
      ...res.data.userInfo,
      followingCount: counterRes.data.followingCount,
      followerCount: counterRes.data.followerCount,
      feedCount: counterRes.data.feedCount,
    }
    setUserInfo(userInfoData)
  }

  const Follow = async (id: string) => {
    const followReq: FollowReq = { userID: id }
    await follow(followReq)
    userInfo.value.followingCount++
  }

  const LoginOut = async () => {
    await ClearStorage()
    router.push({ name: 'Login', replace: true })
    window.location.reload()
  }

  const ClearStorage = async () => {
    token.value = ''
    sessionStorage.clear()
    window.localStorage.removeItem('token')
    cookie.remove('x-token')
  }

  const ResetUserInfo = (value: Partial<UserInfo> = {}) => {
    userInfo.value = {
      ...userInfo.value,
      ...value,
    }
  }

  const RestoreSession = async () => {
    if (token.value && userInfo.value.id === '') {
      await GetUserInfo()
    }
  }

  const setUserInfo = (val: UserInfo) => {
    userInfo.value = val
  }

  const setToken = (val: string, expire: number) => {
    token.value = val
    window.localStorage.setItem('token', val)
    cookie.set('x-token', val, { expires: expire })
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    redirectPath,
    ResetUserInfo,
    Follow,
    GetUserInfo,
    RestoreSession,
    LoginOut,
    LoginIn,
    ClearStorage,
  }
})
