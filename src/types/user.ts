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
  userID: number
}

export interface UnfollowReq {
  userID: number
}

export interface FollowersReq {
  userID: number
}

export interface FollowingsReq {
  userID: number
}

// resp

export interface userInfo {
  id: number
  email: string
  nickname: string
  handle: string
  sex: number
  avatar: string
  bio: string
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
  followers: number[]
}

export interface FollowingsResp {
  followings: number[]
}
