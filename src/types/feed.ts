import type { Comment } from './comment'
export interface Feed {
  id: string
  content: string
  userID: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: number
  isLiked: boolean
}

export interface CreateFeedReq {
  content: string
  media0: string | null
  media1: string | null
  media2: string | null
  media3: string | null
}

export interface CreateFeedResp {
  id: string
}

export interface DeleteFeedReq {
  id: string
}

export interface DeleteFeedResp {}

export interface GetFeedsByPageReq {
  page: number
  pageSize: number
}

export interface GetFeedsByPageResp {
  feed: Feed[]
  total: number
}

export interface GetFollowingFeedsByPageReq {
  page: number
  pageSize: number
}

export interface GetFollowingFeedsByPageResp {
  feed: Feed[]
  total: number
}

export interface GetFeedCommentsByPageReq {
  page: number
  pageSize: number
}

export interface GetFeedCommentsByPageResp {
  comments: Comment[]
  total: number
}

export interface CreateFeedCommentReq {
  content: string
  media0: string | null
  media1: string | null
  media2: string | null
  media3: string | null
}

export interface CreateFeedCommentResp {
  id: string
}
