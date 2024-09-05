export interface SearchReq {
  keyword: string
  page: number
  pageSize: number
}

export interface User {
  id: string
  nickname: string
  handle: string
  avatar: string
  createTime: number
}

export interface Feed {
  id: string
  content: string
  userID: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: number
}

//resp

export interface SearchUsersResp {
  users: User[]
}

export interface SearchFeedsResp {
  feeds: Feed[]
}
