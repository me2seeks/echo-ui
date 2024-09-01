import service from '@/utils/request'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  email: string
  handle: string
  nickname: string
  password: string
}

interface UpdateData {
  nickname?: string
  sex?: number
  avatar?: string
  bio?: string
}

interface FollowData {
  userID: number
}

interface UnfollowData {
  userID: number
}

interface FollowersData {
  userID: number
}

interface FollowingsData {
  userID: number
}

// @Summary 用户登录
// @Produce  application/json
// @Param data body {email:"string",password:"string"}
// @Router /user/login [post]
export const login = (data: LoginData) => {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// @Summary 用户注册
// @Produce  application/json
// @Param data body {email:"string",handle:"string",nickname:"string",password:"string"}
// @Router /user/register [post]
export const register = (data: RegisterData) => {
  return service({
    url: '/user/register',
    method: 'post',
    data,
  })
}

// @Summary 获取用户信息
// @Produce  application/json
// @Security ApiKeyAuth
// @Router /user/ [get]
export const detail = () => {
  return service({
    url: '/user/',
    method: 'get',
  })
}

// @Summary 更新用户信息
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {nickname:"string",sex:"int32",avatar:"string",bio:"string"}
// @Router /user/ [post]
export const update = (data: UpdateData) => {
  return service({
    url: '/user/',
    method: 'post',
    data,
  })
}

// @Summary 关注用户
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {userID:"int64"}
// @Router /user/follow [post]
export const follow = (data: FollowData) => {
  return service({
    url: '/user/follow',
    method: 'post',
    data,
  })
}

// @Summary 取消关注用户
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {userID:"int64"}
// @Router /user/unfollow [post]
export const unfollow = (data: UnfollowData) => {
  return service({
    url: '/user/unfollow',
    method: 'post',
    data,
  })
}

// @Summary 获取关注者
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {userID:"int64"}
// @Router /user/followers [post]
export const followers = (data: FollowersData) => {
  return service({
    url: '/user/followers',
    method: 'post',
    data,
  })
}

// @Summary 获取关注的人
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {userID:"int64"}
// @Router /user/followings [post]
export const followings = (data: FollowingsData) => {
  return service({
    url: '/user/followings',
    method: 'post',
    data,
  })
}
