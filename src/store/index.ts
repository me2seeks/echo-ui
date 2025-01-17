import cookie from 'js-cookie'
import router from '@/router'
import { defineStore } from 'pinia'
import { follow, unfollow } from '@/api/user'
import type { LoginReq, FollowReq, UnfollowReq } from '@/types/user'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/store/user'

interface JwtPayload {
  jwtUserId: string
}

export const useMainStore = defineStore('main', () => {
  const userStore = useUserStore()
  const token: Ref<string> = ref(window.localStorage.getItem('token') || cookie.get('x-token') || '')
  const userID: Ref<string> = ref(window.localStorage.getItem('userID') || cookie.get('userID') || '')
  const isLoggedIn = computed(() => !!token.value)
  const redirectPath = ref<string>('')

  const LoginIn = async (req: LoginReq) => {
    const res = await login(req)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return
    }
    console.log(jwtDecode<JwtPayload>(res.data.accessToken).jwtUserId)
    setUser(res.data.accessToken, jwtDecode<JwtPayload>(res.data.accessToken).jwtUserId, res.data.accessExpire)
    userStore.Set(userID.value)
    ElMessage.success('登录成功')
    if (redirectPath.value) {
      router.push({ path: redirectPath.value, replace: true })
      return
    }
    router.push({ name: 'home', replace: true })
    return
  }

  const Follow = async (id: string) => {
    const followReq: FollowReq = { userID: id }
    await follow(followReq)
    userStore.Get(id).then((res) => {
      if (res) {
        res.followerCount++
      }
    })
  }

  const UnFollow = async (id: string) => {
    const unFollowReq: UnfollowReq = { userID: id }
    await unfollow(unFollowReq)
    userStore.Get(id).then((res) => {
      if (res) {
        res.followerCount--
      }
    })
  }

  const LoginOut = async () => {
    await clearStorage()
    router.push({ name: 'login', replace: true })
    window.location.reload()
  }

  const clearStorage = async () => {
    token.value = ''
    userID.value = ''
    sessionStorage.clear()
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userID')
    cookie.remove('x-token')
    cookie.remove('userID')
  }

  const RestoreSession = async () => {
    if (token.value && userID.value === '') {
      await userStore.Get(userID.value)
    }
  }

  const setUser = (val: string, id: string, expire: number) => {
    token.value = val
    userID.value = id
    window.localStorage.setItem('token', val)
    window.localStorage.setItem('userID', id)
    cookie.set('x-token', val, { expires: expire })
    cookie.set('userID', id, { expires: expire })
  }

  return {
    token,
    userID,
    isLoggedIn,
    redirectPath,
    Follow,
    UnFollow,
    RestoreSession,
    LoginOut,
    LoginIn,
  }
})
