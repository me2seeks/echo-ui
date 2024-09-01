import cookie from 'js-cookie'
import router from '@/router/index'
import { defineStore } from 'pinia'
import { detail } from '@/api/user'
import type { LoginReq } from '@/types/user'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'

enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2,
}

interface UserInfo {
  id: number
  nickname: string
  handle: string
  email: string
  avatar: string
  bio: string
  sex: Gender
}

export const useUserStore = defineStore('user', () => {
  const userInfo: Ref<UserInfo> = ref({
    id: 0,
    nickname: '',
    handle: '',
    email: '',
    avatar: '',
    bio: '',
    sex: Gender.Unknown,
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
    const res = await detail()
    if (res.code !== 200) {
      ElMessage.error(res.msg)
    }
    setUserInfo(res.data.userInfo)
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
    if (token.value && !userInfo.value.id) {
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
    GetUserInfo,
    RestoreSession,
    LoginOut,
    LoginIn,
    ClearStorage,
  }
})
