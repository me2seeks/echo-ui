import service from '@/utils/request'
import type { ApiResponse } from '@/types/index'
import type {
  LoginReq,
  LoginResp,
  RegisterReq,
  RegisterResp,
  DetailResp,
  UpdateReq,
  FollowReq,
  UnfollowReq,
  FollowersReq,
  FollowersResp,
  FollowingsReq,
  FollowingsResp,
  FollowStatusResp,
} from '@/types/user'

// @Summary 用户登录
// @Produce  application/json
// @Param data body {email:"string",password:"string"}
// @Router /user/login [post]
export const login = (data: LoginReq): Promise<ApiResponse<LoginResp>> => {
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
export const register = (data: RegisterReq): Promise<ApiResponse<RegisterResp>> => {
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
export const detail = (userID: string): Promise<ApiResponse<DetailResp>> => {
  return service({
    url: '/user/',
    method: 'get',
    params: { userID },
  })
}

// @Summary 更新用户信息
// @Produce  application/json
// @Security ApiKeyAuth
// @Param data body {nickname:"string",sex:"int32",avatar:"string",bio:"string"}
// @Router /user/ [post]
export const update = (data: UpdateReq) => {
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
export const follow = (data: FollowReq) => {
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
export const unfollow = (data: UnfollowReq) => {
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
export const followers = (data: FollowersReq): Promise<ApiResponse<FollowersResp>> => {
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
export const followings = (data: FollowingsReq): Promise<ApiResponse<FollowingsResp>> => {
  return service({
    url: '/user/followings',
    method: 'post',
    data,
  })
}

// @Summary 获取关注状态
// @Produce  application/json
// @Security ApiKeyAuth
// @Router /user/follow/{userID} [get]
export const followStatus = (userID: string): Promise<ApiResponse<FollowStatusResp>> => {
  return service({
    url: `/user/follow/${userID}`,
    method: 'get',
  })
}
