export interface SearchReq {
  keyword: string
  page: number
  pageSize: number
}

export interface User {
  id: number
  nickname: string
  handle: string
}

export interface Feed {
  id: number
  content: string
  userID: number
  media0: string
  media1: string
  media2: string
  media3: string
  created: number
}

//resp

export interface SearchUsersResp {
  users: User[]
}

export interface SearchFeedsResp {
  feeds: Feed[]
}
