//req
export interface LoginReq {
  email: string
  password: string
}

export interface RegisterReq {
  email: string
  handle: string
  nickname: string
  password: string
}

export interface UpdateReq {
  nickname?: string
  sex?: number
  avatar?: string
  bio?: string
}

export interface FollowReq {
  userID: string
}

export interface UnfollowReq {
  userID: string
}

export interface FollowersReq {
  userID: string
}

export interface FollowingsReq {
  userID: string
}

// resp

export interface userInfo {
  id: string
  email: string
  nickname: string
  handle: string
  sex: number
  avatar: string
  bio: string
  isFollow: boolean
}

export interface RegisterResp {
  accessToken: string
  accessExpire: number
  refreshAfter: number
}

export interface LoginResp {
  accessToken: string
  accessExpire: number
  refreshAfter: number
}

export interface DetailResp {
  userInfo: userInfo
}

export interface FollowersResp {
  followers: string[]
}

export interface FollowingsResp {
  followings: string[]
}

export interface FollowStatusResp {
  isFollowing: boolean
}

export enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2,
}
