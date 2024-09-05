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
  userID: String
}

export interface UnfollowReq {
  userID: String
}

export interface FollowersReq {
  userID: String
}

export interface FollowingsReq {
  userID: String
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
  followers: String[]
}

export interface FollowingsResp {
  followings: String[]
}
