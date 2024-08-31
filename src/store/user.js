import cookie from 'js-cookie'
import router from '@/router/index'
import { defineStore } from 'pinia'
import { detail } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: '',
    nextTick: '',
    handle: '',
    email: '',
    avatar: '',
    bio: '',
    sex: '',
  })
  const token = ref(window.localStorage.getItem('token') || cookie.get('x-token') || '')
  const setUserInfo = (val) => {
    userInfo.value = val
  }
  const ResetUserInfo = (value = {}) => {
    userInfo.value = {
      ...userInfo.value,
      ...value,
    }
  }
  const GetUserInfo = async () => {
    const res = await detail()
    if (res.data.code === 200) {
      setUserInfo(res.data.data)
    }
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
  return {
    userInfo,
    token,
    setUserInfo,
    ResetUserInfo,
    GetUserInfo,
    LoginOut,
    ClearStorage,
  }
})
